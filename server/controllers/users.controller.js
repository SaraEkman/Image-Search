const fs = require('fs').promises;
const path = require('path');
const { generateRandomId } = require('../helper');
const { error } = require('console');
const DATA_FILE = path.join(__dirname, '..', 'users.json');

const addUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);

        const existingUser = users.find(user => user.user === req.body.user);

        if (existingUser) {
            console.log('User already exists');
            return res.status(200).json(existingUser);
        }

        const userId = generateRandomId();
        const newUser = { ...req.body, id: userId, favoriteImages: [] };

        users.push(newUser);

        const addData = await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');

        res.status(200).json(newUser);

    } catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).send('Error reading the user file');
    }
};

const getFavoriteImagesById = async (req, res, next) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);

        const user = users.find(user => user.id === parseInt(req.params.id));

        if (!user) {
            res.status(400).send('User not found');
            return;
        }

        res.status(200).json(user);

    } catch (e) {
        console.error('Error reading the file:', error);

    }
};

const addImagesToUser = async (req, res, next) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);

        const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));

        if (userIndex === -1) {
            res.status(400).send(`User ${req.params.id} not found.`);
            return;
        }

        const imageId = generateRandomId();

        const newImage = { ...req.body, id: imageId };
        users[userIndex].favoriteImages.push(newImage);

        await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');

        res.json(users[userIndex]);
    }
    catch (error) {
        console.error('Error reading the file:', error);
    }
};

const deleteImageFromUser = async (req, res, next) => {
    try {

        const data = await fs.readFile(DATA_FILE, 'utf8');
        const users = JSON.parse(data);

        const userIndex = users.findIndex(user => user.id === parseInt(req.params.userId));

        if (userIndex === -1) {
            res.status(400).send(`User with ID ${req.params.userId} not found.`);
            return;
        }

        const imageIndex = users[userIndex].favoriteImages.findIndex(image => image.id === parseInt(req.params.imageId));

        users[userIndex].favoriteImages.splice(imageIndex, 1);

        await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2), 'utf8');

        res.json(users[userIndex]);
    }
    catch (error) {
        console.error('Error reading the file:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { addUser, getFavoriteImagesById, addImagesToUser, deleteImageFromUser };