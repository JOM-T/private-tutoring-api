import { Router } from "express";
import { addApplication } from "../controllers/applicationForms.js";
import { applicationUpload } from "../middlewares/uploads.js";

const applicationRouter = Router();



applicationRouter.post("/application/form", 
    applicationUpload.fields([
        { name: "uploadCv", maxCount: 1 },
        { name: "otherDocument", maxCount: 1 }
    ]), 
    addApplication
);


export default applicationRouter;