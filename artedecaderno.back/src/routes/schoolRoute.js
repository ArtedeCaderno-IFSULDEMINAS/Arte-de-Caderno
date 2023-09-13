import express from "express";
import SchoolController from "../controllers/SchoolController.js";
import authenticateTokenJwt from '../middleware/authMiddleware.js';

const schoolRouter = express.Router();
schoolRouter.use(authenticateTokenJwt);

schoolRouter.get("/school", SchoolController.listSchool)
            .get("/school/:id", SchoolController.getSchoolById);

export default schoolRouter;