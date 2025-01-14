const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
let database;

const initDb = (callback) => {
    if (database) {
        console.log("Trying to init DB again!");
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        })
        .catch((err) => {
            callback(err);
        });
    };

    const getDatabase = () => {
        if (!database) {
            throw Error('Db has not been initialized. Please call init first.');
        }
        return database;
    };

    module.exports = {
        initDb,
        getDatabase
    };