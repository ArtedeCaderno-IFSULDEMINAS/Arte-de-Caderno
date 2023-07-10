import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';

const professorRouter = express.Router();

professorRouter.get('/professor', ProfessorController.listProfessor)
                .post('/professor', ProfessorController.insertProfessor)
                .post('/professor/school', ProfessorController.listSchoolByProfessorId)
                .post('/professor/update/:id', ProfessorController.updateProfessor)
                .delete('/professor/:id', ProfessorController.deleteProfessor);

export default professorRouter;