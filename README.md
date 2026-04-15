# ⚡ PokéDex API — Terminal Edition

API REST complète construite avec **Node.js + Express**, avec une interface graphique style terminal rétro-pixel pour explorer les Pokémons.

## 🚀 Démo en ligne (Vercel)

Déployez sur Vercel et accédez à votre Pokédex en ligne :
**[👉 Votre Pokédex sur Vercel](https://vercel.com)**

---

## 📁 Structure du projet

```
pokedex-api/
├── index.js          → Serveur Express + toutes les routes API
├── index.html        → Interface graphique frontend
├── db-pokemons.js    → Données des 12 Pokémons (base de données locale)
├── helper.js         → Fonction utilitaire pour formater les réponses JSON
├── package.json      → Dépendances npm
├── vercel.json       → Configuration de déploiement Vercel
└── .gitignore        → Fichiers à exclure de Git
```

---

## ⚙️ Installation et lancement

```bash
# 1. Cloner le projet
git clone <votre-repo>
cd pokedex-api

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur (avec rechargement automatique via nodemon)
npm start
```

Le serveur démarre sur **http://localhost:3003**

---

## 🔗 Endpoints de l'API

| Méthode | Route                  | Description                        |
|---------|------------------------|------------------------------------|
| GET     | `/`                    | Interface graphique HTML            |
| GET     | `/api/pokemons`        | Liste de tous les Pokémons          |
| GET     | `/api/pokemons/:id`    | Un Pokémon précis par son ID        |
| POST    | `/api/pokemons`        | Créer un nouveau Pokémon            |
| PUT     | `/api/pokemons/:id`    | Modifier un Pokémon existant        |
| DELETE  | `/api/pokemons/:id`    | Supprimer un Pokémon                |

### Exemple de réponse GET /api/pokemons
```json
{
  "message": "12 Pokémons dans le Pokédex",
  "data": [
    {
      "id": 1,
      "name": "Bulbizarre",
      "hp": 25,
      "cp": 5,
      "picture": "https://...",
      "types": ["Plante", "Poison"],
      "created": "2025-01-01T00:00:00.000Z"
    }
  ]
}
```

### Exemple de body pour POST
```json
{
  "name": "Mewtwo",
  "hp": 65,
  "cp": 10,
  "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/150.png",
  "types": ["Psychique"]
}
```

---

## 🌐 Déploiement sur Vercel

1. Pushez votre code sur GitHub
2. Importez le repo sur [vercel.com](https://vercel.com)
3. Vercel détecte automatiquement la config via `vercel.json`
4. C'est en ligne ! 🎉

---

## ⚠️ Note importante

Les données sont **stockées en mémoire**. Elles sont réinitialisées à chaque redémarrage du serveur.
Pour une persistance réelle, connectez une base de données (MongoDB Atlas, PlanetScale...).

---

## 🛠️ Stack technique

- **Runtime** : Node.js
- **Framework** : Express 5
- **Rechargement** : Nodemon
- **CORS** : cors
- **Déploiement** : Vercel
- **Frontend** : HTML/CSS/JS vanilla (aucune dépendance)
