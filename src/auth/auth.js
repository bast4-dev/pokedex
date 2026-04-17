const jwt = require('jsonwebtoken');
const private_key = require('./private_key');

const authMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = "Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.";
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(' ')[1];

    jwt.verify(token, private_key, (error, decodedToken) => {
        if (error) {
            const message = "L'utilisateur n'est pas autorisé à accéder à cette ressource.";
            return res.status(401).json({ message, data: error });
        }

        const userId = decodedToken.idUser;
        if (req.body && req.body.userId && req.body.userId !== userId) {
            const message = "L'identifiant de l'utilisateur est invalide.";
            return res.status(401).json({ message });
        }

        next();
    });
};

module.exports = authMiddleware;