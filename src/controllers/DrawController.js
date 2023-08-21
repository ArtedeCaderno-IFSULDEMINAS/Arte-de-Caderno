import Draw from "../models/draw.js";
import Student from "../models/student.js";

class DrawController{

    listClassifiedDraws = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1; 
            const limit = parseInt(req.query.limit) || 10; 
            const filter = {classified: true};
            const draws = await Draw.find(filter)
                    .skip((page - 1) * limit)
                    .limit(limit)
                    .sort({score: 1});
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

    listDesclassifiedDraws = async(req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const filter = {classified: false};
            const draws = await Draw.find(filter)
                    .skip((page - 1) * limit)
                    .limit(limit);
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

    listAllDraws = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10; 
            const draws = await Draw.find()
                    .skip((page - 1) * limit)
                    .limit(limit);
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

    getDrawById = async (req, res, next) => {
        const {id} = req.params;
        try{
            const draw = await Draw.findById(id);
            res.status(200).json(draw);
        }
        catch(err){
            next(err);
        }
    }

    getDrawByStudent = async (req, res, next) => {
        const {id} = req.params;
        try{
            const draws = await Draw.find({author: id});
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

    insertDraw = async (req, res, next) => {
        try{
            const draw = new Draw(req.body);
            let student = await Student.findById(draw.author);
            if(student === null){
                return res.status(400).json({message: 'Student not found'});
            }
            student.drawsId.push(draw._id);
            
            await student.save();

            await draw.save();
            
            res.status(201).json(draw);
        }
        catch(err){
            next(err);
        }
    }

    insertScoreDraw = async (req, res, next) => {
        const {id} = req.params;
        const {score} = req.body;
        if(score == null || score == undefined){
            return res.status(400).json({message: "Score is required"});
        }
        if(score < 0 || score > 100){
            return res.status(400).json({message: "Score must be between 0 and 100"});
        }
        try{
            const draw = await Draw.findOneAndUpdate({_id: id}, {score: score, classified: true}, {new: true});
            res.status(201).json(draw);
        }
        catch(err){
            next(err);
        }
    }

    getDrawByCategory = async (req, res, next) => {
        const {category} = req.body;
        try{
            const draws = await Draw.find({category: category});
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

    desclassifiedDraw = async (req, res, next) => {
        const {id} = req.params;
        const {note} = req.body;
        try{
            const filter = {_id: id};
            const update = {classified: false, note: note, reviewFinished: true};
            const draw = await Draw.findOneAndUpdate(filter, update, {new: true});
            res.status(201).json(draw);
        }
        catch(err){
            next(err);
        }
    }
}

export default new DrawController;