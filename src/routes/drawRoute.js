import express from 'express';
import authenticateTokenJwt from '../middleware/authMiddleware.js';
import DrawController from '../controllers/DrawController.js';

const drawRoute = express.Router();
drawRoute.use(authenticateTokenJwt);

drawRoute.get('/draw/all', DrawController.listAllDraws)
        .get('/draw/:id', DrawController.getDrawById)
        .get('/draw/student/:id', DrawController.getDrawByStudent)
        .post('/draw/category', DrawController.getDrawByCategory)
        .post('/draw', DrawController.insertDraw)
        .post('/draw/desclassified/:id', DrawController.desclassifiedDraw)
        .post('/draw/evaluate', DrawController.evaluateDraw)
        .post('/draw/distribute', DrawController.distributeDraws);

export default drawRoute;