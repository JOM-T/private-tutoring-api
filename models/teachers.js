import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const teacherSchema = new Schema ({
    fullName: { type:String, required:true },
    subject: { type:String, required:false},
    location: { type:String, required:true },
    profile: { type:String, required:false },
    keySkills: { type:String, required:false },
    teachingPhilosophy: { type:String, required:false },
    joiningDate: { type:String, required:false },
    role: { type:String, required:false },
    address: { type:String, required:false },
    contract: { type:String, required:false },
    email: { type:String, required:false },
    phoneNumber: { type:Number, required:false },
    image: { type:String, required:true }
} , {
    timestamps:true
});

teacherSchema.plugin(normalize);

export const teacherModel = model('Teacher', teacherSchema);