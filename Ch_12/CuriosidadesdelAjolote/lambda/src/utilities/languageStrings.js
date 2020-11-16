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
      WELCOME_MSG: '<emphasis level="strong">¡Hola {{name}}!</emphasis>  Gracias por usar Curiosidades del Ajolote, para comenzar puedes decir: dime un dato curioso del ajolote... o si deseas detenerme solo di: ¡Cancela!... entonces, ¿cómo te puedo ayudar?',
      HELLO_MSG_WITHOUT_SSML: '¡Hola {{name}}!  Gracias por usar Curiosidades del Ajolote, para comenzar puedes decir: dime un dato curioso del ajolote... o si deseas detenerme solo di: ¡Cancela!... entonces, ¿cómo te puedo ayudar?',
      HELLO_MSG: '¡Hola Mundo!',
      HELP_MSG: 'Hola {{userName}}, veo que estas en {{location}} y tienes una temperatura de {{temperature}}. He visto que tienes una cafeteria a {{cafeteria}}. Recuerda que puedes decir: dame un dato curioso del ajolote... o simplemente para detenerme puedes decir: ¡Cancela!... ¿Cómo te puedo ayudar?',
      GOODBYE_MSG: '<amazon:emotion name="excited" intensity="medium"> Hasta luego, y recuerda el ajolote se encuentra en peligro de extinción. </amazon:emotion>',
      REFLECTOR_MSG: 'Acabas de activar {{intentName}}',
      FALLBACK_MSG: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
      ERROR_MSG: '<audio src="soundbank://soundlibrary/musical/amzn_sfx_buzzer_small_01"/> Lo siento, ha habido un error. Por favor inténtalo otra vez.',

      GET_FACT_MESSAGE: 'Un dato curioso es que ',
      GET_TYPE_AXOLOTL: 'Has seleccionado el tipo de ajolote ',
      OK_COMPLETED_AXOLOTL: '<audio src="soundbank://soundlibrary/office/amzn_sfx_elevator_open_bell_01"/> <amazon:emotion name="excited" intensity="medium"> ¡Ese ajolote es el mejor del mundo!</amazon:emotion>',
      CONTACT_MESSAGE: 'Puedes obtener mas informacion en ajolote arroba alexa.com',
      NO_NAME_MSG: 'No se como te llamas, ¿Como debo dirigirme a ti?',
      NAME_SAVED_OK: 'Información guardada correctamente!',
      NAME_SAVING: 'Estoy guardando la información!',
      NO_ADDRESS_MSG: 'Este dispositivo no tiene configurada ninguna dirección. Te recomendamos usar un dispositivo físico o la app de Amazon Alexa',
      REQUEST_ADDRESS_MSG: 'Necesitamos acceder a su ubicación para continuar con la Skill.'
    },
  },
  en: {
    translation: {
      SKILL_NAME: 'Curiosities of the Axolotl',
      WELCOME_MSG: '<emphasis level="strong">Hello {{name}}!</emphasis>  welcome to Curiosities of the Axolotl, to start you can say: tell me a curious fact about the axolotl ... or if you want to stop me just say: Cancel! ... then how can I help you?',
      HELLO_MSG_WITHOUT_SSML: 'Hello {{name}}!  welcome to Curiosities of the Axolotl, to start you can say: tell me a curious fact about the axolotl ... or if you want to stop me just say: Cancel! ... then how can I help you?',
      HELLO_MSG: 'Hello World!',
      HELP_MSG: 'Hello {{userName}}, I am seeing that you are at {{location}} and you have a temperature of {{temperature}}. I have seen you have a cafeteria about {{cafeteria}}. You can say: give me a curious fact about the axolotl ... or simply to stop me you can say: Cancel! ... How can I help you?',
      GOODBYE_MSG: '<amazon:emotion name="excited" intensity="medium">Goodbye, and remember the axolotl is in danger of extinction. </amazon:emotion>',
      REFLECTOR_MSG: 'You just activated {{intentName}}',
      FALLBACK_MSG: 'Sorry, I do not know anything about that. Please try again.',
      ERROR_MSG: '<audio src="soundbank://soundlibrary/musical/amzn_sfx_buzzer_small_01"/> Sorry, there was an error. Please try again.',

      GET_FACT_MESSAGE: 'A curious fact is that ',
      GET_TYPE_AXOLOTL: 'You have selected the type of axolotl ',
      OK_COMPLETED_AXOLOTL: '<audio src="soundbank://soundlibrary/office/amzn_sfx_elevator_open_bell_01"/> <amazon:emotion name="excited" intensity="medium"> That axolotl is the best in the world!</amazon:emotion>',
      CONTACT_MESSAGE: 'You can get more information on ajolote at alexa.com',
      NO_NAME_MSG: 'I do not know your know, ¿What is your name?',
      NAME_SAVED_OK: 'Information saved succefully!',
      NAME_SAVING: 'I am saving the information!',
      NO_ADDRESS_MSG: 'This device has no set any address configured. We recommend you to use a device or the Amazon Alexa app',
      REQUEST_ADDRESS_MSG: 'We need to acces to your address in order to continue.'
    },
    
  },
};
