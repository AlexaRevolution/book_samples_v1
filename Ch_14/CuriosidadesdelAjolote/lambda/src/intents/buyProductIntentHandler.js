'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    BuyProductIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'BuyProductIntent';
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
                        name: 'Buy',
                        payload: {
                            InSkillProduct: {
                                productId: product.productId
                            }
                        },
                        token: product.productId,
                    })
                    .getResponse();
            } else {
    
                return handlerInput.responseBuilder
                    .speak('No se encuentra ningún producto disponible')
                    .reprompt('Tienes alguna duda sobre algun producto?')
                    .getResponse();
            }
        }
    }, 
};
