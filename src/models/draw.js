import mongoose from "mongoose";

const DrawSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: { type: String, required: true },
        linkImage: { type: String, required: true },
        type: { type: String, required: true },
        author: { type: String, required: true }
    },
    {
        versionKey: false
    }
);
