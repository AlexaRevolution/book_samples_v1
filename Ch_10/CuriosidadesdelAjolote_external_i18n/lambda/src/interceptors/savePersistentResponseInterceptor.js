const Alexa = require('ask-sdk-core');
var moment = require('moment');

// This request interceptor will bind a translation function 't' to the handlerInput
module.exports = {
  SaveAttributesResponseInterceptor: {
    async process(handlerInput, response) {
      
      if (!response) return; // avoid intercepting calls that have no outgoing response due to errors
      const { attributesManager, requestEnvelope } = handlerInput;
      const sessionAtributes = attributesManager.getSessionAttributes();
      const translations = sessionAtributes['translations'];
      const downloaded = sessionAtributes['translations'].downloaded;

        if (downloaded) {

          persitentAttributes = await attributesManager.getPersistentAttributes();

          
          const locale = Alexa.getLocale(requestEnvelope);
          const ISOlocale = locale.split('-')[0];
          const timestamp = moment().toISOString();

          if (!('translations' in persitentAttributes)
              || (('translations' in persitentAttributes) && !(ISOlocale in persitentAttributes.translations))) {

            var saveObject = {};
            
            saveObject[ISOlocale] = {
              timestamp: timestamp,
              strings: translations,
            };
            persitentAttributes['translations'] = saveObject;

          } else {
              //Set values
              persitentAttributes.translations[ISOlocale].timestamp = timestamp;
              persitentAttributes.translations[ISOlocale].strings = translations;
          }
          
          console.log(
            'Saving to persistent storage:' + JSON.stringify(persitentAttributes)
          );
          //Persist values
          attributesManager.setPersistentAttributes(persitentAttributes);

          await attributesManager.savePersistentAttributes();
        }
    },
  },
};
