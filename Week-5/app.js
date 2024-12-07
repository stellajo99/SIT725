const express = require('express');
const path = require('path');
const { connectDB } = require('./config/db');
const { fetchCats, createCat } = require('./controllers/catController');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/cats', fetchCats);
app.post('/add-cat', createCat);

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
