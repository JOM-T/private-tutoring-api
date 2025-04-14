import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'


await mongoose.connect(process.env.MONGO_URI);


const app = express();

app.use(express.json());

const port = 3333

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
});