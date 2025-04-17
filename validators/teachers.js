import Joi from "joi";

export const addTeacherValidator = Joi.object ({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    location: Joi.string().required(),
    role: Joi.string().required(),
    yearsOfExperience: Joi.number().required(),
    image: Joi.string().required(),
});