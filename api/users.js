const { docClient } = require("../api-source/database-init-connection");

var table = "users";

var id = Math.round(Math.random()*100000000).toString()
var name = 'FRdS';
var stats = {'win': 0,
            'lose': 0};

console.log("Adding a new item.2..");

module.exports = (req, res) => {
    
    console.log();
    
    if(req.method !== 'POST'){
        return res.status(405).send("request method not supported");
    }

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
                res.status(201).send(`{"id": "${id}"}`)
            }
        });
    }else{
        console.error("existing item", data);
        res.status(400).send('{"message": "ERROR"}')
    }
});

}