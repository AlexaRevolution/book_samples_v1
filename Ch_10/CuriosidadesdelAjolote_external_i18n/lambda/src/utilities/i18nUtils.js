const Alexa = require('ask-sdk-core');
const rp = require('request-promise');
var moment = require('moment');
const sprintfJs = require('sprintf-js')



const poEditorToken='3af6ba0fa02f86fcf38bbe1b533461f1'
const poEditorProjectId='382731'
const poEditorEndpoint='https://api.poeditor.com/v2/terms/list'

module.exports = {

    downloadTranslations: async function downloadTranslations(locale, handlerInput) {

        const ISOlocale = locale.split('-')[0];
        const { attributesManager } = handlerInput;
        var sessionAtrributes = attributesManager.getSessionAttributes();
        var download = false;
        //New session stablished
        if(!('translations' in sessionAtrributes)){
            console.log('NO TRANSLATIONS IN SESSION');
            persitentAttributes = await attributesManager.getPersistentAttributes();
            if(!('translations' in persitentAttributes)){
                console.log('NO TRANSLATIONS IN DYNAMODB');
                download = true;
            
            }else{
                //we have translataions
                if((ISOlocale in persitentAttributes.translations)){
                        const lastDowloaded = moment(persitentAttributes.translations[ISOlocale].timestamp);
                        const today = moment();

                        var diffDays = today.diff(lastDowloaded, 'days');
                        if(diffDays >= 7){
                            console.log('THERE ARE TRANSLATIONS IN DYNAMODB FOR CURRENT LOCALE BUT TO OLD');
                            download = true;
                        }else{
                            console.log('THERE ARE TRANSLATIONS IN DYNAMODB FOR CURRENT LOCALE');
                            download = false;
                            translations = persitentAttributes.translations[ISOlocale].strings;
                        }
                        
                }else{
                    console.log('THERE ARE TRANSLATIONS IN DYNAMODB BUT NOT FOR CURRENT LOCALE');
                    download = true
                }
            }
        }

        if(download){
            console.log('DOWNLOADING TRANSLATIONS...');
            translations = await rp.post(poEditorEndpoint, {
                form: {
                    api_token: poEditorToken,
                    id: poEditorProjectId,
                    language: ISOlocale
                }
            }).then(function (body) {
                // Request succeeded but might as well be a 404
                // Usually combined with resolveWithFullResponse = true to check response.statusCode
                return JSON.parse(body).result;
                
            })
            .catch(function (err) {
                // Request failed due to technical reasons...
            });
        }

        
        sessionAtrributes['translations'] = translations;
        sessionAtrributes['translations'].downloaded = download;
        console.log('TRANSLATIONS: ' + JSON.stringify(translations));

        attributesManager.setSessionAttributes(sessionAtrributes);

    },

    getTranslation: function getTranslation(key, handlerInput, replaceObjects) {

        const { attributesManager } = handlerInput;
        const sessionAtributes = attributesManager.getSessionAttributes();
        const terms = sessionAtributes['translations'].terms;

        for(var i = 0; i < terms.length; i++){
            t = terms[i];
            if(t.term === key){
                return sprintfJs.sprintf(t.translation.content, replaceObjects);
            }
        }

    },

    
};
