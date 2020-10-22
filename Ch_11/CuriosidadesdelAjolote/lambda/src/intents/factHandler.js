'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
  FactHandler: {
      canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'FactIntent';
      },
      handle(handlerInput) {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = i18n.t('GET_FACT_MESSAGE') + randomFact;

        return handlerInput.responseBuilder
          .speak(speechOutput)
          .withShouldEndSession(false)
          .getResponse();
      },
    },
};

const data = [
  //Agrega tu contenido de datos curiosos aqui...
  'su apariencia es como la de un renacuajo.',
  'sus ojos son muy pequeños y no tienen párpados.',
  'son de muchos colores.',
  'ponen entre 300 a 1000 huevecillos.',
  'tienen la capacidad de regeneración.',
];
