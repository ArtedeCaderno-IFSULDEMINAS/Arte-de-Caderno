import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';
import authenticateTokenJwt from '../middleware/authMiddleware.js';

const professorRouter = express.Router();
professorRouter.use(authenticateTokenJwt);

professorRouter.get('/professor', ProfessorController.listProfessor)
    .get('/professor/:id', ProfessorController.getProfessorById)
    .get('/professor/school/:id', ProfessorController.listSchoolByProfessorId)
    .get('/professor/getStudent/:id', ProfessorController.listStudentsByProfessorId)
    .post('/professor/student/:id', ProfessorController.insertStudentByProfessorId)
    .post('/professor', ProfessorController.insertProfessor)
    .post('/professor/update/:id', ProfessorController.updateProfessor)
    .delete('/professor/:id', ProfessorController.deleteProfessor);

export default professorRouter;