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

			let axolotl  = currentIntent.slots.typesofaxolotl;
			const locale = Alexa.getLocale(handlerInput.requestEnvelope);
		
		    // the value typesofaxolotl is empty if the user has not filled the slot
		    // getUserDefaultAxoltl() returns the axolotl by default.
			if (!axolotl.value) {
			  currentIntent.slots.typesofaxolotl.value = getUserDefaultAxoltl(locale);
			}
		
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

function getUserDefaultAxoltl(local){
	switch (local) {
		case 'es-ES':
		case 'es-MX':
			return 'altiplano';
		case 'en-US':
			return 'altiplano';
		default:
			return 'plateau';
	}
}