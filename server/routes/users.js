var express = require('express');
var router = express.Router();
router.use(express.json());
const { addUser, getFavoriteImagesById, addImagesToUser, deleteImageFromUser } = require('../controllers/users.controller');
const { validate } = require('../validate');
const { userSchema } = require('../schemas/user.schema');
const { imageSchema } = require('../schemas/image.schema');

/* GET users listing. */
router.post('/', validate(userSchema), addUser);
router.get('/:id', getFavoriteImagesById);
router.put('/:id', validate(imageSchema), addImagesToUser);
router.delete('/:userId/:imageId', deleteImageFromUser);

module.exports = router;
