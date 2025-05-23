import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config'
import teacherRouter from "./routes/teachers.js";
import userRouter from "./routes/regUser.js";
import applicationRouter from "./routes/applicationForms.js";
import bookingRouter from "./routes/bookingForm.js";


await mongoose.connect(process.env.MONGO_URI);


const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173', // Original port
    'http://localhost:5174', // Add the new port
    'https://jomat-agency-project.vercel.app' // Production URL
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(teacherRouter);
app.use(userRouter);
app.use(applicationRouter);
app.use(bookingRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the API');
  });
  

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
