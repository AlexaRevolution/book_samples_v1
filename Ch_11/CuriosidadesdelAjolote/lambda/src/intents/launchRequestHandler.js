'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {

      const { attributesManager } = handlerInput;

      let persitentAttributes = await attributesManager.getPersistentAttributes();

      const sessionAttributes = attributesManager.getSessionAttributes();

      if(!('name' in persitentAttributes) && !('name' in sessionAttributes)){
        const speakOutput = i18n.t('NO_NAME_MSG');

        return handlerInput.responseBuilder
              .speak(speakOutput)
              .addDelegateDirective({
                name: 'AskForName',
                confirmationStatus: 'NONE',
                slots: {}
              })
              .reprompt(speakOutput)
              .getResponse();
  
      }else{
        sessionAttributes['name'] = persitentAttributes.name;
      }

      const speakOutput = i18n.t('WELCOME_MSG', {name: persitentAttributes.name});

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};
