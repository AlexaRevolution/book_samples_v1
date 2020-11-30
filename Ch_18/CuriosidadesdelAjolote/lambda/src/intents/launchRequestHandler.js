'use strict';

const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const axios = require('axios');
const apl_document = require('../documents/apl/welcome/welcome.json');
const apl_data = require('../documents/apl/welcome/welcome_data.json');
const apla_document = require('../documents/apla/welcome.json');
const APLA_TOKEN = 'TOKEN_APLA';
const APL_TOKEN = 'TOKEN_APL';

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

      let { accessToken } = handlerInput.requestEnvelope.context.System.user;
      
    /** if (!accessToken) {
        return handlerInput.responseBuilder
          .speak(i18n.t('ACCOUNT_LINKING_NOT_DONE_MSG'))
          .withLinkAccountCard()
          .getResponse();
      }else{
          const amznProfileUrl = `https://api.amazon.com/user/profile?access_token=${accessToken}`;
          try {
            const response = await axios.get(amznProfileUrl);
            let email = response.data.email;
            sessionAttributes['email'] = email;
            attributesManager.setSessionAttributes(sessionAttributes);
          } catch (error) {
            console.error(error);
          }
      } */

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

      const hintText = i18n.t('HINT_TEXT_MSG');

      //set new data
      apl_data.bodyTemplate6Data.hintText = hintText;
      apl_data.bodyTemplate6Data.textContent.primaryText.text = speakOutput;

      if (supportsAPL(handlerInput))
      {
          handlerInput.responseBuilder
              .addDirective({
              type: 'Alexa.Presentation.APL.RenderDocument',
              version: '1.4',
              document: apl_document,
              datasources: apl_data,
              token: APL_TOKEN
            });
      }

      const apla_data = {
        data: {
            textToSpeech: speakOutput
        }
      };

       handlerInput.responseBuilder.addDirective({
        type: 'Alexa.Presentation.APLA.RenderDocument',
        document: apla_document,
        datasources: apla_data,
        token: APLA_TOKEN
      });

      return handlerInput.responseBuilder
        .reprompt(speakOutput)
        .getResponse();
    },
  },
};

function supportsAPL(handlerInput) {
  const supportedInterfaces = handlerInput.requestEnvelope.context.System.device.supportedInterfaces;
  const aplInterface = supportedInterfaces['Alexa.Presentation.APL'];
  return aplInterface !== null && aplInterface !== undefined;
}