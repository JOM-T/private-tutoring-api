import { Schema, model } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema ({
    firstName: { type:String, required:true },
    lastName: { type:String, required:true },
    email: { type:String, required:true, unique:true },
    option: { type:String, required:true },
    password: { type:String, required:true },
    passwordResetToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true
});

userSchema.plugin(normalize);

export const userModel = model('User', userSchema);