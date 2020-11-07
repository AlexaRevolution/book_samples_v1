'use strict';

/* *
 * We create a language strings object containing all of our strings.
 * The keys for each string will then be referenced in our code, e.g. i18n.t('WELCOME_MSG').
 * The localisation interceptor in index.js will automatically choose the strings
 * that match the request's locale.
 * */

module.exports = {
  es: {
    translation: {
      SKILL_NAME: 'Cargadores de Carro',
      WELCOME_MSG: '¡Gracias por usar API Electric Charger! Para comenzar puedes decir: "dame opciones de cargadores", esto para obtener información, o simplemente para detenerme puedes decir: ¡cancela!... ¿cómo te puedo ayudar?',
      HELLO_MSG: '¡Hola Mundo!',
      HELP_MSG: 'Puedes decir: dame opciones de cargadores... o simplemente para detenerme puedes decir: ¡cancela!... ¿cómo te puedo ayudar?',
      GOODBYE_MSG: '¡Hasta luego!',
      REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
      FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.',

      MSG_SIMPLE_CARD: 'API electricCharger'
      
    },
  },
  en: {
    translation: {
      SKILL_NAME: 'Charger Car',
      WELCOME_MSG: 'Welcome to API Electric Charger! To start you can say "chargers" to get information.',
      HELLO_MSG: 'Hello World!',
      HELP_MSG: 'You can say: give me charger options... or simply to stop me you can say: cancel! ... How can I help you?',
      GOODBYE_MSG: 'See you later!',
      REFLECTOR_MSG: 'You just activated {{intentName}}',
      FALLBACK_MSG: 'Sorry, I do not know anything about that. Please try again.',
      ERROR_MSG: 'Sorry, there was an error. Please try again.',

      MSG_CAR_NAME: 'I found an electric charger station, his name is ',

      MSG_SIMPLE_CARD: 'API electricCharger'
    },
  },
};