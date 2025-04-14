import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema ({
    fullName: { type:String, required:true },
    username: { type:String, required:true, unique:true },
    email: { type:String, required:true, unique:true },
    password: { type:String, required:true }
}, {
    timestamps: true
});

userSchema.plugin(normalize);

export const userModel = model('User', userSchema);