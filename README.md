# Vigie : six semaines pour comprendre la cybersécurité

Application web en français pour découvrir la cybersécurité en 42 séances de 15 à 20 minutes, sans connaissance préalable en programmation. Chaque séance contient une explication illustrée par un exemple du quotidien, un exercice interactif, deux indices progressifs, une correction expliquée, une question de rappel, un résumé en trois points et une zone de notes.

Tout fonctionne dans le navigateur : pas de compte, pas de base de données, pas de clé d'API, aucun contenu chargé à distance. La progression et les notes sont enregistrées dans le `localStorage` du navigateur et peuvent être exportées ou importées en JSON.

## Lancer le projet

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:3000
```

Autres commandes :

```bash
npm run build      # build de production
npm run start      # sert le build de production
npm run verifier   # vérifie les 42 séances (structure, réponses, terminal, domaines)
npm run typecheck  # vérification TypeScript
```

## Déployer sur Vercel

1. Pousser le dossier sur un dépôt Git (GitHub, GitLab ou Bitbucket).
2. Sur vercel.com, « Add New… > Project », importer le dépôt.
3. Vercel détecte Next.js : garder les réglages proposés et cliquer sur « Deploy ».

Aucune variable d'environnement n'est nécessaire. Avec la CLI : `npx vercel` puis `npx vercel --prod`.

## Architecture

```
content/                 Contenu pédagogique, sous forme de données typées
  types.ts               Types des séances et des 12 formats d'exercice
  programme.ts           Semaines, compétences, autoévaluation de confiance
  glossaire.ts           72 termes (servent aussi de « notions » pour la révision)
  semaines/semaine-N.ts  7 séances par semaine
  fs.ts                  Aide à la déclaration des systèmes de fichiers fictifs
lib/                     Logique sans interface
  progress.ts            Store localStorage (compatible rendu serveur), export/import validé
  terminal.ts            Interpréteur du terminal SIMULÉ (aucune exécution réelle)
  terminal-tasks.ts      Validation des missions du terminal
  access.ts              Décisions de la simulation de contrôle d'accès
  url.ts, text.ts        Anatomie d'une URL, normalisation des réponses, mélange déterministe
components/
  exercises/             Un composant par format d'exercice
  session/               Vue d'une séance, rappel, notes
  views/                 Accueil, programme, révision, carnet, bilans, données
  ui/                    Glossaire, icônes, états, texte enrichi
app/                     Routes Next.js (App Router), toutes pré-rendues statiquement
scripts/verifier-contenu.ts
```

Les pages serveur ne transmettent aux composants client que les données nécessaires : le contenu complet d'une séance n'est chargé que sur sa propre page.

### Formats d'exercice

`message` (message fictif à examiner), `url` (adresses à décomposer), `order` (étapes, chronologie ou classement), `match` (association ou catégorisation), `justify` (choix à justifier, avec grille d'autoévaluation), `reflection` (réponse rédigée, grille et réponse de référence), `short` (réponses courtes), `terminal` (terminal simulé), `logs` (journal à examiner), `investigation` (mini-enquête à indices), `access` (simulation d'accès par rôle, en prédiction ou en configuration) et `choice` (questions à choix, volontairement minoritaires).

### Terminal simulé

Commandes prises en charge : `help`, `pwd`, `ls [-l] [-a]`, `cd`, `cat`, `head [-n N]`, `tail [-n N]`, `grep [-i] [-n] [-c] [-r]`, `wc -l`, `whoami`, `clear`. Le motif de `grep` est un texte simple (pas d'expression régulière). Les tubes et redirections sont refusés avec une explication ; les commandes courantes non prises en charge (`rm`, `sudo`, `curl`…) renvoient un message pédagogique. Le système de fichiers est fictif et en lecture seule.

### Ajouter ou modifier une séance

Modifier le fichier de la semaine concernée dans `content/semaines/`, puis lancer `npm run verifier`. Le script vérifie notamment que les réponses existent, que les solutions du terminal résolvent bien les missions, que les configurations d'accès proposées sont minimales, et que seuls des domaines réservés aux exemples (`.test`, `.example`, `example.com`…) et des adresses IP de documentation ou privées sont utilisés.

## Données et vie privée

Les données restent dans le navigateur. L'export produit un fichier `vigie-progression-AAAA-MM-JJ.json` ; l'import vérifie et nettoie le fichier avant de proposer le remplacement de la progression actuelle. La réinitialisation demande une confirmation.
