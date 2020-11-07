"use strict";

const Alexa = require("ask-sdk-core");
const i18n = require("i18next");

module.exports = {
  AskForNameIntentHandler: {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) ===
          "IntentRequest" &&
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AskForName"
      );
    },
    async handle(handlerInput) {
      const {
        requestEnvelope, serviceClientFactory, attributesManager} = handlerInput;
      // Obteniendo el cliente
      const directiveServiceClient = serviceClientFactory.getDirectiveServiceClient();
      const { request, context } = requestEnvelope;

      const requestId = request.requestId;
      const { apiEndpoint, apiAccessToken } = context.System;

      try {
        // Creando la directiva
        const directive = {
          header: {
            requestId,
          },
          directive: {
            type: "VoicePlayer.Speak",
            speech: i18n.t("NAME_SAVING"),
          },
        };

        console.log(JSON.stringify(directive));

        //Enviando la directiva
        await directiveServiceClient.enqueue(
          directive,
          apiEndpoint,
          apiAccessToken
        );
      } catch (err) {
        console.log(err);
      }

      new Promise((resolve) => setTimeout(resolve(), 2500));

      const sessionAttributes = attributesManager.getSessionAttributes();
      const slotName = Alexa.getSlotValue(requestEnvelope, "name");
      sessionAttributes["name"] = slotName;
      attributesManager.setSessionAttributes(sessionAttributes);

      const speakOutput =
        i18n.t("NAME_SAVED_OK") +
        " " +
        i18n.t("HELLO_MSG_WITHOUT_SSML", { name: slotName });

      console.log(speakOutput);

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .withShouldEndSession(false)
        .getResponse();
    },
  },
};
