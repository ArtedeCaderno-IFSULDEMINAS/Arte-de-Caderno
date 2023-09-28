import mongoose from "mongoose";
import Log from "../models/log";
import { LOG_TYPES } from "../constants/LogTypes";

async function errorHandler (err, req, res, next){
    if(err instanceof mongoose.Error.CastError){
        res.status(400).json({message: 'invalid datas'});
    } else if(err instanceof mongoose.Error.ValidationError){
        res.status(400).json({message: err.message});
    } else{
        Log.create({
            message: err.message,
            stack: err.stack,
            date: new Date(),
            type: LOG_TYPES.ERROR
        });
        await Log.save();
        res.status(500).json("Internal server error");
    }
}

export default errorHandler;