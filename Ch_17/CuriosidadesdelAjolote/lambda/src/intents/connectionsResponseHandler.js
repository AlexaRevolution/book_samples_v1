'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    ConnectionsResponsetHandler  : {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Connections.Response';
        },
        handle(handlerInput) {
            const { permissions } = handlerInput.requestEnvelope.context.System.user;
    
            const status = handlerInput.requestEnvelope.request.payload.status;
    
            if (!permissions) {
                return handlerInput.responseBuilder
                    .speak(i18n.t('TIMER_SORRY_CONFIG_PERMISSIONS'))
                    .addDirective({
                        type: "Connections.SendRequest",
                        name: "AskFor",
                        payload: {
                            "@type": "AskForPermissionsConsentRequest",
                            "@version": "1",
                            "permissionScope": "alexa::alerts:timers:skill:readwrite"
                        },
                        token: "user-id-could-go-here"
                    })
                    .getResponse();
            }
    
            switch (status) {
                case "ACCEPTED":
                    handlerInput.responseBuilder
                        .speak(i18n.t('TIMER_ACCEPTED'))
                        .reprompt(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'));
                    break;
                case "DENIED":
                    handlerInput.responseBuilder
                        .speak(i18n.t('TIMER_NOT_ACCEPTED'))
                    break;
                case "NOT_ANSWERED":
                    break;
                default:
                    handlerInput.responseBuilder
                        .speak(i18n.t('TIMER_ACCEPTED'))
                        .reprompt(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'));
            }
    
            return handlerInput.responseBuilder
                .getResponse();
        }
    }
}