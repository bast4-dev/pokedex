const Pokemon = require('../models/pokemon-model');

const seedPokemons = async () => {
    try {
        const count = await Pokemon.countDocuments();
        if (count > 0) {
            console.log(`${count} pokemons already in db`);
            return;
        }

        const pokemons = [
            {
                name: "Bulbizarre",
                hp: 25,
                cp: 5,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
                types: ["Plante", "Poison"]
            },
            {
                name: "Salamèche",
                hp: 28,
                cp: 6,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
                types: ["Feu"]
            },
            {
                name: "Carapuce",
                hp: 21,
                cp: 4,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
                types: ["Eau"]
            },
            {
                name: "Pikachu",
                hp: 21,
                cp: 5,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
                types: ["Electrik"]
            },
            {
                name: "Dracaufeu",
                hp: 78,
                cp: 12,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/006.png",
                types: ["Feu", "Vol"]
            },
            {
                name: "Tortank",
                hp: 79,
                cp: 10,
                picture: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/009.png",
                types: ["Eau"]
            }
        ];

        await Pokemon.insertMany(pokemons);
        console.log(`${pokemons.length} pokemons seeded`);
    } catch (error) {
        console.log('Error seeding pokemons:', error);
    }
};

module.exports = { seedPokemons };