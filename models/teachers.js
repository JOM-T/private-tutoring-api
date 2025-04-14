import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const teacherSchema = new Schema ({
    fullName: { type:String, required:true },
    email: { type:String, required:true},
    location: { type:String, required:true },
    levelOfEducation: { type:String, required:true },
    gender: { type:String, required:true },
    yearsOfExperience: { type:Number, required:true },
    areaOfSpecialization: { type:String, required:true },
    image: { type:String, required:true }
} , {
    timestamps:true
});

teacherSchema.plugin(normalize);

export const teacherModel = model('Teacher', teacherSchema);