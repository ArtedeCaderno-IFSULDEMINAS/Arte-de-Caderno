import express from 'express';
import EvaluatorController from '../controllers/EvaluatorController.js';

const evaluatorRoute = express.Router();

evaluatorRoute.get('evaluator', EvaluatorController.listEvaluators)
        .get('evaluator/:id', EvaluatorController.getEvaluatorById)
        .post('evaluator', EvaluatorController.insertEvaluator)
        .get('evaluator/:id/draws', EvaluatorController.getDrawsByEvaluator);

export default evaluatorRoute;