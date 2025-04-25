import { userModel } from "../models/regUser.js";
import { mailTransport, registerUserMailTemplate } from "../utils/mail.js";
import { forgotPasswordValidator, loginUserValidator, registerUserValidator, resetPasswordValidator } from "../validators/regUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
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
                role: user.role,
                email: user.email,
                userId: user.id
            },
        });
    } catch (error) {
        next(error);
    }
}

export const forgotPassword = async (req, res, next) => {
    const { error, value } = forgotPasswordValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }
    const user = await userModel.findOne(
        { email: value.email }
    );
    if (!user) {
        return res.status(404).json('User does not exist!')
    };
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = Date.now() + 30 * 60 * 1000;

    await user.save();
    // Create reset link
    const frontendURL = process.env.FRONTEND_URL;
    const resetLink = `https://${frontendURL}/reset-password/${resetToken}`;

    try {
        await mailTransport.sendMail({
            from: process.env.USER_EMAIL,
            to: value.email,
            subject: 'Password Reset',
            html: `
            <p>You requested a password reset.</p>
            <p>Click the link below to reset your password.</p>
            <a href="${resetLink}">${resetLink}</a>
            `,
        });
        res.status(200).json({
            status: 'success',
            message: 'Password reset link has been sent to your email',
            expiresAt: user.passwordResetExpires,
            token: resetToken
        });
    } catch (error) {
        // If email fails, clean up reset fields
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(500).json({error: 'Failed to send reset email', details: error.message});
    }
}

export const resetPassword = async (req, res, next) => {
    const { error, value } = resetPasswordValidator.validate(req.body);
    if (error) {
        return res.status(422).json(error);
    }

    const rawToken = req.params.token;

    // Define hashedToken BEFORE using it
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');


    // Find user with valid reset token and unexpired
    const user = await userModel.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.status(400).json({ error: "Invalid or expired token" });
    }

    const hashedResetPassword = bcrypt.hashSync(value.password, 10);
    user.password = hashedResetPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.status(200).json({ status: 'success' });
};
