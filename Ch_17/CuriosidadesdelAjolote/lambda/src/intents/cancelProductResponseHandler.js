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
    
                    speechOutput = i18n.t('REFUND_SUCCESS_MSG');
                } else if (payload.purchaseResult === 'DECLINED') {
    
                    speechOutput = i18n.t('REFUND_DENIED_MSG');
                } else if (payload.purchaseResult === 'NOT_ENTITLED') {
    
                    speechOutput = i18n.t('REFUND_NOT_PRODUCT_MSG');
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
