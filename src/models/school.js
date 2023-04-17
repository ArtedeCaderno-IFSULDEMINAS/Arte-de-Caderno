import mongoose from "mongoose";

const SchoolSchema = new mongoose.Schema(
    {
        id: { type: String },
        name: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        uf: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        cep: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, unique: true },
        site: { type: String}
    },
    {
        versionKey: false
    }
);

const School = mongoose.model("school", SchoolSchema);
export default School;