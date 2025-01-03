const { getDB } = require('../config/db');

const getCats = async () => {
    console.log("getCats called");
    const db = getDB();
    const collection = db.collection('cats');
    return await collection.find({}).toArray();
};

const addCat = async (cat) => {
    console.log("addCat called with:", cat);
    try {
        const db = getDB();
        const collection = db.collection('cats');
        await collection.insertOne(cat);
        console.log('Cat added successfully:', cat);
    } catch (err) {
        console.error('Error inserting cat:', err);
        throw err;
    }
};

module.exports = { getCats, addCat };
