import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        id: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

const User = mongoose.model("users", UserSchema);

export default User;
