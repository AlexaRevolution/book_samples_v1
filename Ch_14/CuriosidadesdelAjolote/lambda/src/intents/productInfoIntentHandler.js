'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    ProductInfoIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProductInfoIntent';
        },
        async handle(handlerInput) {
    
            let locale = Alexa.getLocale(handlerInput.requestEnvelope);
            let { serviceClientFactory } = handlerInput;
    
            let monetizationClient = serviceClientFactory.getMonetizationServiceClient();
    
            let products = await monetizationClient.getInSkillProducts(locale);
    
            let product = products.inSkillProducts.find(prod => prod.referenceName === 'premium_goodbye_message' && prod.purchasable === 'PURCHASABLE');
    
            if (product) {
    
                return handlerInput.responseBuilder
                        .addDirective({
                            type: 'Connections.SendRequest',
                            name: 'Upsell',
                            payload: {
                                InSkillProduct: {
                                    productId: product.productId
                                },
                                upsellMessage: 'Genial! Quieres saber mas sobre el producto?'
                            },
                            token: product.productId
                        })
                        .getResponse();
            } else {
    
                return handlerInput.responseBuilder
                    .speak('No hemos encontrado ningun producto disponible')
                    .reprompt('Tienes alguna duda sobre algun producto?')
                    .getResponse();
            }
        }
    },    
};
