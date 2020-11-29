'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    ConnectionsResponsetHandler  : {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response'
            && handlerInput.requestEnvelope.request.name === 'AskFor';
        },
        handle(handlerInput) {
   
            const { status, payload } = handlerInput.requestEnvelope.request;
            

            if (status.code === '200') {
                switch (payload.status) {
                    case "ACCEPTED":
                        return handlerInput.responseBuilder
                            .speak(i18n.t('TIMER_ACCEPTED'))
                            .reprompt(i18n.t('TIMER_ACCEPTED'))
                            .getResponse();
                    case "DENIED":
                        return handlerInput.responseBuilder
                            .speak(i18n.t('TIMER_NOT_ACCEPTED'))
                            .getResponse();
                    case "NOT_ANSWERED":
                        return handlerInput.responseBuilder
                            .speak(i18n.t('TIMER_NOT_ACCEPTED'))
                            .getResponse();
                }
            }

            if (status.code === '400') {
                console.log('You forgot to specify the permission in the skill manifest!')
            }

            if (status.code === '500') {
                return handlerInput.responseBuilder
                    .speak(i18n.t('TIMER_CREATED_ERROR'))
                    .reprompt(i18n.t('TIMER_CREATED_ERROR'))
                    .getResponse();
            }
            

            console.log(`Connections.Response.AskFor indicated failure. error: ${request.status.message}`);
    
            return handlerInput.responseBuilder
                .speak(i18n.t('TIMER_CREATED_ERROR'))
                .reprompt(i18n.t('TIMER_CREATED_ERROR'))
                .getResponse();
        }
    }
}