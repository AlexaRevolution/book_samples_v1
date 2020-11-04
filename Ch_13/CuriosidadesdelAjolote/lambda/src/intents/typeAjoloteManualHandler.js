'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
	NotCompletedTypeAjoloteHandler: {
		canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
				&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'TypeAjolote'
				&& handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
		},
		handle(handlerInput) {

			const currentIntent = handlerInput.requestEnvelope.request.intent; 
			// Return the Dialog.Delegate directive
			return handlerInput.responseBuilder
				.addDelegateDirective(currentIntent)
				.getResponse();
		},
	},

	CompletedTypeAjoloteHandler: {
		canHandle(handlerInput) {
			return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
				&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'TypeAjolote'
				&& handlerInput.requestEnvelope.request.dialogState == 'COMPLETED';
		},
		handle(handlerInput) {
			const speechOutput = i18n.t('OK_COMPLETED_AXOLOTL');

			return handlerInput.responseBuilder
				.speak(speechOutput)
				.getResponse(); 
		},
	},
};