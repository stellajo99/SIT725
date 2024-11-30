const { MongoClient, ServerApiVersion } = require("mongodb");

const url = "mongodb://localhost:27017/";

async function insertData() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("MovieList");

        const movies = [
            { title: "Wicked", stars: ["Ariana Grande", "Cynthia Erivo", "Jonathan Bailey"], rating: 8.5 },
            { title: "The Hunger Games", stars: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"], rating: 9.0 },
            { title: "Parasite", stars: ["Song Kang-ho", "Cho Yeo-jeong", "Lee Sun-kyun"], rating: 7.8 }
        ];

        // Insert the data
        const result = await collection.insertMany(movies);
        console.log(`${result.insertedCount} documents inserted:`, result.insertedIds);
    } catch (err) {
        console.error('Error inserting data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

async function fetchAllData() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();

        // Access the database and collection
        const db = client.db("myDB");
        const collection = db.collection("MovieList");

        // Fetch all documents from the collection
        const data = await collection.find().toArray();

        // Print the data
        console.log(data);
    } catch (err) {
        console.error('Error fetching data:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

// Run the functions sequentially
async function run() {
    await insertData(); // Wait for insertData to complete
    await fetchAllData(); // Then fetch the data
}

run();
