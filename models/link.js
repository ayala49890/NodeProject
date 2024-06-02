const mongoose = require('mongoose');
const { Schema } = mongoose;

const clickSchema = new Schema({
    insertedAt: { type: Date, default: Date.now },
    ipAddress: String,
    targetParamValue: String,
});

const linkSchema = new Schema({
    originalUrl: { type: String, required: true },
    clicks: [clickSchema],
    targetParamName: { type: String, default: 't' },
    targetValues: [
        {
            name: String,
            value: String,
        }
    ],
});

module.exports = mongoose.model('Link', linkSchema);
