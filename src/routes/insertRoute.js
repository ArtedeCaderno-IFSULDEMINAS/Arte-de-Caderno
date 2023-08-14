import express from 'express';
import ProfessorController from '../controllers/ProfessorController';
import StudentController from '../controllers/StudentController';
import SchoolController from '../controllers/SchoolController';

const insertRoute = express.Router();

insertRoute.post('/insertProfessor', ProfessorController.insertProfessor)
            .post('/insertStudent', StudentController.insertStudent)
            .post('/insertSchool', SchoolController.insertSchool)
            .post("/school/city", SchoolController.listCitiesByUf)
            .get("/school/uf", SchoolController.listUfs)
            .post("/school/listByCity", SchoolController.listSchoolByCity);

export default insertRoute;
