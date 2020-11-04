const Alexa = require("ask-sdk-core");

// This request interceptor will bind a translation function 't' to the handlerInput
module.exports = {
  SaveAttributesResponseInterceptor: {
    async process(handlerInput, response) {
      if (!response) return; // avoid intercepting calls that have no outgoing response due to errors

      const { attributesManager } = handlerInput;

      const sessionAttributes = attributesManager.getSessionAttributes();

      console.log(
        "Saving to persistent storage:" + JSON.stringify(sessionAttributes)
      );

      attributesManager.setPersistentAttributes(sessionAttributes);
      await attributesManager.savePersistentAttributes();
    },
  },
};
