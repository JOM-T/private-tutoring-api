import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const bookingSchame = new Schema ({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true },
    email: { type:String, required:true },
    phoneNumber: { type:Number, required:true },
    preferredTeacher: { type:String, required:true },
    location: { type:String, required:true },
    subject: { type:String, required:true },
    bookingFor: { type:String, required:true },
    numberOfLearners: { type:Number, required:true },
    levelOfLearner: { type:String, required:true },
    preferredHoursPerWeek: { type:String, required:true },
    paymentPlan: { type:String, required:true },
    paymentMethod: { type:String, required:true }
}, {
    timestamps: true
});

bookingSchame.plugin(normalize);

export const bookingModel = model("Booking", bookingSchame);