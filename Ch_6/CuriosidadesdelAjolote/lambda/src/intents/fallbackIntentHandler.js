const Alexa = require('ask-sdk-core');

const FallbackIntentHandler = {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
              && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    const speakOutput = `Lo siento, tuve problemas para hacer lo que me pediste. Inténtalo de nuevo.`;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
    },
  },
};
