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
      SKILL_NAME: 'Curiosidades del Ajolote',
      WELCOME_MSG: '¡Hola! bienvenido a Curiosidades del Ajolote, para comenzar puedes decir: dime un dato curioso del ajolote... o si deseas detenerme solo di: ¡Cancela!... entonces, ¿cómo te puedo ayudar?',
      HELLO_MSG: 'Hola Mundo!',
      HELP_MSG: 'Puedes decir: dame un dato curioso del ajolote... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?',
      GOODBYE_MSG: 'Hasta luego, y recuerda el ajolote se encuentra en peligro de extinción.',
      REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
      FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.',

      GET_FACT_MESSAGE: 'Un dato curioso es que '
    },
  },
  en: {
    translation: {
      SKILL_NAME: 'Curiosidades del Ajolote',
      WELCOME_MSG: '¡Hola! bienvenido a Curiosidades del Ajolote, para comenzar puedes decir: dime un dato curioso del ajolote... o si deseas detenerme solo di: ¡Cancela!... entonces, ¿cómo te puedo ayudar?',
      HELLO_MSG: 'Hola Mundo!',
      HELP_MSG: 'Puedes decir: dame un dato curioso del ajolote... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?',
      GOODBYE_MSG: 'Hasta luego, y recuerda el ajolote se encuentra en peligro de extinción.',
      REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
      FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MSG: 'Lo siento, ha habido un error. Por favor inténtalo otra vez.',

      GET_FACT_MESSAGE: 'Un dato curioso es que '
    },
  },
};
