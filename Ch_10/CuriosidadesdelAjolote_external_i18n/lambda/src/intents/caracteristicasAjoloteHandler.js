'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

module.exports = {
	CaracteristicasAjoloteHandler: {
		canHandle(handlerInput) {
		   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			  && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaracteristicasAjoloteIntent';
		},
		handle(handlerInput) {

			const speechOutput = i18nUtils.getTranslation('OK_COMPLETED_AXOLOTL', handlerInput);

			return handlerInput.responseBuilder
			.speak(speechOutput)
			.getResponse(); 
		},
	},
};