import Joi from "joi";

export const applicationFormValidator = Joi.object ({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    location: Joi.string().required(),
    specialization: Joi.string().required(),
    earliestPossibleStartDate: Joi.date().required(),
    coverLetter: Joi.string().required(),
    uploadCv: Joi.string().required(),
    anyOtherDocumentToUpload: Joi.string().optional(),
    uploadProfilePicture: Joi.string().required()
});
