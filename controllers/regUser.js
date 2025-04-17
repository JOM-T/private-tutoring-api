import { userModel } from "../models/regUser.js";
import { mailTransport, registerUserMailTemplate } from "../utils/mail.js";
import { loginUserValidator, registerUserValidator } from "../validators/regUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'


export const registerUser = async (req, res, next) => {
    try {
        const { error, value } = registerUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error)
        }
        const user = await userModel.findOne(
                { email: value.email }
        );
        if (user) {
            return res.status(409).json('User already exist!');
        }
        const hashedPassword = bcrypt.hashSync(value.password, 10);
        await userModel.create({
            ...value,
            password: hashedPassword  
        });
        await mailTransport.sendMail({
            from: process.env.USER_EMAIL,
            to: value.email,
            subject: "Notification of successful registration",
            html: registerUserMailTemplate.replace( "{{firstName}}", value.firstName )
        });
        res.status(201).json('User registered successfully!');
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { error, value } = loginUserValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const user = await userModel.findOne(
                { email: value.email }
        );
        if (!user) {
            return res.status(404).json('User does not exist!')
        }
        const correctPassword = bcrypt.compareSync(value.password, user.password);
        if (!correctPassword) {
            return res.status(401).json('Invalid credentials!')
        }
        const accessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(200).json({
            accessToken,
            user: {
                email: user.email
            },
        });
    } catch (error) {
        next(error);
    }
}