'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
 ContactHandler: {
  canHandle(handlerInput) {
	 return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
    	&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'ContactIntent';
  },
  handle(handlerInput) {
    const speakOutput = i18nUtils.getTranslation('CONTACT_MESSAGE', handlerInput);

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
	}
  },
};