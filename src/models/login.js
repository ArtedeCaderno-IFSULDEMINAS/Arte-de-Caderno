import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
    {
        id: { type: String },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        accessType: { type: String}
    },
    {
        versionKey: false
    }
);

const Login = mongoose.model("logins", LoginSchema);
export default Login;