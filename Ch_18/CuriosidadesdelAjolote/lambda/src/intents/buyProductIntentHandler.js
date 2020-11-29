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
                    .speak(i18n.t('NOT_AVAILABLE_PRODUCTS_MSG'))
                    .reprompt(i18n.t('AVAILABLE_PRODUCTS_REPROMPT_MSG'))
                    .getResponse();
            }
        }
    }, 
};
