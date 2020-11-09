'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    UpsellOrBuyResponseHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
                && (handlerInput.requestEnvelope.request.name === 'Buy'
                    || handlerInput.requestEnvelope.request.name === 'Upsell');
        },
        async handle(handlerInput) {
            let {request} = handlerInput.requestEnvelope;
    
            if (request.status.code === '200' && request.payload.purchaseResult !== 'ERROR') {
                let speechOutput;
    
                switch (request.payload.purchaseResult) {
                    case 'ACCEPTED':
                        speechOutput = i18n.t('BUY_SUCCESS_MSG');
                        break;
                    case 'ALREADY_PURCHASED':
                        speechOutput = i18n.t('BUY_PURCHASED_MSG');
                        break;
                    case 'DECLINED':
                        speechOutput = i18n.t('BUY_DENIED_MSG');
                        break;
                    default:
                        speechOutput = i18n.t('BUY_ERROR_MSG');
                        break;
                }
    
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .getResponse();
            }
    
            return handlerInput.responseBuilder
                .speak(i18n.t('ERROR_MSG'))
                .getResponse();
        }
    },
};
