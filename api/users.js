var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-central-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var table = "users";

var id = 'fkjhfnerjkfjkd'
var name = 'FRdS';
var stats = {'win': 0,
            'lose': 0};

console.log("Adding a new item.2..");

docClient.query( {
    TableName : "users",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "id"
    },
    ExpressionAttributeValues: {
        ":yyyy": id
    }
}, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else if(data.Count === 0){
        docClient.put({
            TableName:table,
            Item:{
                "id": id,
                "name": name,
                "stats": stats
            }
        }, function(err, data) {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    }else{
        console.error("existing item", data);

    }
});


