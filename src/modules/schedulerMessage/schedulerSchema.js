const Joi = require("joi");
const { errors } = require("../../helpers/messageErrors");

exports.schedulerSchema = Joi.object({
    text: Joi
            .string()
            .required()
            .min(3)
            .max(250)
            .error(new Error(errors.validText)),
    timeToSend: Joi
            .date()
            .greater('now')
            .error(new Error(errors.validDate)),
    communicationTypeId: Joi
            .number()
            .integer()
            .required()
            .error(new Error(errors.validCommunicationTypeId)),
    addresseeIds: Joi
            .array()
            .items(Joi.number().integer())
            .error(new Error(errors.validAddresseeIds)),
});
