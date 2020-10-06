'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
  StartCaracteristicasAjoloteHandler: {
  canHandle(handlerInput) {
	 return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
		&& Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaracteristicasAjoloteIntent'
		 && request.dialogState == 'STARTED';
  },
  handle(handlerInput) {
	const currentIntent = handlerInput.requestEnvelope.request.intent;       
	let characterAxolotl = currentIntent.slots.typesofaxolotl;
	
	// el valor typesofaxolotl está vacío si el usuario no ha llenado el espacio
	// getUserDefaultAxolotl() recupera la Caracteristica predeterminada del usuario del almacenamiento persistente.
	if (!characterAxolotl.value) {
		currentIntent.slots.typesofaxolotl.value = getUserDefaultAxolotl();
	}
	
	const speechOutput = i18n.t('GET_TYPE_AXOLOTL') + characterAxolotl;

	 // Return the Dialog.Delegate directive
	return handlerInput.responseBuilder
	.addDelegateDirective(speechOutput)
	.getResponse();
   },
  },

  InProgressCaracteristicasAjoloteHandler: {
	canHandle(handlerInput) {
	   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
		  && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaracteristicasAjoloteIntent'
		   && request.dialogState == 'IN_PROGRESS';
	},
	handle(handlerInput) {
		const currentIntent = handlerInput.requestEnvelope.request.intent; return handlerInput.responseBuilder
		.addDelegateDirective(currentIntent)
		.getResponse(); 
		},
	},

	CompletedCaracteristicasAjoloteHandler: {
		canHandle(handlerInput) {
		   return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
			  && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CaracteristicasAjoloteIntent'
			   && request.dialogState == 'COMPLETED';
		},
		handle(handlerInput) {
			const speechOutput = i18n.t('OK_COMPLETED_AXOLOTL');

			return handlerInput.responseBuilder
			.speak(speechOutput)
			.getResponse(); 
		},
	},
};