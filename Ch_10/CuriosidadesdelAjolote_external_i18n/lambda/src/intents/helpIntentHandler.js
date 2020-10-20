'use strict';

const Alexa = require('ask-sdk-core');
const i18nUtils = require('../utilities/i18nUtils');

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

      const speakOutput = i18nUtils.getTranslation('HELP_MSG', handlerInput, {location: requestAttributes.userLocation, 
                                              userName: requestAttributes.userName, 
                                              temperature: sessionAttributes.temperature, 
                                              cafeteria: sessionAttributes.places.cafeteria  });

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};
