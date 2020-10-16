'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const axios = require('axios');
const chargersUrl = 'https://api-electric-charger.herokuapp.com/electricCharger';

module.exports = {
  GetChargerHandler: {
      canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'GetChargerIntent';
      },
      async handle(handlerInput) {
        try {
          const e = await getChargers();
          const ecar = randomArrayElement(e);
          const speechText =
                `I found an electric charger station, his name is ${ecar.name},
                his plug type is ${ecar.plug_type},
                his kilowatt price is ${ecar.kw_price},
                currently it is ${ecar.state}
                his longitude is ${ecar.geolocation.longitude} 
                and his latitude is ${ecar.geolocation.latitude}`;

          const simpleCard = i18n.t('MSG_SIMPLE_CARD');

        return handlerInput.responseBuilder
          .speak(speechText)
          .withSimpleCard(simpleCard, speechText)
          .withShouldEndSession(false)
          .getResponse();
        } catch (error) { console.error(error);
        }
      },
    },
};

const randomArrayElement = (array) => 
  array[Math.floor(Math.random() * array.length)];

const getChargers = async () => { try {
  const { data } = await axios.get(chargersUrl);
      return data;
    } catch (error) {
      console.error('cannot fetch electric chargers for cars', error); }
  };