# Grepolis Gold Tracker

Ce script permet de surveiller les ressources dans une ville de *Grepolis* et d'envoyer des notifications lorsque des quantités de bois, pierre ou fer sont inférieures à leur capacité de stockage de plus de 1000 unités. Ce script utilise `node-fetch` pour récupérer les données du jeu et `node-notifier` pour envoyer des notifications.

## Fonctionnalités

- Récupère les données d'une ville spécifique dans *Grepolis*.
- Vérifie les ressources (bois, pierre, fer) et alerte si le stock manque de plus de 1000 unités.
- Envoie des notifications via le système de notifications de l'OS.
- Rafraîchit les données toutes les 30 secondes.

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Installation

1. Clonez ou téléchargez ce repository.
2. Ouvrez un terminal à la racine du projet.
3. Installez les dépendances avec la commande suivante :
   
   ```bash
   npm install
   ```

## Configuration

Avant de lancer le script, assurez-vous de définir vos variables suivantes dans le code :

- `H`: Le **Hash** nécessaire pour authentifier la requête à l'API de Grepolis.
- `cid`: Votre **cookie de session**.
- `sid`: Votre **cookie d'identifiant de session**.
- `townId`: L'ID de la ville à surveiller (dans le script, il est défini par défaut à `510`).

Ces informations sont nécessaires pour récupérer les données via l'API de Grepolis.

## Usage

Pour démarrer le script, exécutez la commande suivante dans le terminal :

```bash
node index.js
```

Le script commencera à récupérer les données de la ville et vérifiera les stocks de ressources toutes les 30 secondes. Si une ressource manque de plus de 1000 unités, une notification sera envoyée.

## Structure du Code

- **fetchTownData(townId)** : Récupère les données de la ville via l'API de Grepolis.
- **checkGold(data)** : Vérifie les stocks de bois, pierre et fer et envoie des notifications si un manque est détecté.
- **sleep(ms)** : Fonction pour attendre pendant un certain nombre de millisecondes avant de relancer le processus.
- **start()** : Fonction principale qui démarre le processus de récupération des données et de vérification des stocks.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
