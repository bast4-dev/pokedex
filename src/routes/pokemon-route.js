const Pokemon = require('../models/pokemon-model');

// READ all
const findAllPokemons = async (req, res) => {
    try {
        const pokemons = await Pokemon.find();
        res.json({ message: 'all pokemons', data: pokemons });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ one
const findPokemonByPk = async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ _id: req.params.id });
        if (!pokemon) {
            return res.status(404).json({ message: "Le pokémon demandé n'existe pas." });
        }
        res.json({ message: 'one pokemon', data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE
const createPokemon = async (req, res) => {
    try {
        const { name, hp, cp, picture, types } = req.body;

        if (!name || !hp || !cp || !picture || !types) {
            return res.status(400).json({ message: 'Les champs name, hp, cp, picture et types sont requis.' });
        }

        const pokemon = await Pokemon.create({ name, hp, cp, picture, types });
        res.json({ message: 'new pokemon', data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
const updatePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await Pokemon.findOneAndUpdate(
            { _id: id },
            req.body,
            { new: true }
        );
        if (!pokemon) {
            return res.status(404).json({ message: "Le pokémon demandé n'existe pas." });
        }
        res.json({ message: 'pokemon maj', data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE
const deletePokemon = async (req, res) => {
    try {
        const id = req.params.id;
        const pokemon = await Pokemon.findById(id);
        if (!pokemon) {
            return res.status(404).json({ message: "Le pokémon demandé n'existe pas." });
        }
        await Pokemon.deleteOne({ _id: id });
        res.json({ message: 'this pokemon is deleted', data: pokemon });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    findAllPokemons,
    findPokemonByPk,
    createPokemon,
    updatePokemon,
    deletePokemon
};