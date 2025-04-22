import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const applicationSchema = new Schema ({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    phoneNumber: { type:Number, required:true },
    location: { type:String, required:true },
    specialization: { type:String, required:true },
    earliestPossibleStartDate: { type:Date, required:true },
    coverLetter: { type:String, required:true },
    uploadCv: { type:String, required:true },
    anyOtherDocumentToUpload: { type:String, required:false }
}, {
    timestamps: true
});

applicationSchema.plugin(normalize);

export const applicationModel = model("Application", applicationSchema);

