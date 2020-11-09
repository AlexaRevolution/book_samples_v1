'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    ListProductsIntentHandler: {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ListProductsIntent';
        },
        async handle(handlerInput) {
            
            let locale = Alexa.getLocale(handlerInput.requestEnvelope);
            let { serviceClientFactory } = handlerInput;
            let monetizationClient = serviceClientFactory.getMonetizationServiceClient();
    
            let products = await monetizationClient.getInSkillProducts(locale);
    
            let availableProducts = products.inSkillProducts.filter(product => product.purchasable === 'PURCHASABLE');
    
            if (availableProducts.length > 0) {
    
                const productsMap = availableProducts.map(product => product.name);
                let productsString = productsMap.join(', '); 
    
                let speechOutput = 'Los productos disponibles para la compra son: ' + productsString;
                return handlerInput.responseBuilder
                    .speak(speechOutput)
                    .reprompt('Tienes alguna duda sobre los productos?')
                    .getResponse();
            }
    
            return handlerInput.responseBuilder
                .speak('Lo siunto pero no encuentro ningun producto disponible')
                .reprompt('Tienes alguna duda sobre los productos?')
                .getResponse();
        }
    },    
};
