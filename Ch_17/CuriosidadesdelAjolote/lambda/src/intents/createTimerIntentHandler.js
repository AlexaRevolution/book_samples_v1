'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
   CreateReminderIntentHandler : {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateTimerIntent';
    },
    async handle(handlerInput) {
        const { permissions } = handlerInput.requestEnvelope.context.System.user;

        if (!permissions) {
            handlerInput.responseBuilder
                .speak(i18n.t('TIMER_PERMISSIONS'))
                .addDirective({
                    type: "Connections.SendRequest",
                    name: "AskFor",
                    payload: {
                        "@type": "AskForPermissionsConsentRequest",
                        "@version": "1",
                        "permissionScope": "alexa::alerts:timers:skill:readwrite"
                    },
                    token: ""
                });

        } else {
            handlerInput.responseBuilder
                .speak(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'))
                .reprompt(i18n.t('TIMER_ASK_CONFIG_PERMISSIONS'))
        }

      return handlerInput.responseBuilder
      .speak(i18n.t('TIMER_CREATED_SUCCESS'))
      .reprompt(i18n.t('TIMER_CREATED_SUCCESS'))  
      .getResponse();
    },
  },
};