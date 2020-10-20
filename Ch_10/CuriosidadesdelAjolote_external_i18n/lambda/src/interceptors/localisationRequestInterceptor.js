const Alexa = require('ask-sdk-core');

const i18nUtils = require('../utilities/i18nUtils');

// This request interceptor will bind a translation function 't' to the handlerInput
module.exports = {
    LocalisationRequestInterceptor: {
        async process(handlerInput) {

            const locale = Alexa.getLocale(handlerInput.requestEnvelope);
            await i18nUtils.downloadTranslations(locale, handlerInput);

        }
    }
}