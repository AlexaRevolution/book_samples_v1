const Alexa = require('ask-sdk-core');

module.exports = {
    PersistentAttributesRequestInterceptor: {
        async process(handlerInput) {

            const { attributesManager } = handlerInput;

            const sessionAttributes = attributesManager.getSessionAttributes();

            if(!('places' in sessionAttributes)){
                persitentAttributes = await attributesManager.getPersistentAttributes();

                if(!('places' in persitentAttributes)){
                    console.log('NO PLACES IN DYNAMODB');
                    sessionAttributes['places'] = {
                        cafeteria: '200m'
                    }
                    attributesManager.setPersistentAttributes(sessionAttributes);
                }else{
                    sessionAttributes['places'] = persitentAttributes.places;
                }
            }

            attributesManager.setSessionAttributes(sessionAttributes);

        }
    }
}
