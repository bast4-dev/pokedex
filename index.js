import express from 'express'
import morgan from 'morgan'
import { initDb, Pokemon, User } from './src/db/sequelize.js'
import { success } from './helper.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { private_key } from './src/auth/private_key.js'
import authMdlr from './src/auth/auth.js'

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(express.json())

initDb()

// POST login — retourne un token JWT
app.post('/api/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } })
    if (!user) {
      return res.status(404).json({ message: "L'utilisateur demandé n'existe pas." })
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Le mot de passe saisi n'est pas correct." })
    }

    const token = jwt.sign(
      { userId: user.id },
      private_key,
      { expiresIn: '24h' }
    )

    const message = "L'utilisateur a été connecté avec succès."
    res.json({ message, data: user, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// middleware à partir de la connexion
app.use(authMdlr)

// GET tous les pokémons
app.get('/api/pokemons', async (req, res) => {
  try {
    const pokemons = await Pokemon.findAll()
    const message = 'La liste des pokémons a bien été récupérée.'
    res.json(success(message, pokemons))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET un pokémon par ID
app.get('/api/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (!pokemon) {
      return res.status(404).json({ message: "Le pokémon demandé n'existe pas." })
    }
    const message = 'Un pokémon a bien été trouvé.'
    res.json(success(message, pokemon))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// POST créer un pokémon
app.post('/api/pokemons', async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body)
    const message = `Le pokémon ${pokemon.name} a bien été créé.`
    res.json(success(message, pokemon))
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
})

// PUT mettre à jour un pokémon
app.put('/api/pokemons/:id', async (req, res) => {
  try {
    await Pokemon.update(req.body, { where: { id: req.params.id } })
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (!pokemon) {
      return res.status(404).json({ message: "Le pokémon demandé n'existe pas." })
    }
    const message = `Le pokémon ${pokemon.name} a bien été modifié.`
    res.json(success(message, pokemon))
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: error.message })
    }
    res.status(500).json({ message: error.message })
  }
})

// DELETE supprimer un pokémon
app.delete('/api/pokemons/:id', async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (!pokemon) {
      return res.status(404).json({ message: "Le pokémon demandé n'existe pas." })
    }
    await Pokemon.destroy({ where: { id: pokemon.id } })
    const message = `Le pokémon avec l'identifiant n°${pokemon.id} a bien été supprimé.`
    res.json({ message, data: pokemon })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Middleware 404
app.use((req, res) => {
  res.status(404).json({ message: "Impossible de trouver la ressource demandée !" })
})

app.listen(port, () => {
  console.log(`Lien : http://localhost:${port}`)
})