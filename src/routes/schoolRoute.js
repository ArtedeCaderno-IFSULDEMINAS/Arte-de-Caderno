import express from "express";
import SchoolController from "../controllers/SchoolController.js";

const schoolRouter = express.Router();

schoolRouter.get("/school", SchoolController.listSchool)
            .post("/school", SchoolController.insertSchool);

export default schoolRouter;