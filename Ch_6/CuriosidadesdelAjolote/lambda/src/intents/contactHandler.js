'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
 ContactHandler: {
  canHandle(handlerInput) {
	 return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    	&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContactIntent';
  },
  handle(handlerInput) {
    const speakOutput = i18n.t('CONTACT_MESSAGE');

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
	}
  },
};