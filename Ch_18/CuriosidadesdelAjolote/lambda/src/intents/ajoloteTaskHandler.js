'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
    AjoloteTaskHandler: {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
            && request.task
            && request.task.name.indexOf("Ajolote") !== -1;
    },
    handle(handlerInput) {
        const speechText = i18n.t('CUSTOM_TASK_SUCCESS');

        /*return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective({
                "type": "Tasks.CompleteTask",
                "status": {
                    "code": "200",
                    "message": "Ajolote significa monstruo acuático.",
                }
            })
        */

       return handlerInput.responseBuilder
       .speak(speechText)
       .addDirective({
           'type': 'Connections.StartConnection', 
           'uri': 'connection://[YOUR_SKILL_ID]. AjoloteType/1?provider=[YOUR_SKILL_ID]',
           'input': {
               'type': 'leucístico'
           },
           'token': '[YOUR_CORRELATION_TOKEN]'
        })
   
        .withShouldEndSession(true)
        .getResponse();
    },
  }
}