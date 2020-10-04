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
	const speechOutput = i18n.t('GET_FACT_MESSAGE') + randomFact;

	return handlerInput.responseBuilder
  	.speak(speechOutput)
  	.withShouldEndSession(true)
 	 .getResponse();
   },
  },
};