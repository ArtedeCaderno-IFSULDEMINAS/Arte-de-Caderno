import express from 'express';
import ProfessorController from '../controllers/ProfessorController.js';
import StudentController from '../controllers/StudentController.js';
import SchoolController from '../controllers/SchoolController.js';

const registerRoute = express.Router();

registerRoute.post('/insertProfessor', ProfessorController.insertProfessor)
            .post('/insertStudent', StudentController.insertStudent)
            .post('/insertSchool', SchoolController.insertSchool)
            .post("/school/city", SchoolController.listCitiesByUf)
            .get("/school/uf", SchoolController.listUfs)
            .post("/school/listByCity", SchoolController.listSchoolByCity);

export default registerRoute;
