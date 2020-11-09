'use strict';

const AWS = require('aws-sdk');
const Alexa = require('ask-sdk-core');
const { DynamoDbPersistenceAdapter } = require('ask-sdk-dynamodb-persistence-adapter');
const sp = require('synchronized-promise');
const dynamodbLocal = require('dynamodb-localhost');

const s3SigV4Client = new AWS.S3({
    signatureVersion: 'v4'
});

module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {

    const bucketName = process.env.S3_PERSISTENCE_BUCKET;
    const s3PreSignedUrl = s3SigV4Client.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: s3ObjectKey,
        Expires: 60*1 // the Expires is capped for 1 minute
    });
    console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
    return s3PreSignedUrl;

}


module.exports = {

    getLocalDynamoDBClient: function getLocalDynamoDBClient(options) {

        const initializeClient = () => {
            return new Promise((resolve, reject) => {
                dynamodbLocal.install(() => {
                    if (!options) reject(new Error('no options passed in!'))
                    dynamodbLocal.start(options);
                    resolve();
                });    
            })
        };

        let syncInitialization = sp(initializeClient)
        syncInitialization();

        AWS.config.update({
          region: 'local',
          endpoint: 'http://localhost:' + options.port,
          accessKeyId: 'fake',
          secretAccessKey: 'fake',
        });
    
        return new AWS.DynamoDB();


    },

  getPersistenceAdapter: function getPersistenceAdapter(tableName, createTable, dynamoDBClient) {

    let options = {
        tableName: tableName,
        createTable: createTable,
        partitionKeyGenerator: (requestEnvelope) => {
          const userId = Alexa.getUserId(requestEnvelope);
          return userId.substr(userId.lastIndexOf(".") + 1);
        }
    }

    if(dynamoDBClient){
        options.dynamoDBClient = dynamoDBClient
    }

   return new DynamoDbPersistenceAdapter(options);
  }
};
