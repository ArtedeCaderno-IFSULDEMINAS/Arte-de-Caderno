import mongoose from "mongoose";

const LogDraw = new mongoose.Schema(
    {
        data: {type: Date, required: true, default: Date.now()},
        message: {type: String, required: true},
        stack: {type: String, required: true},
        type: {type: String, required: true}
    },
    {
        versionKey: false
    }
);

const Log = mongoose.model("log", LogDraw);
export default Log;