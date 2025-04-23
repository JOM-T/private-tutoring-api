import Joi from "joi";

export const addTeacherValidator = Joi.object ({
    fullName: Joi.string().required(),
    subject: Joi.string().optional(),
    location: Joi.string().required(),
    profile: Joi.string().optional(),
    keySkills: Joi.string().optional(),
    teachingPhilosophy: Joi.string().optional(),
    image: Joi.string().required(),
});

export const addTeacherDashboardValidator = Joi.object ({
    fullName: Joi.string().required(),
    location: Joi.string().required(),
    email: Joi.string().optional(),
    phoneNumber: Joi.number().optional(),
    image: Joi.string().required(),
    joiningDate: Joi.string().optional(),
    role: Joi.string().optional(),
    address: Joi.string().optional(),
    contract: Joi.string().optional(),
});