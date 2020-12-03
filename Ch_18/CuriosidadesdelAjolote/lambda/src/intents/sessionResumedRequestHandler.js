'use strict';

const Alexa = require('ask-sdk-core');

module.exports = {
   SessionResumedRequestHandler : {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'SessionResumedRequest';
    },
    handle(handlerInput) {
        const status = handlerInput.requestEnvelope.request.cause.status;
        const code = status.code;
        const message = status.message;
        console.log(`SessionResumedRequest received status code : ${code} and message : ${message}`);
    
        // El sessionId actual es el mismo que el de IntentRequest anterior cuando se devolvió la directiva Connections.StartConnection original.
        const currentSessionId = handlerInput.requestEnvelope.session.sessionId;
        return handlerInput.responseBuilder
            .speak("Solicitud de la Skill recibida - SessionResumedRequest")
            .getResponse();
        }
    }
}   