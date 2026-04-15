// index.js
// Point d'entrée principal du serveur Express.
// Gère toutes les routes de l'API REST et sert le frontend HTML.

const express = require('express');
const cors    = require('cors');
const path    = require('path');

// Import de nos modules locaux
let pokemons = require('./db-pokemons');
let helper   = require('./helper');

// -----------------------------------------------
// INITIALISATION
// -----------------------------------------------
const app  = express();
const PORT = process.env.PORT || 3003;

// -----------------------------------------------
// MIDDLEWARES
// -----------------------------------------------

// Permet à Express de lire les corps de requête en JSON (pour POST et PUT)
app.use(express.json());

// Autorise les requêtes venant d'autres origines (indispensable pour Vercel)
app.use(cors());

// -----------------------------------------------
// ROUTE FRONTEND — sert la page HTML principale
// -----------------------------------------------
app.get('/', (req, res) => {
    // path.join garantit la compatibilité Windows/Linux/Vercel
    res.sendFile(path.join(__dirname, 'index.html'));
});

// -----------------------------------------------
// ROUTES API — CRUD Pokémons
// -----------------------------------------------

// GET /api/pokemons → Retourne TOUS les pokémons
app.get('/api/pokemons', (req, res) => {
    const message = `${pokemons.length} Pokémons dans le Pokédex`;
    res.json(helper.success(message, pokemons));
});

// GET /api/pokemons/:id → Retourne UN pokémon par son ID
app.get('/api/pokemons/:id', (req, res) => {
    const id      = parseInt(req.params.id);
    const pokemon = pokemons.find(p => p.id === id);

    if (pokemon) {
        const message = `${pokemon.name} a été trouvé !`;
        res.json(helper.success(message, pokemon));
    } else {
        res.status(404).json({ message: "Aucun Pokémon trouvé avec cet identifiant." });
    }
});

// POST /api/pokemons → Crée un nouveau pokémon
app.post('/api/pokemons', (req, res) => {
    // Génère un ID unique en prenant le max existant + 1
    const id             = pokemons.length === 0 ? 1 : Math.max(...pokemons.map(p => p.id)) + 1;
    const pokemonCreated = { ...req.body, id, created: new Date() };
    pokemons.push(pokemonCreated);

    const message = `${pokemonCreated.name} a bien été ajouté au Pokédex !`;
    res.json(helper.success(message, pokemonCreated));
});

// PUT /api/pokemons/:id → Met à jour un pokémon existant
app.put('/api/pokemons/:id', (req, res) => {
    const id    = parseInt(req.params.id);
    const index = pokemons.findIndex(p => p.id === id);

    if (index !== -1) {
        // Fusionne les anciennes données avec les nouvelles (on force l'ID d'origine)
        pokemons[index] = { ...pokemons[index], ...req.body, id };
        const message = `${pokemons[index].name} a bien été modifié.`;
        res.json(helper.success(message, pokemons[index]));
    } else {
        res.status(404).json({ message: "Pokémon introuvable, modification impossible." });
    }
});

// DELETE /api/pokemons/:id → Supprime un pokémon
app.delete('/api/pokemons/:id', (req, res) => {
    const id             = parseInt(req.params.id);
    const pokemonDeleted = pokemons.find(p => p.id === id);

    if (pokemonDeleted) {
        // On filtre le tableau pour exclure le pokémon supprimé
        pokemons = pokemons.filter(p => p.id !== id);
        const message = `${pokemonDeleted.name} a été retiré du Pokédex.`;
        res.json(helper.success(message, pokemonDeleted));
    } else {
        res.status(404).json({ message: "Ce Pokémon n'existe pas, suppression impossible." });
    }
});

// -----------------------------------------------
// DÉMARRAGE DU SERVEUR
// -----------------------------------------------
app.listen(PORT, () => {
    console.log(`⚡ Serveur Pokédex démarré → http://localhost:${PORT}`);
});

// Export obligatoire pour que Vercel puisse utiliser l'app Express
module.exports = app;
