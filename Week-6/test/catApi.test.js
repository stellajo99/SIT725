const assert = require('assert');
const http = require('http');
const app = require('../app'); // Ensure app.js exports the app object
const { connectDB, getDB } = require('../config/db');

describe('Cat API Tests', function () {
    let server;

    before(async function () {
        await connectDB();
        const db = getDB();
        // Clean up the "cats" collection before running tests
        await db.collection('cats').deleteMany({});
        server = app.listen(3001); // Start the server on a test port
    });

    after(function () {
        if (server) server.close(); // Close the server after tests
    });

    describe('GET /cats', function () {
        it('should return an empty array when no cats are present', async function () {
            const response = await makeRequest('/cats', 'GET');
            assert.strictEqual(response.statusCode, 200);
            const body = JSON.parse(response.body);
            assert.ok(Array.isArray(body));
            assert.strictEqual(body.length, 0);
        });
    });

    describe('POST /add-cat', function () {
        it('should add a cat successfully', async function () {
            const newCat = JSON.stringify({ name: 'Fluffy', photo: 'http://example.com/fluffy.jpg' });
            const response = await makeRequest('/add-cat', 'POST', newCat, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(newCat),
            });
            assert.strictEqual(response.statusCode, 200);

            const db = getDB();
            const cats = await db.collection('cats').find({}).toArray();
            assert.strictEqual(cats.length, 1);
            assert.strictEqual(cats[0].name, 'Fluffy');
            assert.strictEqual(cats[0].photo, 'http://example.com/fluffy.jpg');
        });
    });

    describe('GET /cats after adding a cat', function () {
        it('should return the list of added cats', async function () {
            const response = await makeRequest('/cats', 'GET');
            assert.strictEqual(response.statusCode, 200);
            const body = JSON.parse(response.body);
            assert.strictEqual(body.length, 1);
            assert.strictEqual(body[0].name, 'Fluffy');
            assert.strictEqual(body[0].photo, 'http://example.com/fluffy.jpg');
        });

        it('should return multiple cats when more are added', async function () {
            const newCat = JSON.stringify({ name: 'Snowball', photo: 'http://example.com/snowball.jpg' });
            await makeRequest('/add-cat', 'POST', newCat, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(newCat),
            });

            const response = await makeRequest('/cats', 'GET');
            assert.strictEqual(response.statusCode, 200);
            const body = JSON.parse(response.body);
            assert.strictEqual(body.length, 2);
            assert.strictEqual(body[1].name, 'Snowball');
            assert.strictEqual(body[1].photo, 'http://example.com/snowball.jpg');
        });
    });

    // New Test Cases
    describe('POST /add-cat validation tests', function () {
        it('should return 400 if name is missing', async function () {
            const invalidCat = JSON.stringify({ photo: 'http://example.com/missingname.jpg' });
            const response = await makeRequest('/add-cat', 'POST', invalidCat, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(invalidCat),
            });
            assert.strictEqual(response.statusCode, 400);
        });

        it('should return 400 if photo is missing', async function () {
            const invalidCat = JSON.stringify({ name: 'NoPhoto' });
            const response = await makeRequest('/add-cat', 'POST', invalidCat, {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(invalidCat),
            });
            assert.strictEqual(response.statusCode, 400);
        });
    });

    describe('GET /cats with large data', function () {
        it('should handle a large number of cats gracefully', async function () {
            const db = getDB();
            const mockCats = Array.from({ length: 1000 }, (_, i) => ({ name: `Cat${i}`, photo: `http://example.com/cat${i}.jpg` }));
            await db.collection('cats').insertMany(mockCats);

            const response = await makeRequest('/cats', 'GET');
            assert.strictEqual(response.statusCode, 200);
            const body = JSON.parse(response.body);
            assert.ok(body.length >= 1000); // Ensure at least 1000 entries exist
        });
    });

    // Helper function to make HTTP requests
    function makeRequest(path, method, body = null, headers = {}) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: 'localhost',
                port: 3001,
                path,
                method,
                headers,
            };

            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => {
                    data += chunk;
                });
                res.on('end', () => {
                    resolve({ statusCode: res.statusCode, body: data });
                });
            });

            req.on('error', (err) => reject(err));

            if (body) req.write(body);
            req.end();
        });
    }
});
