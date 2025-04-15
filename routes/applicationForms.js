import { Router } from "express";
import { addApplication } from "../controllers/applicationForms.js";

const applicationRouter = Router();

applicationRouter.post("/application/form", addApplication);

export default applicationRouter;