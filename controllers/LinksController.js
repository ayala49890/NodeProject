import LinkModel from "../Models/LinkModel.js";

const LinkController = {
    getList: async (req, res) => {
        try {
            const link = await LinkModel.find();
            res.json(link);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    redirectById: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            const originalUrl = link.originalUrl;
            const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
            const targetParamValue = req.query.t;
            link.clicks.push({ ipAddress, targetParamValue });
            await link.save();
            res.redirect(originalUrl);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
    getById: async (req, res) => {
        try {
            const link = await LinkModel.findById(req.params.id);
            res.json(link);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    add: async (req, res) => {
        const { originalUrl, targetValues } = req.body;
        try {
            const newlink = await LinkModel.create({ originalUrl, targetValues });
            res.json(newlink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    update: async (req, res) => {
        const { id } = req.params;
        try {
            const updatedLink = await LinkModel.findByIdAndUpdate(id, req.body, {
                new: true,
            }); 
            res.json(updatedLink);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await LinkModel.findByIdAndDelete(id);
            res.json(deleted);
        } catch (e) {
            res.status(400).json({ message: e.message });
        }
    },
};

export default LinkController;
