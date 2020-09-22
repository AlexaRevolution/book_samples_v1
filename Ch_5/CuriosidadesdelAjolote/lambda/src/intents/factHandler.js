const Alexa = require('ask-sdk-core');

const FactHandler = {
  canHandle(handlerInput) {
	const request = handlerInput.requestEnvelope.request;
	return request.type === 'IntentRequest'
    	&& request.intent.name === 'FactIntent';
  },
  handle(handlerInput) {
	const factArr = data;
	const factIndex = Math.floor(Math.random() * factArr.length);
	const randomFact = factArr[factIndex];
	const speechOutput = GET_FACT_MESSAGE + randomFact;

	return handlerInput.responseBuilder
  	.speak(speechOutput)
  	.withShouldEndSession(true)
 	 .getResponse();
  },
};

const SKILL_NAME = 'Curiosidades del Ajolote';
const GET_FACT_MESSAGE = 'Un dato curioso es que ';
const data = [
  //Agrega tu contenido de datos curiosos aqui...
  'su apariencia es como la de un renacuajo.',
  'sus ojos son muy pequeños y no tienen párpados.',
  'son de muchos colores.',
  'ponen entre 300 a 1000 huevecillos.',
  'tienen la capacidad de regeneración.',
];
