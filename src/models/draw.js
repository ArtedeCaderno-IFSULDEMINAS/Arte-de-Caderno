import mongoose from "mongoose";

const DrawSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: { type: String, required: true },
        linkImage: { type: String, required: true },
        category: { type: String, required: true },
        score: {type: Number, required: false},
        classified: {type: Boolean, required: false},
        note: {type: String, required: false},
        author: {type: mongoose.Schema.Types.ObjectId, ref: "student", required: true}
    },
    {
        versionKey: false
    }
);

const Draw = mongoose.model("draw", DrawSchema);
export default Draw;