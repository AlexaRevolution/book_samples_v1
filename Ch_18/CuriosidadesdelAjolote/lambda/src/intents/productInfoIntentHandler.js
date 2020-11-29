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
                                upsellMessage: i18n.t('UPSELL_MSG')
                            },
                            token: product.productId
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
