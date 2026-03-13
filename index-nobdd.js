import express from 'express'
import morgan from 'morgan'
import { pokemons } from './mock-pokemon.js'
import { success } from './helper.js'

const app = express()
const port = 3000

// Middlewares
app.use(morgan('dev'))
app.use(express.json())

// GET tous les pokémons
app.get('/api/pokemons', (req, res) => {
  const message = `La liste des pokémons a été récupérée. (${pokemons.length} pokémons)`
  res.json(success(message, pokemons))
})

// GET un pokémon par ID
app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(p => p.id === parseInt(id))
  const message = 'Un pokémon a été trouvé.'
  res.json(success(message, pokemon))
})

// POST créer un pokémon
app.post('/api/pokemons', (req, res) => {
  const id = pokemons.length + 1
  const newPokemon = { id, ...req.body, created: new Date() }
  pokemons.push(newPokemon)
  const message = `Le pokémon ${newPokemon.name} a été créé.`
  res.json(success(message, newPokemon))
})

// PUT mettre à jour un pokémon
app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(p => p.id === id)
  Object.keys(req.body).forEach(key => {
    pokemon[key] = req.body[key]
  })
  const message = `Le pokémon ${pokemon.name} a été modifié.`
  res.json(success(message, pokemon))
})

// DELETE supprimer un pokémon
app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(p => p.id === id)
  pokemons.splice(pokemons.indexOf(pokemon), 1)
  const message = `Le pokémon ${pokemon.name} a été supprimé.`
  res.json(success(message, pokemon))
})

app.listen(port, () => {
  console.log(`Lien : http://localhost:${port}`)
})