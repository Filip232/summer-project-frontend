export const AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000",
    accessKeyId: 'x',
    secretAccessKey: 'x'
});

export const docClient = new AWS.DynamoDB.DocumentClient();
