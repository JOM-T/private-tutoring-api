import { Router } from "express";
import { addTeacher, addTeacherDashboard, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from "../controllers/teachers.js";
import { profilePictureUpload } from "../middlewares/uploads.js";

const teacherRouter = Router();

teacherRouter.post('/teachers', profilePictureUpload.single("image"), addTeacher);
teacherRouter.get('/teachers/:id', getTeacherById);
teacherRouter.get('/teachers', getAllTeachers);
teacherRouter.patch('/teachers/:id', updateTeacher);
teacherRouter.delete('/teachers/:id', deleteTeacher);
teacherRouter.post('/teachers/dashboard', profilePictureUpload.single("image"), addTeacherDashboard)

export default teacherRouter;