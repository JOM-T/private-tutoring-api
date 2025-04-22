import Joi from "joi";

export const addBookingValidator = Joi.object ({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.number().required(),
    preferredTeacher: Joi.string().required(),
    location: Joi.string().required(),
    subject: Joi.string().required(),
    bookingFor: Joi.string().required(),
    numberOfLearners: Joi.number().required(),
    levelOfLearner: Joi.string().required(),
    preferredHoursPerWeek: Joi.string().required(),
    paymentPlan: Joi.string().required(),
    paymentMethod: Joi.string().required()
});