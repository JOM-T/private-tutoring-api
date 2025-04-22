import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const teacherSchema = new Schema ({
    fullName: { type:String, required:true },
    subject: { type:String, required:true},
    location: { type:String, required:true },
    profile: { type:String, required:true },
    keySkills: { type:String, required:true },
    teachingPhilosophy: { type:String, required:true },
    image: { type:String, required:true }
} , {
    timestamps:true
});

teacherSchema.plugin(normalize);

export const teacherModel = model('Teacher', teacherSchema);