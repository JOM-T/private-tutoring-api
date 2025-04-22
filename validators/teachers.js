import Joi from "joi";

export const addTeacherValidator = Joi.object ({
    fullName: Joi.string().required(),
    subject: Joi.string().required(),
    location: Joi.string().required(),
    profile: Joi.string().required(),
    keySkills: Joi.string().required(),
    teachingPhilosophy: Joi.string().required(),
    image: Joi.string().required(),
});