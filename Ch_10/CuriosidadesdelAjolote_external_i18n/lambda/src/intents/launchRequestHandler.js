'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
      const speakOutput = i18nUtils.getTranslation('WELCOME_MSG', handlerInput);

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};
