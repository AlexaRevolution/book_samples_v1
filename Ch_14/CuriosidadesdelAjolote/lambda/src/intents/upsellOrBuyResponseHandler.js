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
                        speechOutput = 'Compra realizada con éxito!';
                        break;
                    case 'ALREADY_PURCHASED':
                        speechOutput = 'Ya tienes la subscripción!';
                        break;
                    case 'DECLINED':
                        speechOutput = 'Se ha denegado la compra a la subcripción!';
                        break;
                    default:
                        speechOutput = 'Ha habido un problema durante el proceso de compra, vuelva a intentarlo';
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
