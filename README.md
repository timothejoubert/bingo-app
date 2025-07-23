# 🎯 Bingo App

Une application web moderne de bingo développée avec Nuxt 3, permettant de créer et gérer des parties de bingo en ligne avec un système de persistance local.

## ✨ Fonctionnalités

- **Création de parties** : Configurez vos propres grilles avec des plages de numéros personnalisées
- **Gestion des parties** : Historique complet des parties jouées avec dates et statuts
- **Tirage aléatoire** : Système de tirage automatique des numéros
- **Grille interactive** : Affichage visuel des numéros tirés dans une grille 9x9
- **Persistance locale** : Sauvegarde automatique dans le localStorage
- **Interface responsive** : Design adapté pour mobile et desktop

## 🚀 Technologies utilisées

- **Framework** : [Nuxt 3](https://nuxt.com/) (Vue 3 + TypeScript)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/) + SCSS Modules
- **UI Components** : [Nuxt UI](https://ui.nuxt.com/)
- **Icons** : [Nuxt Icon](https://github.com/nuxt/icon)
- **State Management** : Composables Vue 3 + VueUse
- **Linting** : ESLint + Stylelint

## 📦 Installation

```bash
# Cloner le projet
git clone https://github.com/timothejoubert/bingo-app.git
cd bingo-app

# Installer les dépendances
pnpm install
# ou
npm install
# ou
yarn install
```

## 🔧 Scripts disponibles

```bash
# Serveur de développement (http://localhost:3000)
pnpm dev

# Build pour la production
pnpm build

# Aperçu de la version production
pnpm preview

# Génération statique
pnpm generate
```

## 🎮 Utilisation

### Créer une nouvelle partie
1. Rendez-vous sur la page d'accueil
2. Cliquez sur "Nouvelle Partie"
3. Configurez les paramètres (plage de numéros)
4. Lancez la partie

### Gérer une partie
- **Tirer un numéro** : Clic sur le bouton de tirage pour générer un numéro aléatoire
- **Voir l'historique** : Consultez tous les numéros déjà tirés
- **Terminer la partie** : Marquez la partie comme terminée

### Historique
- Consultez toutes vos parties précédentes
- Filtrez par date et statut
- Reprenez une partie en cours

## 🏗️ Structure du projet

```
app/
├── components/           # Composants Vue réutilisables
│   ├── VBingoGrid.vue   # Grille de bingo principale
│   ├── VHistoryList.vue # Liste de l'historique
│   └── ...
├── composables/         # Logique métier réutilisable
│   ├── use-bingo-game.ts       # Gestion des parties
│   ├── use-bingo-game-history.ts # Historique
│   └── ...
├── pages/               # Pages de l'application
│   ├── index.vue        # Page d'accueil
│   └── game/
│       ├── index.vue    # Liste des parties
│       └── [id].vue     # Partie spécifique
├── types/               # Types TypeScript
│   └── bingo.d.ts       # Types pour le bingo
└── utils/               # Utilitaires
```

## 🎯 Logique métier

### Types principaux

```typescript
type BingoGame = {
  id: string
  startDate: string
  endDate: null | string
  options: BingoOptions
  storedNumber: number[]    // Numéros déjà tirés
  restNumber: number[]      // Numéros restants
  status: 'started' | 'finished'
}
```

### Composables clés

- `useBingoGame()` : Création et gestion des parties
- `useBingoGameList()` : Gestion des parties enregistrées
- `useBingoGameMutation()` : Mutations des parties en cours

## 📱 Pages et navigation

- **/** : Page d'accueil avec création de partie et historique
- **/game** : Liste complète de l'historique des parties
- **/game/[id]** : Interface de jeu pour une partie spécifique

## 💾 Persistance des données

Les données sont automatiquement sauvegardées dans le `localStorage` du navigateur :
- Historique complet des parties
- État des parties en cours
- Configuration des parties

## 🔮 Fonctionnalités à venir

D'après le fichier TODO.md, les améliorations prévues incluent :

- [ ] Génération de grilles imprimables
- [ ] Mode manuel pour le tirage des numéros
- [ ] Amélioration de l'interface de création de partie
- [ ] Optimisation de la gestion du localStorage

## 🤝 Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous license MIT.

## 🛠️ Configuration technique

### Prérequis
- Node.js 22.17+
- pnpm (recommandé) ou npm/yarn

### Variables d'environnement
Le projet utilise la configuration Nuxt runtime pour :
- Version de l'application
- Configuration du site (nom, URL, environnement)

### Styling
- **Tailwind CSS 4** avec configuration personnalisée
- **SCSS Modules** pour les styles composants
- **PostCSS** avec conversion px vers rem

---

*Développé avec ❤️ par [timothejoubert](https://github.com/timothejoubert)*
