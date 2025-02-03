const { getCats, addCat } = require('../models/catModel');

const fetchCats = async (req, res) => {
    try {
        const cats = await getCats();
        res.json(cats);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch cats' });
    }
};

const createCat = async (req, res) => {
    const { name, photo } = req.body;
    console.log('Received data:', { name, photo }); 
    if (!name || !photo) {
        console.error('Invalid data:', { name, photo });
        return res.status(400).json({ message: 'Invalid data' });
    }

    try {
        await addCat({ name, photo });
        console.log('Cat added successfully!');
        res.status(200).json();
    } catch (err) {
        res.status(500).json();
    }
};

module.exports = { fetchCats, createCat };
