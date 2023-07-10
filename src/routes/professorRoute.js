import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';

const professorRouter = express.Router();

professorRouter.get('/professor', ProfessorController.listProfessor)
    .get('/professor/school/:id', ProfessorController.listSchoolByProfessorId)
    .get('professor/getStudent/:id', ProfessorController.listStudentsByProfessorId)
    .post('/professor/student/:id', ProfessorController.insertStudentByProfessorId)
    .post('/professor', ProfessorController.insertProfessor)
    .post('/professor/update/:id', ProfessorController.updateProfessor)
    .delete('/professor/:id', ProfessorController.deleteProfessor);

export default professorRouter;