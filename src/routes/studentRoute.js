import StudentController from "../controllers/StudentController.js";
import express from "express";

const studentRouter = express.Router();

studentRouter
    .get("/student", StudentController.listStudent)
    .post("/student", StudentController.insertStudent)
    .post ("/student/update/:id", StudentController.updateStudent)
    .delete("/student/:id", StudentController.deleteStudent);

export default studentRouter;