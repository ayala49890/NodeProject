const express = require('express');
const Link = require('../models/link.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const links = await Link.find();
        res.json(links);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { originalUrl } = req.body;
    const link = new Link({ originalUrl });

    try {
        const newLink = await link.save();
        res.status(201).json(newLink);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
