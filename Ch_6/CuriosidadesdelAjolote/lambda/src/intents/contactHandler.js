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
    return handlerInput.responseBuilder
        .addDelegateDirective({
            name: 'ContactIntent',
            slots: {}
        })
        .getResponse();
	}
  },
};