const Link = require('../models/Link');

exports.createLink = async (req, res) => {
    const { originalUrl, targetParamName, targetValues } = req.body;
    try {
        const link = new Link({ originalUrl, targetParamName, targetValues });
        await link.save();
        res.status(201).json(link);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getLinks = async (req, res) => {
    try {
        const links = await Link.find();
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLinkById = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        res.json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLink = async (req, res) => {
    const { originalUrl, targetParamName, targetValues } = req.body;
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        link.originalUrl = originalUrl || link.originalUrl;
        link.targetParamName = targetParamName || link.targetParamName;
        link.targetValues = targetValues || link.targetValues;
        await link.save();
        res.json(link);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).json({ message: 'Link not found' });
        await link.remove();
        res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.redirectLink = async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        if (!link) return res.status(404).send('Link not found');

        const targetParamValue = req.query[link.targetParamName];
        const ipAddress = req.ip;
        link.clicks.push({ ipAddress, targetParamValue });
        await link.save();

        let originalUrl = link.originalUrl;
        if (!/^https?:\/\//i.test(originalUrl)) {
            originalUrl = 'http://' + originalUrl;
        }

        res.redirect(originalUrl);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
