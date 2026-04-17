# API REST Pokemon - Node.js / MongoDB

## Installation

```bash
npm install
```

## Configuration

Copier `.env.example` en `.env` et renseigner les variables :

```bash
cp .env.example .env
```

## Lancement

```bash
npm run dev
```

## Routes

- POST `/api/login` — connexion (username: pikachu, password: pikachu)
- GET `/api/pokemons` — liste des pokémons (token requis)
- GET `/api/pokemons/:id` — détail d'un pokémon (token requis)
- POST `/api/pokemons` — créer un pokémon (token requis)
- PUT `/api/pokemons/:id` — modifier un pokémon (token requis)
- DELETE `/api/pokemons/:id` — supprimer un pokémon (token requis)