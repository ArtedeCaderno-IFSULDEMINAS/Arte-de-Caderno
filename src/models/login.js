import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
    {
        id: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        code2factor: {type: String}, //, default: 'hduahfua'
        createdAt: { type: Date, default: Date.now },
        accessType: { type: String}
    },
    {
        versionKey: false
    }
);

const Login = mongoose.model("logins", LoginSchema);
export default Login;