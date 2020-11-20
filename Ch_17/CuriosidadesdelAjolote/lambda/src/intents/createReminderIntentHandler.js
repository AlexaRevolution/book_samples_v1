'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
   CreateReminderIntentHandler : {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
      const remindersApiClient = handlerInput.serviceClientFactory.getReminderManagementServiceClient(),
      const { permissions } = handlerInput.requestEnvelope.context.System.user

      if(!permissions) {
        return handlerInput.responseBuilder
          .speak(i18n.t('REMINDER_PERMISSIONS'))
          .withAskForPermissionsConsentCard(["alexa::alerts:reminders:skill:readwrite"])
          .getResponse()
        }

        const reminderRequest = {
            trigger: {
              type: "SCHEDULED_RELATIVE",
              offsetInSeconds: "15",
            },
            alertInfo: {
              spokenInfo: {
                content: [{
                  locale: "es-MX",
                  text: i18n.t('REMINDER_SCHEDULED'),
                }],
              },
            },
            pushNotification: {
              status: "ENABLED"
            }
          }

      remindersApiClient.createReminder(reminderRequest)

      const speakOutput = i18n.t('REMINDER_CREATED_SUCCESS');

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)  
        .getResponse();
    },
  },
};