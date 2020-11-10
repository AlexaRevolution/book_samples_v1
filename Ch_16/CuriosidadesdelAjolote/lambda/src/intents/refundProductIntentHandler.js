'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    RefundProductIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RefundProductIntent';
        },
        async handle(handlerInput) {
    
            let locale = Alexa.getLocale(handlerInput.requestEnvelope);
            let { serviceClientFactory } = handlerInput;
    
            let monetizationClient = serviceClientFactory.getMonetizationServiceClient();
    
            let productList = await monetizationClient.getInSkillProducts(locale);
    
            let product = productList.inSkillProducts.find(item => item.referenceName === 'premium_goodbye_message');
            return handlerInput.responseBuilder
                .addDirective({
                    type: 'Connections.SendRequest',
                    name: 'Cancel',
                    payload: {
                        InSkillProduct: {
                            productId: product.productId
                        }
                    },
                    token: product.productId,
                })
                .getResponse();
        }
    },
};
