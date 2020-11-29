'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
   CreateTimerIntentHandler : {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateTimerIntent';
    },
    handle(handlerInput) {
        
        return handlerInput.responseBuilder
            .speak(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'))
            .reprompt(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'))
            .getResponse();
    },
  },
};