const bcrypt = require('bcrypt');
const User = require('../models/user-model');

const createFirstUser = async () => {
    try {
        const count = await User.countDocuments({ username: 'pikachu' });
        if (count > 0) {
            console.log('User pikachu already exists');
            return;
        }

        const hash = await bcrypt.hash('pikachu', 10);
        const user = await User.create({
            username: 'pikachu',
            password: hash
        });
        console.log('la création du premier utilisateur ok', user);
    } catch (error) {
        console.log(`erreur lors de la création du premier utilisateur ${error}`);
    }
};

module.exports = { createFirstUser };