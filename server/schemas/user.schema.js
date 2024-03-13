const Joi = require('joi');
const { imageSchema } = require('./image.schema');

const userSchema = Joi.object({
    id: Joi.number(),
    user: Joi.string().min(3).max(16).required(),
    favoriteImages: Joi.array().items(imageSchema).required()
});

module.exports = { userSchema };