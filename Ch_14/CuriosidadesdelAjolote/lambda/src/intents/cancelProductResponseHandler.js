'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    CancelProductResponseHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
                && handlerInput.requestEnvelope.request.name === 'Cancel';
        },
        async handle(handlerInput) {
            let {request} = handlerInput.requestEnvelope;
            let {payload} = request;
    
            if (request.status.code === '200') {
                let speechOutput;
                if (payload.purchaseResult === 'ACCEPTED') {
    
                    speechOutput = 'Se ha procesado la devolución correctamente';
                } else if (payload.purchaseResult === 'DECLINED') {
    
                    speechOutput = 'Se ha denegado la devolución del producto.';
                } else if (payload.purchaseResult === 'NOT_ENTITLED') {
    
                    speechOutput = 'Este producto no lo tenias comprado';
                }
    
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt(speechOutput)
                    .getResponse();
            }
    
            return handlerInput.responseBuilder
                .speak(i18n.t('ERROR_MSG'))
                .getResponse();
        }
    },       
};
