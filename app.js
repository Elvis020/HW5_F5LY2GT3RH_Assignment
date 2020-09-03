const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;


const CONNECTION_URL = "mongodb+srv://cluster0.aaetk.mongodb.net/COVID_CASES?retryWrites=true";
const DATABASE_NAME = "COVID_CASES";
var collection = "covid_19_data"


var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

let database;


app.get("/corona", (request, response) => {
    // Collection is not defined
    collection.find({}).toArray((error, result) => {
        if (error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });

});

app.listen(4000, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, async (error, client) => {
        if (error) {
            throw error;
        }
        database = await client.db(DATABASE_NAME);
        collection = await database.collection("covid_19_data");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


