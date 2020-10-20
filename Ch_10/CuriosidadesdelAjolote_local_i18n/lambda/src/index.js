'use strict';

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

let { LaunchRequestHandler } = require('./intents/launchRequestHandler');
let { FactHandler } = require('./intents/factHandler');
let { ContactHandler } = require('./intents/contactHandler');
let { CaracteristicasAjoloteHandler } = require('./intents/caracteristicasAjoloteHandler');
let { NotCompletedTypeAjoloteHandler } = require('./intents/typeAjoloteManualHandler');
let { CompletedTypeAjoloteHandler } = require('./intents/typeAjoloteManualHandler');
let { HelpIntentHandler } = require('./intents/helpIntentHandler');
let { CancelAndStopIntentHandler } = require('./intents/cancelAndStopIntentHandler');
let { FallbackIntentHandler } = require('./intents/fallbackIntentHandler');
let { SessionEndedRequestHandler } = require('./intents/sessionEndedRequestHandler');
let { IntentReflectorHandler } = require('./intents/intentReflectorHandler');
let { ErrorHandler } = require('./errors/errorHandler');
let { LocalisationRequestInterceptor } = require('./interceptors/localisationRequestInterceptor');
let { RequestAttributesRequestInterceptor } = require('./interceptors/requestAttributesRequestInterceptor');
let { SessionAttributesRequestInterceptor } = require('./interceptors/sessionAttributesRequestInterceptor');
let { PersistentAttributesRequestInterceptor } = require('./interceptors/persistentAttributesRequestInterceptor');
let { SaveAttributesResponseInterceptor } = require('./interceptors/savePersistentResponseInterceptor');
let { getPersistenceAdapter, getLocalDynamoDBClient } = require('./utilities/util');

var local = process.env.DYNAMODB_LOCAL
let persistenceAdapter;
//depending if we have enabled the local DynamoDB, we create de persistence adapter with or without local client
if(local === 'true'){
  let options = { port: 8000 }
  let dynamoDBClient = getLocalDynamoDBClient(options); 
  persistenceAdapter = getPersistenceAdapter("ajolote-table", true, dynamoDBClient);
}else{
  persistenceAdapter = getPersistenceAdapter("ajolote-table", true);
}



// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FactHandler,
        ContactHandler,
        CaracteristicasAjoloteHandler,
        NotCompletedTypeAjoloteHandler,
        CompletedTypeAjoloteHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalisationRequestInterceptor,
        RequestAttributesRequestInterceptor,
        SessionAttributesRequestInterceptor,
        PersistentAttributesRequestInterceptor)
    .addResponseInterceptors(
        SaveAttributesResponseInterceptor)
    .withPersistenceAdapter(persistenceAdapter)
    .lambda();