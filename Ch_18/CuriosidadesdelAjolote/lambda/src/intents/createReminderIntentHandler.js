'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
   CreateReminderIntentHandler : {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CreateReminderIntent';
    },
    async handle(handlerInput) {
      const remindersApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient();
      const { permissions } = handlerInput.requestEnvelope.context.System.user;

      if(!permissions) {
        return handlerInput.responseBuilder
          .speak(i18n.t('REMINDER_PERMISSIONS'))
          .withAskForPermissionsConsentCard(["alexa::alerts:reminders:skill:readwrite"])
          .getResponse();
        }

        const reminderRequest = {
            trigger: {
              type: "SCHEDULED_RELATIVE",
              offsetInSeconds: "15",
            },
            alertInfo: {
              spokenInfo: {
                content: [{
                  locale: Alexa.getLocale(handlerInput.requestEnvelope),
                  text: i18n.t('REMINDER_SCHEDULED'),
                }],
              },
            },
            pushNotification: {
              status: "ENABLED"
            }
          } 

          try {
            await remindersApiClient.createReminder(reminderRequest);
            } catch(error) {
           
            console.log(`~~~~ Error ${error}`)
            return handlerInput.responseBuilder
                .speak(i18n.t('REMINDER_CREATED_FAILURE'))
                .getResponse();
          }

      return handlerInput.responseBuilder
        .speak(i18n.t('REMINDER_CREATED_SUCCESS'))
        .reprompt(i18n.t('REMINDER_CREATED_SUCCESS'))  
        .getResponse();
    },
  },
};