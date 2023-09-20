import Draw from "../models/draw.js";
import Evaluator from "../models/evaluator.js";
import Student from "../models/student.js";

class DrawController {

    listClassifiedDraws = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const filter = { classified: true };
            const draws = await Draw.find(filter)
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({ score: 1 });
            res.status(200).json(draws);
        }
        catch (err) {
            next(err);
        }
    }

    listDesclassifiedDraws = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const filter = { classified: false };
            const draws = await Draw.find(filter)
                .skip((page - 1) * limit)
                .limit(limit);
            res.status(200).json(draws);
        }
        catch (err) {
            next(err);
        }
    }

    listAllDraws = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const draws = await Draw.find()
                .skip((page - 1) * limit)
                .limit(limit);
            res.status(200).json(draws);
        }
        catch (err) {
            next(err);
        }
    }

    getDrawById = async (req, res, next) => {
        const { id } = req.params;
        try {
            const draw = await Draw.findById(id);
            res.status(200).json(draw);
        }
        catch (err) {
            next(err);
        }
    }

    getDrawByStudent = async (req, res, next) => {
        const { id } = req.params;
        try {
            const draws = await Draw.find({ author: id });
            res.status(200).json(draws);
        }
        catch (err) {
            next(err);
        }
    }

    insertDraw = async (req, res, next) => {
        try {
            const draw = new Draw(req.body);
            let student = await Student.findById(draw.author);
            if (student === null) {
                return res.status(400).json({ message: 'Student not found' });
            }
            student.drawsId.push(draw._id);

            await student.save();

            await draw.save();

            res.status(201).json(draw);
        }
        catch (err) {
            next(err);
        }
    }

    insertScoreDraw = async (req, res, next) => {
        const { id } = req.params;
        const { score } = req.body;
        if (score == null || score == undefined) {
            return res.status(400).json({ message: "Score is required" });
        }
        if (score < 0 || score > 100) {
            return res.status(400).json({ message: "Score must be between 0 and 100" });
        }
        try {
            const draw = await Draw.findOneAndUpdate({ _id: id }, { score: score, classified: true }, { new: true });
            res.status(201).json(draw);
        }
        catch (err) {
            next(err);
        }
    }

    getDrawByCategory = async (req, res, next) => {
        const { category } = req.body;
        try {
            const draws = await Draw.find({ category: category });
            res.status(200).json(draws);
        }
        catch (err) {
            next(err);
        }
    }

    desclassifiedDraw = async (req, res, next) => {
        const { id } = req.params;
        const { note } = req.body;
        try {
            const filter = { _id: id };
            const update = { classified: false, note: note, reviewFinished: true };
            const draw = await Draw.findOneAndUpdate(filter, update, { new: true });
            res.status(201).json(draw);
        }
        catch (err) {
            next(err);
        }
    }

    distributeDraws = async (req, res, next) => {
        try {
            const draws = await Draw.find();
            const evaluators = await Evaluator.find();

            evaluators.sort(() => Math.random() - 0.5);
            draws.sort(() => Math.random() - 0.5);

            const evaluators1 = evaluators.slice(0, evaluators.length / 3);
            const evaluators2 = evaluators.slice(evaluators.length / 3, 2 * evaluators.length / 3);
            const evaluators3 = evaluators.slice(2 * evaluators.length / 3, evaluators.length);

            const maxDrawsGroup1 = Math.ceil(draws.length / evaluators1.length);
            const maxDrawsGroup2 = Math.ceil(draws.length / evaluators2.length);
            const maxDrawsGroup3 = Math.ceil(draws.length / evaluators3.length);

            for (let i = 0; i < draws.length; i++) {

                for(let j=0; j<=evaluators1.length; j++){
                    if(await this.verifyEvaluator(evaluators1[j], maxDrawsGroup1)){
                        await this.updateDrawAndEvaluator(draws[i]._id, evaluators1[j]._id)
                        break;
                    }
                }

                for(let j=0; j<=evaluators2.length; j++){
                    if(await this.verifyEvaluator(evaluators2[j], maxDrawsGroup2)){
                        await this.updateDrawAndEvaluator(draws[i]._id, evaluators2[j]._id)
                        break;
                    }
                }

                for(let j=0; j<=evaluators3.length; j++){
                    if(await this.verifyEvaluator(evaluators3[j], maxDrawsGroup3)){
                        await this.updateDrawAndEvaluator(draws[i]._id, evaluators3[j]._id)
                        break;
                    }
                }

            }

            res.status(200).json({ message: "Draws distributed" });

        }
        catch (err) {
            next(err);
        }
    }

    verifyEvaluator =async (evaluator, maxDraws) => {
        const updateEvaluator = await Evaluator.findById(evaluator._id);
        if (updateEvaluator.draws.length >= maxDraws) {
            return false;
        }
        return true;
    }

    updateDrawAndEvaluator = async (drawId, evaluatorId) => {
        await Draw.findOneAndUpdate({ _id: drawId }, { $push: { review: { evaluator: evaluatorId } } });
        await Evaluator.findOneAndUpdate({ _id: evaluatorId}, { $push: { draws: drawId} });
    }
}

export default new DrawController;