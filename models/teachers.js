import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const teacherSchema = new Schema ({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true},
    location: { type:String, required:true },
    role: { type:String, required:true },
    yearsOfExperience: { type:Number, required:true },
    image: { type:String, required:true }
} , {
    timestamps:true
});

teacherSchema.plugin(normalize);

export const teacherModel = model('Teacher', teacherSchema);