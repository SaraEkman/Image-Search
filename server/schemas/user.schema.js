const Joi = require('joi');
const { imageSchema } = require('./image.schema');

const userSchema = Joi.object({
    id: Joi.number(),
    user: Joi.string().min(3).max(125).required(),
    favoriteImages: Joi.array().items(imageSchema)
});

module.exports = { userSchema };