# Luzgar Neuille Ultime

Ce projet est un script en Node.js permettant de surveiller les ressources d'une ville dans le jeu Grepolis et de recevoir des notifications lorsque le stock de ressources est bas. 

## Prérequis

- **Node.js** doit être installé. Vous pouvez le télécharger [ici](https://nodejs.org/).
- Ce projet utilise les modules `node-fetch` et `node-notifier`. Ces dépendances seront installées automatiquement lors de l'initialisation.

## Installation et Initialisation

1. **Téléchargez le fichier ZIP du dépôt** :

   Rendez-vous sur la page GitHub du projet, cliquez sur **Code** et sélectionnez **Download ZIP**. Extrayez ensuite le contenu du fichier ZIP dans un dossier local.

2. **Installez les dépendances** avec npm :

   ```bash
   npm install
   ```

3. **Lancez le script** pour commencer à surveiller les ressources de la ville :

   ```bash
   node main.js
   ```

## Configuration des Paramètres d'En-tête (Headers)

Pour accéder aux données du jeu Grepolis, le script envoie une requête HTTP avec des en-têtes spécifiques. Ces en-têtes sont définis dans la fonction `fetchTownData`, comme suit :

```javascript
async function fetchTownData(townId) {
  console.log(`Récupération des données pour la ville ${townId}...`);
  const response = await fetch(`https://fr166.grepolis.com/game/frontend_bridge?town_id=${townId}&action=execute&h=${H}&json={"model_url":"PremiumExchange","action_name":"read","town_id":${townId},"nl_init":true}`, {
    headers: {
      "accept": "text/plain, */*; q=0.01",
      "accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "cid=887926458; ig_conv_last_site=https://fr166.grepolis.com/game/index; metricsUvId=6ca28653-e4a6-4670-8df1-a0a534112e4f; _gid=GA1.2.1763335869.1727852016; sid=wcksssswg8ooow4gwogcw4socgw8cwo08wogk0cgwgc00wgooksswgow8ocw4088; logged_in=false; toid=429; _ga_6WS52Q38JB=GS1.1.1728024196.503.1.1728027917.0.0.0; _ga=GA1.1.1643095463.1716331082; _gat_UA-6635454-10=1",
      "Referer": "https://fr166.grepolis.com/game/index?login=1&p=4096461&ts=1704615771",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    }
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
  }
  return await response.json();
}
```

### Paramètres du Header à Modifier

Les en-têtes peuvent nécessiter une mise à jour régulière pour assurer que la requête est correctement authentifiée et que le serveur Grepolis reconnaît la requête.

Voici les principaux paramètres du header que vous pourriez avoir besoin de modifier :

- **`cookie`** : Contient les informations de session nécessaires pour accéder aux données du jeu. Assurez-vous que ce cookie est à jour pour éviter les erreurs d'authentification. Vous pouvez récupérer la valeur du cookie en vous connectant à Grepolis et en inspectant les cookies dans le panneau de développement de votre navigateur (habituellement dans l'onglet "Application" ou "Storage").

- **`Referer`** : Spécifie l'URL référente pour la requête. Cela aide à simuler une requête authentique depuis l'interface de jeu Grepolis. Vérifiez que l'URL correspond à la session en cours de votre compte.

- **`sec-ch-ua`, `sec-ch-ua-platform`, et `sec-ch-ua-mobile`** : Ces en-têtes fournissent des informations sur l'agent utilisateur. Bien qu'ils ne soient pas critiques, il est recommandé de les laisser tels quels pour imiter un navigateur Chrome et assurer la compatibilité.

### Exemple de Mise à Jour

Si vous devez mettre à jour les en-têtes pour une nouvelle session, remplacez simplement les valeurs des propriétés dans le code, par exemple :

```javascript
headers: {
  "accept": "text/plain, */*; q=0.01",
  "accept-language": "fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
  "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "x-requested-with": "XMLHttpRequest",
  "cookie": "VOTRE_NOUVEAU_COOKIE", // Remplacez cette valeur par un cookie valide
  "Referer": "VOTRE_NOUVELLE_URL", // Remplacez cette valeur par l'URL de votre session Grepolis
  "Referrer-Policy": "strict-origin-when-cross-origin"
}
```

**Remarque** : Ne partagez jamais vos cookies ou informations de session sensibles dans un dépôt public, car cela permettrait à d'autres de se connecter à votre compte.

## Utilisation

Après avoir configuré les paramètres, exécutez le script en lançant la commande :

```bash
node main.js
```

Le script surveillera les ressources de votre ville dans Grepolis et enverra des notifications si certaines ressources sont en déficit.

---
