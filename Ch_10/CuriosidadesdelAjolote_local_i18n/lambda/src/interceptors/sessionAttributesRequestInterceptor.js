const Alexa = require('ask-sdk-core');

module.exports = {
    SessionAttributesRequestInterceptor: {
        process(handlerInput) {

            const { attributesManager, requestEnvelope } = handlerInput;

            const requestAttributes = attributesManager.getRequestAttributes();

            var location = requestAttributes.userLocation;
            
            if(Alexa.isNewSession(requestEnvelope)){
                var temperature = '26 ºC'

                var toSaveDuringAllSession = {
                    location: location,
                    temperature: temperature
                }
                attributesManager.setSessionAttributes(toSaveDuringAllSession);
            }

        }
    }
}