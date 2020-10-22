const Alexa = require('ask-sdk-core');

module.exports = {
    RequestAttributesRequestInterceptor: {
        process(handlerInput) {

            const { attributesManager, requestEnvelope } = handlerInput;

            var toSave = {};
            toSave.userName = 'Emma';
            toSave.userLocation = 'Guadalupe';

            attributesManager.setRequestAttributes(toSave);

        }
    }
}
