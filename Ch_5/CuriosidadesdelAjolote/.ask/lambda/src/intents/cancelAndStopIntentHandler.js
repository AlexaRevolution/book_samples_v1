const Alexa = require('ask-sdk-core');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Hasta luego, y recuerda el ajolote se encuentra en peligro de extinción.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
