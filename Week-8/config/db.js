const { MongoClient } = require('mongodb');

const url = "mongodb://mongodb:27017/";
const dbName = 'catDB';

let db;

const connectDB = async () => {
    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');
};

const getDB = () => db;

module.exports = { connectDB, getDB };