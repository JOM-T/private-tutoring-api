import { bookingModel } from "../models/bookingForm.js";
import { bookingMailTemplate, mailTransport } from "../utils/mail.js";
import { addBookingValidator } from "../validators/bookingForm.js";
import 'dotenv/config'


export const bookTutor = async (req, res, next) => {
    try {
        const { error, value } = addBookingValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        const {result} = await bookingModel.create(value);
        await mailTransport.sendMail({
            from: process.env.USER_EMAIL,
            to: value.email,
            subject: "Notification of successful booking!",
            html: bookingMailTemplate.replace("{{firstName}}", value.firstName)
        });
        res.status(201).json('Booking successful!');
    } catch (error) {
        next(error);
    }
}