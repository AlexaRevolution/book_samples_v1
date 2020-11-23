'use strict';

const Alexa = require('ask-sdk-core');
const axios = require('axios');
const moment = require('moment');
const i18n = require('i18next');

const timerItem = {
    "duration": "PT15S", //Timer de 15 Segundos
    "timerLabel": "Ajolote",
    "creationBehavior": {
        "displayExperience": {
            "visibility": "VISIBLE"
        }
    },
    "triggeringBehavior": {
        "operation": {
            "type": "ANNOUNCE",
            "textToAnnounce": [
                {
                    "locale": "es-MX",
                    "text": i18n.t('TIMER_FINISH')
                }
            ]
        },
        "notificationConfig": {
            "playAudible": true
        }
    }
};

module.exports = {
   CreateReminderIntentHandler : {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateTimerIntent';
    },
    async handle(handlerInput) {
        const { permissions } = handlerInput.requestEnvelope.context.System.user;

      return handlerInput.responseBuilder
        .speak("DEMO")
        .reprompt("DEMO")  
        .getResponse();
    },
  },
};