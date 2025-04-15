import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const applicationSchema = new Schema ({
    name: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    contact: { type:Number, required:true },
    region: { type:String, required:true },
    location: { type:String, required:true },
    qualification: { type:String, required:true },
    yearsOfExperience: { type:String, required:true },
    subject: { type:String, required:true },
    numberOfHoursAvailablePerWeek: { type:String, required:true },
}, {
    timestamps: true
});

applicationSchema.plugin(normalize);

export const applicationModel = model("Application", applicationSchema);

