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
    YesNoIntentHandler : {
        canHandle(handlerInput) {
            return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent'
                    || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
        },
        async handle(handlerInput) {
            if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent') {
    
                const duration = moment.duration(timerItem.duration),
                    hours = (duration.hours() > 0) ? `${duration.hours()} ${(duration.hours() === 1) ? "hora" : "horas"},` : "",
                    minutes = (duration.minutes() > 0) ? `${duration.minutes()} ${(duration.minutes() === 1) ? "minuto" : "minutos"} ` : "",
                    seconds = (duration.seconds() > 0) ? `${duration.seconds()} ${(duration.seconds() === 1) ? "segundo" : "segundos"}` : "";
    
                const options = {
                    headers: {
                        "Authorization": `Bearer ${Alexa.getApiAccessToken(handlerInput.requestEnvelope)}`,
                        "Content-Type": "application/json"
                    }
                };
    
                await axios.post('https://api.amazonalexa.com/v1/alerts/timers', timerItem, options)
                    .then(response => {
                        handlerInput.responseBuilder
                            .speak(`Tu ${timerItem.timerLabel} temporizador está configurado para ${hours} ${minutes} ${seconds}.`);
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
    
            if (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent') {
                handlerInput.responseBuilder
                    .speak(i18n.t('TIMER_NOT_STARTED'));
            }
    
            return handlerInput.responseBuilder
                .getResponse();
        }
    }
}