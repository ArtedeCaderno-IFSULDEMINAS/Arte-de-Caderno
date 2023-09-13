import Draw from "../models/draw.js";
import Evaluator from "../models/evaluator.js";
import Login from "../models/login.js";

class EvaluatorController {

    listEvaluators = async (req, res, next) => {
        try{
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10; 
            const evaluators = await Evaluator.find()
                    .skip((page - 1) * limit)
                    .limit(limit);
            res.status(200).json(evaluators);
        }
        catch(err){
            next(err);
        }
    }

    getEvaluatorById = async (req, res, next) => {
        const {id} = req.params;
        try{
            const evaluator = await Evaluator.findById(id);
            const response = {
                evaluator: evaluator,
                accessType: 'evaluator'
            };
            
            res.status(200).json(response);
        }
        catch(err){
            next(err);
        }
    }

    insertEvaluator = async (req, res, next) => {
        const {name, email, cpf, password} = req.body;
        const loginExists = await Login.findOne({username: cpf});
        if(loginExists !== null){
            return res.status(400).json({message: 'User already exists'});
        }

        const login = new Login({
            username: cpf,
            password: password,
            accessType: 'evaluator'
        });

        try{
            const newLogin = await login.save();
            const evaluator = new Evaluator({
                name: name,
                email: email,
                cpf: cpf,
                loginId: newLogin._id
            });
            const newEvaluator = await evaluator.save();
            res.status(201).json(newEvaluator);
        }
        catch(err){
            next(err);
        }
    }

    getDrawsByEvaluator = async (req, res, next) => {
        const {id} = req.params;
        try{
            const evaluator = await Evaluator.findById(id);
            if(evaluator === null){
                return res.status(404).json({message: 'Evaluator not found'});
            }
            const draws = await Draw.find({evaluatorId: id});
            res.status(200).json(draws);
        }
        catch(err){
            next(err);
        }
    }

}

export default new EvaluatorController;