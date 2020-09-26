const { docClient } = require("../api-source/database-init-connection");

console.log("Querying for FRS user.");

module.exports = (req, res) => {
    var params = {
        TableName : "users",
        KeyConditionExpression: "#yr = :yyyy",
        ExpressionAttributeNames:{
            "#yr": "id"
        },
        ExpressionAttributeValues: {
            ":yyyy": req.query.id
        }
    };
    
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            res.send('ERROR 404');
        } else {
            if(data.Count === 0){
                res.status(404).send('ERROR');
            }else{
            console.log("Query succeeded.", data);
            data.Items.forEach(function(item) {
                res.json(item);
            });
        }
        }
    });
}