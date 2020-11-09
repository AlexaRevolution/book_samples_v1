'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
  HelpIntentHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
                && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {

      const { attributesManager } = handlerInput;

      const requestAttributes = attributesManager.getRequestAttributes();

      console.log(JSON.stringify(requestAttributes));

      const sessionAttributes = attributesManager.getSessionAttributes();

      console.log(JSON.stringify(sessionAttributes));

      const speakOutput = i18n.t('HELP_MSG', {location: sessionAttributes.location, 
                                              userName: sessionAttributes.name, 
                                              temperature: sessionAttributes.temperature, 
                                              cafeteria: sessionAttributes.places.cafeteria  });

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};
