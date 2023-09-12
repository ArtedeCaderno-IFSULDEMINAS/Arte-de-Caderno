import express from 'express';
import authenticateTokenJwt from '../middleware/authMiddleware.js';
import DrawController from '../controllers/DrawController.js';

const drawRoute = express.Router();
drawRoute.use(authenticateTokenJwt);

drawRoute.get('/draw/all', DrawController.listAllDraws)
        .get('/draw/:id', DrawController.getDrawById)
        .get('/draw/student/:id', DrawController.getDrawByStudent)
        .get('/draw/allDesclassified', DrawController.listDesclassifiedDraws)
        .post('/draw/category', DrawController.getDrawByCategory)
        .post('/draw', DrawController.insertDraw)
        .post('/draw/score/:id', DrawController.insertScoreDraw)
        .post('/draw/desclassified/:id', DrawController.desclassifiedDraw);

export default drawRoute;