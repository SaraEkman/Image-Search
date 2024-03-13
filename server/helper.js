const generateRandomId = () => { 
    return Math.floor(Math.random()*10000 +1)
};

module.exports = {generateRandomId};