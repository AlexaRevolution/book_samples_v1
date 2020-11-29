"use strict";

const Alexa = require("ask-sdk-core");
const i18n = require("i18next");

const timerItem = {
  duration:  'PT15S', //Timer de 15 Segundos
  label: 'Ajolote',
  creationBehavior: {
      displayExperience: {
          visibility: 'VISIBLE'
      }
  },
  triggeringBehavior: {
      operation: {
          type : 'ANNOUNCE',
          textToAnnounce: [{
              locale: 'es-MX',
              text: i18n.t('TIMER_FINISH')
          }]
      },
      notificationConfig: {
          playAudible: true
      }
  }
};

module.exports = {
  YesNoIntentHandler: {
    canHandle(handlerInput) {
      return (
        Alexa.getRequestType(handlerInput.requestEnvelope) ==="IntentRequest" &&
        (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.YesIntent" ||
          Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NoIntent")
      );
    },
    async handle(handlerInput) {
      if (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.YesIntent") {

        const {requestEnvelope, serviceClientFactory} = handlerInput;

        try {
          const timerServiceClient = serviceClientFactory.getTimerManagementServiceClient();
          const timersList = await timerServiceClient.getTimers();
          console.log("Current timers: " + JSON.stringify(timersList));

          timerItem.triggeringBehavior.operation.textToAnnounce[0].locale = Alexa.getLocale(requestEnvelope);
          timerItem.triggeringBehavior.operation.textToAnnounce[0].text =  i18n.t('TIMER_FINISH');

          console.log(
            "Timer to create: " + JSON.stringify(timerItem)
          );
          const timerResponse = await timerServiceClient.createTimer(timerItem);

          console.log(
            "Timer creation response: " + JSON.stringify(timerResponse)
          );

          const timerStatus = timerResponse.status;

          if (timerStatus === "ON") {

            return handlerInput.responseBuilder
              .speak(i18n.t("TIMER_CREATED_SUCCESS"))
              .getResponse();
          }
        } catch (error) {

          console.log("Create timer error: " + JSON.stringify(error));

          if (error.statusCode === 401) {
            console.log("Unauthorized!");
            
            return handlerInput.responseBuilder
              .addDirective({
                type: "Connections.SendRequest",
                name: "AskFor",
                payload: {
                  "@type": "AskForPermissionsConsentRequest",
                  "@version": "1",
                  "permissionScope": "alexa::alerts:timers:skill:readwrite",
                },
                token: "timerToken",
              }).getResponse();
          } else {
            return handlerInput.responseBuilder
              .speak(i18n.t("TIMER_CREATED_ERROR"))
              .reprompt(i18n.t("TIMER_CREATED_ERROR"))
              .getResponse();
          }
        }
      }else{
        return handlerInput.responseBuilder.
            speak(i18n.t("TIMER_NOT_STARTED"))
            .getResponse();
      }

    },
  },
};
