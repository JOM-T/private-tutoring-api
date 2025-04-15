import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const bookingSchame = new Schema ({
    name: { type:String, required:true },
    email: { type:String, required:true },
    contact: { type:Number, required:true },
    region: { type:String, required:true },
    location: { type:String, required:true },
    subject: { type:String, required:true },
    bookingType: { type:String, required:true },
    numberOfLearners: { type:Number, required:true },
    hoursPerWeek: { type:Number, required:true }
}, {
    timestamps: true
});

bookingSchame.plugin(normalize);

export const bookingModel = model("Booking", bookingSchame);