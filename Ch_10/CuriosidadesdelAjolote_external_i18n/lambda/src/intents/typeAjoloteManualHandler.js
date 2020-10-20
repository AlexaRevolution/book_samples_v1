'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

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
			const speechOutput = i18nUtils.getTranslation('OK_COMPLETED_AXOLOTL', handlerInput);

			return handlerInput.responseBuilder
				.speak(speechOutput)
				.getResponse(); 
		},
	},
};