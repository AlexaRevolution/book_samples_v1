const Alexa = require('ask-sdk-core');

module.exports = {
    SessionAttributesRequestInterceptor: {
        process(handlerInput) {

            const { attributesManager, requestEnvelope } = handlerInput;
                     
            if(Alexa.isNewSession(requestEnvelope)){
                var temperature = '26 ºC'

                var toSaveDuringAllSession = {
                    temperature: temperature
                }
                attributesManager.setSessionAttributes(toSaveDuringAllSession);
            }

        }
    }
}