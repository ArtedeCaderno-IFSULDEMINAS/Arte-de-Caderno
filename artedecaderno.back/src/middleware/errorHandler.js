import mongoose from "mongoose";

function errorHandler (err, req, res, next){
    if(err instanceof mongoose.Error.CastError){
        res.status(400).json("Incorrect datas");
    } else if(err instanceof mongoose.Error.ValidationError){
        res.status(400).json({message: err.message});
    } else{
        res.status(500).json("Internal server error");
    }
}

export default errorHandler;