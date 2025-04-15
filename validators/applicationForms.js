import Joi from "joi";

export const applicationFormValidator = Joi.object ({
    name: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.number().required(),
    region: Joi.string().required(),
    location: Joi.string().required(),
    qualification: Joi.string().required(),
    yearsOfExperience: Joi.string().required(),
    subject: Joi.string().required(),
    numberOfHoursAvailablePerWeek: Joi.string().required()
});