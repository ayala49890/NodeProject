import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    insertedAt: {
        type: Date,
        default: Date.now,
    },
    ipAddress: {
        type: String,
        required: true,
        default: "0.0.0.0"
    },
    targetParamValue: String
}); 

const targetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: "",
    },
    value: {
        type: String,
        required: true,
        default: "",
    }
});

const linkSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    },
    clicks: {
        type: [clickSchema],
        default: [],
    },
    targetParamName: {
        type: String,
        default: "t",
    },
    targetValues: {
        type: [targetSchema],
        default: [],
    }
});

export default mongoose.model("links", linkSchema);
