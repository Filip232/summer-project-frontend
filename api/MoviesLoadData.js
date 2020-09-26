var AWS = require("aws-sdk");
var fs = require('fs');
var path = require('path');

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

console.log(__dirname);

var allMovies = JSON.parse(fs.readFileSync(path.join(__dirname, '..' ,'_files', 'moviedata.json'), 'utf8'));
allMovies.forEach(function(movie) {
    var params = {
        TableName: "Movies",
        Item: {
            "year":  movie.year,
            "title": movie.title,
            "info":  movie.info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", movie.title);
       }
    });
});