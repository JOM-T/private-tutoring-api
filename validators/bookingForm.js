import Joi from "joi";

export const addBookingValidator = Joi.object ({
    name: Joi.string().required(),
    email: Joi.string().required(),
    contact: Joi.number().required(),
    region: Joi.string().required(),
    location: Joi.string().required(),
    subject: Joi.string().required(),
    bookingType: Joi.string().required(),
    numberOfLearners: Joi.number().required(),
    hoursPerWeek: Joi.number().required()
});