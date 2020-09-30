'use strict';

const Alexa = require('ask-sdk-core');

module.exports = {
  SessionEndedRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
      console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
      // Any cleanup logic goes here.
      return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    },
  },
};
