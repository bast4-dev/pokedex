const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const private_key = require('../auth/private_key');

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            const message = "l'utilisateur demandé n'existe pas.";
            return res.status(404).json({ message });
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordValid) {
            const message = "le mot de passe de l'utilisateur est incorrect";
            return res.status(401).json({ message, data: req.body.username });
        }

        const token = jwt.sign(
            { idUser: user._id, uName: user.username },
            private_key,
            { expiresIn: '2h' }
        );

        const message = "L'utilisateur a été trouvé et connecté avec succès";
        return res.json({ message, data: user.username, token });
    } catch (error) {
        const message = "L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants";
        return res.status(500).json({ message, data: error });
    }
};

module.exports = { userLogin };