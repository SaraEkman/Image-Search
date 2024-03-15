const Joi = require('joi');

const imageSchema = Joi.object({
    id: Joi.number(),
    title: Joi.string().min(3).max(126).required(),
    byteSize: Joi.number().required(),
    url: Joi.string().uri().required()
});

module.exports = { imageSchema };