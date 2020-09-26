var AWS = require("aws-sdk");
var fs = require('fs');
var path = require('path');

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000",
    accessKeyId: 'x',
    secretAccessKey: 'x'
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing users into DynamoDB. Please wait.");

console.log(__dirname);

var initializedUsers = JSON.parse(fs.readFileSync(path.join(__dirname, 'initializeusers.json'), 'utf8'));
initializedUsers.forEach(function(user) {
    var params = {
        TableName: "users",
        Item: {
            "id":  user.id,
            "name": user.name,
            "stats":  user.stats
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", user.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", user.name);
       }
    });
});
