import express from "express";
import SchoolController from "../controllers/SchoolController.js";
import authenticateTokenJwt from '../middleware/authMiddleware.js';

const schoolRouter = express.Router();
schoolRouter.use(authenticateTokenJwt);

schoolRouter.get("/school", SchoolController.listSchool)
            .post("/school", SchoolController.insertSchool)
            .post("/school/city", SchoolController.listCitiesByUf)
            .get("/school/uf", SchoolController.listUfs)
            .post("/school/listByCity", SchoolController.listSchoolByCity);

export default schoolRouter;