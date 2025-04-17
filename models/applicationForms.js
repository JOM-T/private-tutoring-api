import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const applicationSchema = new Schema ({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    phoneNumber: { type:Number, required:true },
    location: { type:String, required:true },
    specialization: { type:String, required:true },
    earliestPossibleStartDate: { type:String, required:true },
    preferredInterviewDate: { type:String, required:true },
    preferredInterviewTime: { type:String, required:true },
    coverLetter: { type:String, required:true },
    uploadCv: { type:String, required:true },
    otherDocument: { type:String, required:false }
}, {
    timestamps: true
});

applicationSchema.plugin(normalize);

export const applicationModel = model("Application", applicationSchema);

