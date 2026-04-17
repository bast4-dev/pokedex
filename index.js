require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const validateId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ 
            message: `L'identifiant "${req.params.id}" n'est pas un format valide.` 
        });
    }
    next();
};

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas!'))
    .catch((err) => console.log('Connection failed', err));

const { createFirstUser } = require('./src/db/create-first-user');
createFirstUser();

// Login (accessible sans token)
const { userLogin } = require('./src/routes/user-route');
app.post('/api/login', userLogin);

// Middleware auth — protège toutes les routes en dessous
const authMiddleware = require('./src/auth/auth');
app.use(authMiddleware);

// Routes Pokemon
const {
    findAllPokemons,
    findPokemonByPk,
    createPokemon,
    updatePokemon,
    deletePokemon
} = require('./src/routes/pokemon-route');

app.get('/api/pokemons', findAllPokemons);
app.get('/api/pokemons/:id', validateId, findPokemonByPk);
app.post('/api/pokemons', createPokemon);
app.put('/api/pokemons/:id', validateId, updatePokemon);
app.delete('/api/pokemons/:id', validateId, deletePokemon);

app.use((req, res) => {
    res.status(404).json({ message: 'notfound' });
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});