import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';

const professorRouter = express.Router();

professorRouter.get('/professor', ProfessorController.listProfessor)
                .post('/professor', ProfessorController.insertProfessor)
                .post('/professor/school', ProfessorController.listSchoolByProfessorId);

export default professorRouter;