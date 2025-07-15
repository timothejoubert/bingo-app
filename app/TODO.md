# Simple app

## TO_DO
- Type safety routes (https://www.youtube.com/watch?v=SXk-L19gTZk)
- Faire une page de statistique pour montre le pourcentage de chaque numéro tombé (webWorkers, éviter de poluer le mainThread)
- Add BDD (+ auth)

## DONE
- Resposive
- Garder en local_storage les info (+ historique) si jamais on refresh la page


# Bingo Multi-joueur avec PNPM monorepo

## 📁 Monorepo structure
- [ ] Init PNPM: `pnpm init && pnpm install`
- [ ] Fichier `pnpm-workspace.yaml`
- [ ] Ajouter workspaces: `frontend/`, `server-ws/`, `shared/`

## 🧩 Shared (types communs)
- [ ] Créer `shared/types.ts` → messages WebSocket, RoomId
- [ ] Créer `shared/constants.ts` → config (grille 8x3, etc.)
- [ ] Configurer alias `#shared` dans front & back

## 🌐 Server WebSocket
- [ ] Créer `server-ws/` avec Express + ws
- [ ] Gérer :
  - [ ] Connexion
  - [ ] Room
  - [ ] Permissions des users en fonction du role (hote + joueur)
  - [ ] Tirage
  - [ ] Broadcast
- [ ] Nettoyage des rooms inactives
- [ ] Déploiement sur Render

## 🖥 Frontend Nuxt
- [ ] Connexion WebSocket (par URL avec roomId)
- [ ] Interface grille bingo
- [ ] Affichage tirage temps réel
- [ ] Tirage si hôte
- [ ] Copier le lien de room
- [ ] Reconnexion auto

## 🧪 Tests
- [ ] Multi-browser
- [ ] Room isolées
- [ ] Pas de tirage doublé
- [ ] Protection anti spam (client draw)

## 🚀 Déploiement
- [ ] Nuxt sur Netlify (via GitHub)
- [ ] WS sur Render (via GitHub)
- [ ] Test prod: `wss://...` + HTTPS

## 🔮 Étapes futures
- [ ] Sauvegarde des parties ?
- [ ] Authentification des joueurs ?
- [ ] Interface admin pour voir les rooms ?
