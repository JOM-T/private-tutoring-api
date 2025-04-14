import Joi from "joi";

export const addTeacherValidator = Joi.object ({
    fullName: Joi.string().required(),
    email: Joi.string().required(),
    location: Joi.string().required(),
    levelOfEducation: Joi.string().required(),
    gender: Joi.string().required(),
    yearsOfExperience: Joi.number().required(),
    areaOfSpecialization: Joi.string().required(),
    image: Joi.string().required(),
});