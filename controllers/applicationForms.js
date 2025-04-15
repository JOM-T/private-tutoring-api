import { applicationModel } from "../models/applicationForms.js";
import { applicationMailTemplate, mailTransport } from "../utils/mail.js";
import { applicationFormValidator } from "../validators/applicationForms.js"
import 'dotenv/config'


export const addApplication = async (req, res, next) => {
    const { error, value } = applicationFormValidator.validate (req.body);
    if (error) {
        return res.status(422).json(error);
    }
    const applied = await applicationModel.findOne({
        $or: [
            { email: value.email },
            { contact: value.contact }
        ]
    });
    if (applied) {
        return res.status(409).json('You have already submitted an application!')
    }
    const result = await applicationModel.create(value);
    await mailTransport.sendMail({
        from: process.env.USER_EMAIL,
        to: value.email,
        subject: "Your JOMAT application has been recieved!",
        html: applicationMailTemplate.replace ("{{username}}", value.username)
    });
    res.status(201).json('Application successfully submitted!');
}