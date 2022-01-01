const Joi = require("joi");
const { errors } = require("../../helpers/messageErrors");

exports.addresseeSchema = Joi.object({
    name: Joi
        .string()
        .min(3)
        .max(50)
        .required()
        .error(new Error(errors.validName))
    ,   
    lastName: Joi.string().min(3).max(50)
    .error(new Error(errors.validLastName)),
    email: Joi
            .string()
            .required()
            .email({ minDomainSegments: 2 })
            .error(new Error(errors.validEmail)),
    phoneNumber: Joi.string().length(11).pattern(/^[0-9]+$/).required()
            .error(new Error(errors.validPhoneNumber)),
    pushUserId: Joi.string().length(8).required()
            .error(new Error(errors.validPushUserId))
});

exports.addresseeSchemaList = Joi.object({
    page: Joi.number().integer()
          .error(new Error(errors.validPageNumber)),
});