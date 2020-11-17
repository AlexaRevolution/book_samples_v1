'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');

module.exports = {
  LaunchRequestHandler: {
    canHandle(handlerInput) {
      return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {

      const { attributesManager } = handlerInput;

      let persitentAttributes = await attributesManager.getPersistentAttributes();

      const sessionAttributes = attributesManager.getSessionAttributes();

      const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;

      try {

          const { deviceId } =  requestEnvelope.context.System.device;
          const deviceAddressServiceClient = serviceClientFactory.getDeviceAddressServiceClient();
          const address = await deviceAddressServiceClient.getFullAddress(deviceId);

          if (address == undefined 
              || (address.addressLine1 === null && address.stateOrRegion === null)) {
                
                //running in simulator
                sessionAttributes['location'] = 'Test Address';
                attributesManager.setSessionAttributes(sessionAttributes);
          } else {

              const completeAddress = address.addressLine1;
              sessionAttributes['location'] = completeAddress;
              attributesManager.setSessionAttributes(sessionAttributes);
          }

      } catch (error) {
      
          if (error.statusCode == 403) {
              return responseBuilder
                  .speak(i18n.t('REQUEST_ADDRESS_MSG'))
                  .withAskForPermissionsConsentCard(['read::alexa:device:all:address'])
                  .getResponse();

          }
      }

      if(!('name' in persitentAttributes) && !('name' in sessionAttributes)){
        const speakOutput = i18n.t('NO_NAME_MSG');

        return handlerInput.responseBuilder
              .speak(speakOutput)
              .addDelegateDirective({
                name: 'AskForName',
                confirmationStatus: 'NONE',
                slots: {}
              })
              .reprompt(speakOutput)
              .getResponse();
  
      }else{
        sessionAttributes['name'] = persitentAttributes.name;
        attributesManager.setSessionAttributes(sessionAttributes);
      }

      const speakOutput = i18n.t('WELCOME_MSG', {name: persitentAttributes.name});

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};
