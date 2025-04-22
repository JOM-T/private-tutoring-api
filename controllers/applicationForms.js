import { applicationModel } from "../models/applicationForms.js";
import { applicationMailTemplate, mailTransport } from "../utils/mail.js";
import { applicationFormValidator } from "../validators/applicationForms.js"
import 'dotenv/config'


export const addApplication = async (req, res, next) => {
    try {
        const { error, value } = applicationFormValidator.validate({
            ...req.body,
            uploadCv: req.files?.uploadCv?.[0]?.path,
            anyOtherDocumentToUpload: req.files?.anyOtherDocumentToUpload?.[0]?.path
        }, 
        { abortEarly: false }
    );        
        if (error) {
            return res.status(422).json(error);
        }
        const applied = await applicationModel.findOne({
            $or: [
                { email: value.email },
                { phoneNumber: value.phoneNumber }
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
            html: applicationMailTemplate.replace ("{{firstName}}", value.firstName)
        });
        res.status(201).json('Application successfully submitted!');
    } catch (error) {
        next(error);
    }
}