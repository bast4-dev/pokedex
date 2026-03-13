import { Sequelize, DataTypes } from 'sequelize'
import pokemon_model from '../models/pokemon.js'
import { pokemons } from '../../mock-pokemon.js'
import user_model from '../models/user.js'
import bcrypt from 'bcrypt'


const sequelize = new Sequelize('pokedex', 'root', 'root', {
  host: 'localhost',
  port: 8889,
  dialect: 'mysql',
  logging: false
})

const Pokemon = pokemon_model(sequelize, DataTypes)
const User = user_model(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync({ force: true }).then(_ => {
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      })
      .then(pokemon => console.log(pokemon.toJSON()))
      .catch(error => console.error(`Bug de creation d'un pokemon avec l'erreur ${error}`))
    })

    bcrypt.hash('pikachu', 10).then(hash => {
      User.create({
        username: 'pikachu',
        password: hash
      })
      .then(user => console.log(user.toJSON()))
      .catch(error => console.error(`Erreur lors de la création de l'utilisateur ${error}`))
    })

    console.log('La base de donnée a bien été initialisée !')
  })
}

export { initDb, Pokemon, User }