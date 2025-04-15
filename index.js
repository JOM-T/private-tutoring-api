import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import teacherRouter from "./routes/teachers.js";
import userRouter from "./routes/regUser.js";
import applicationRouter from "./routes/applicationForms.js";


await mongoose.connect(process.env.MONGO_URI);


const app = express();

app.use(express.json());
app.use(teacherRouter);
app.use(userRouter);
app.use(applicationRouter);

const port = 3333

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});