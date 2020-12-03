'use strict';

// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

let { AjoloteTaskHandler } = require('./intents/ajoloteTaskHandler');
let { LaunchRequestHandler } = require('./intents/launchRequestHandler');
let { FactHandler } = require('./intents/factHandler');
let { ContactHandler } = require('./intents/contactHandler');
let { CaracteristicasAjoloteHandler } = require('./intents/caracteristicasAjoloteHandler');
let { CreateReminderIntentHandler } = require('./intents/createReminderIntentHandler');
let { ConnectionsResponsetHandler } = require('./intents/connectionsResponseHandler');
let { CreateTimerIntentHandler } = require('./intents/createTimerIntentHandler');
let { YesNoIntentHandler } = require('./intents/yesNoIntentHandler');
let { NotCompletedTypeAjoloteHandler } = require('./intents/typeAjoloteManualHandler');
let { CompletedTypeAjoloteHandler } = require('./intents/typeAjoloteManualHandler');
let { HelpIntentHandler } = require('./intents/helpIntentHandler');
let { CancelAndStopIntentHandler } = require('./intents/cancelAndStopIntentHandler');
let { FallbackIntentHandler } = require('./intents/fallbackIntentHandler');
let { SessionResumedRequestHandler } = require('./intents/sessionResumedRequestHandler');
let { SessionEndedRequestHandler } = require('./intents/sessionEndedRequestHandler');
let { IntentReflectorHandler } = require('./intents/intentReflectorHandler');
let { ErrorHandler } = require('./errors/errorHandler');
let { LocalisationRequestInterceptor } = require('./interceptors/localisationRequestInterceptor');
let { RequestAttributesRequestInterceptor } = require('./interceptors/requestAttributesRequestInterceptor');
let { SessionAttributesRequestInterceptor } = require('./interceptors/sessionAttributesRequestInterceptor');
let { PersistentAttributesRequestInterceptor } = require('./interceptors/persistentAttributesRequestInterceptor');
let { SaveAttributesResponseInterceptor } = require('./interceptors/savePersistentResponseInterceptor');
let { AskForNameIntentHandler } = require('./intents/askForNameIntentHandler');
let { getPersistenceAdapter, getLocalDynamoDBClient } = require('./utilities/util');
let { ProductInfoIntentHandler } = require('./intents/productInfoIntentHandler');
let { BuyProductIntentHandler } = require('./intents/buyProductIntentHandler');
let { UpsellOrBuyResponseHandler } = require('./intents/upsellOrBuyResponseHandler');
let { RefundProductIntentHandler } = require('./intents/refundProductIntentHandler');
let { ListProductsIntentHandler } = require('./intents/listProductsIntentHandler');
let { CancelProductResponseHandler } = require('./intents/cancelProductResponseHandler');

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
        AjoloteTaskHandler,
        LaunchRequestHandler,
        FactHandler,
        CreateReminderIntentHandler,
        CreateTimerIntentHandler,
        ConnectionsResponsetHandler,
        YesNoIntentHandler,
        AskForNameIntentHandler,
        ContactHandler,
        CaracteristicasAjoloteHandler,
        NotCompletedTypeAjoloteHandler,
        CompletedTypeAjoloteHandler,
        HelpIntentHandler,
        ListProductsIntentHandler,
        ProductInfoIntentHandler,
        BuyProductIntentHandler,
        UpsellOrBuyResponseHandler,
        RefundProductIntentHandler,
        CancelProductResponseHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionResumedRequestHandler,
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
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();