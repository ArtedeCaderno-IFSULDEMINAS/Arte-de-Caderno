import StudentController from "../controllers/StudentController.js";
import express from "express";
import authenticateTokenJwt from '../middleware/authMiddleware.js';

const studentRouter = express.Router();
studentRouter.use(authenticateTokenJwt);

studentRouter
    .get("/student", StudentController.listStudent)
    .get("/student/:id", StudentController.getStudentById)
    .post ("/student/update/:id", StudentController.updateStudent)
    .delete("/student/:id", StudentController.deleteStudent);

export default studentRouter;