import { Router } from "express";
import { bookTutor } from "../controllers/bookingForm.js";

const bookingRouter = Router();

bookingRouter.post("/booking/form", bookTutor);

export default bookingRouter;