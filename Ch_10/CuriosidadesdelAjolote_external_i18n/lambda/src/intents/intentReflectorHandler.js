'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
  IntentReflectorHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
      const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
      const speakOutput = i18nUtils.getTranslation('REFLECTOR_MSG', handlerInput, {intentName: intentName});

      return handlerInput.responseBuilder
        .speak(speakOutput)
      // .reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse();
    },
  },
};
