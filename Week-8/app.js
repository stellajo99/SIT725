const express = require('express');
const path = require('path');
const http = require('http'); 
const { connectDB } = require('./config/db');
const { fetchCats, createCat } = require('./controllers/catController');

const app = express();
const PORT = 3000;

// Create HTTP server and integrate socket.io
const server = http.createServer(app);
const io = require('socket.io')(server);

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

// Socket.IO logic
io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    setInterval(() => {
        const randomNum = Math.floor(Math.random() * 10); // Use const for better practice
        socket.emit('number', randomNum);
        console.log('Emitting Number:', randomNum);
    }, 1000);
});

// Start Server
connectDB().then(() => {
    server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)); // Use server.listen
});

module.exports = app; // Export the app for testing