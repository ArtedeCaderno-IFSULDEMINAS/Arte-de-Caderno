import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnect = async () => {
   try{
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxConnecting: 3,
            socketTimeoutMS: 30000,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000
        });
        console.log('MongoDB connected'); 
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
 
export default dbConnect;

