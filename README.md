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

## Paramètres du Header à Modifier

Les en-têtes doivent être mises à jour sur chaque monde. Pour cela :
- Inspectez l'élément de la page de la ville sur Grepolis (f12 sur Windows)
- Allez dans l'onglet "Réseau"
- Ouvrez le marché et l'option "échange d'or" dans le jeu
- Sélectionnez la ligne "https://fr166.grepolis.com/game/frontend_bridge?" dans Réseaux
  
Les valeurs à modifier se trouvent dans les : en-têtes de requête > cookie. Il s'agit de :
- H
- cid
- ig_conv_last_site
- metricsUvId
- _gid
- sid
- _ga_6WS52Q38JB
- _ga
- et enfin Referer

## Configuration sur plusieurs villes (mers)

Pour configurer sur plusieurs mers à la fois il suffit d'ajouter la ligne suivante à la suite de la dernière ville dans la méthode async function start() :

```javascript
const data## = await fetchTownData(###); // ## = N° Mer / ### = ID (BBCode) de la ville
console.log(`Récupération des données pour la ville ${data##.json.sea_id}...`);
checkGold(data##, ##);
```

## Utilisation

Après avoir configuré les paramètres, exécutez le script en lançant la commande :

```bash
node main.js
```

Le script surveillera les ressources de votre ville dans Grepolis et enverra des notifications si certaines ressources sont en déficit.

---
