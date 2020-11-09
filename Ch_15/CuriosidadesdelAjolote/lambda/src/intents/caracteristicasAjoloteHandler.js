'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
	CaracteristicasAjoloteHandler: {
		canHandle(handlerInput) {
		   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			  && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaracteristicasAjoloteIntent';
		},
		handle(handlerInput) {

			const speechOutput = i18n.t('OK_COMPLETED_AXOLOTL');

			return handlerInput.responseBuilder
			.speak(speechOutput)
			.getResponse(); 
		},
	},
};