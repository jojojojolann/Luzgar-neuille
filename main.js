import fetch from 'node-fetch';
import nodeNotifier from 'node-notifier';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const cid = "887926458";
const sid = "wcksssswg8ooow4gwogcw4socgw8cwo08wogk0cgwgc00wgooksswgow8ocw4088";
const referer = "https://fr166.grepolis.com/game/index?login=1&p=849068155&ts=1730876651";
const H = '11afc74d1fa5d4a8ccb1930f999f87732200f2da';
const SECONDS = 1000;

function checkGold(data) {
  if (data.json) {
    const woodDiff = data.json.wood.capacity - data.json.wood.stock;
    const stoneDiff = data.json.stone.capacity - data.json.stone.stock;
    const ironDiff = data.json.iron.capacity - data.json.iron.stock;

    if (woodDiff > 500) {
      nodeNotifier.notify({
        title: `OR mer ${data.json.sea_id}`,
        message: `Trou de ${woodDiff} de bois`
      });
    }
  
    if (stoneDiff > 500) {
      nodeNotifier.notify({
        title: `OR mer ${data.json.sea_id}`,
        message: `Trou de ${stoneDiff} de pierre`
      });
    }
  
    if (ironDiff > 500) {
      nodeNotifier.notify({
        title: `OR mer ${data.json.sea_id}`,
        message: `Trou de ${ironDiff} d'argent`
      });
    }
  } else {
    console.error("Données manquantes pour", data.json.sea_id);
  }
}

async function fetchTownData(townId) {
  const response = await fetch(`https://fr166.grepolis.com/game/frontend_bridge?town_id=${townId}&action=execute&h=${H}&json={"model_url":"PremiumExchange","action_name":"read","town_id":${townId},"nl_init":true}`, {
    headers: {
      // "accept": "text/plain, */*; q=0.01",
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `cid=${cid}; sid=${sid}; toid=${townId};`,
      "Referer": referer,
    }
  });
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des données: ${response.statusText}`);
  }
  return await response.json();
}

async function start() {
  try {
    console.log("Recherche de gold...");

    // Liste des villes et check gold
    const data45 = await fetchTownData(613);
    console.log(`Récupération des données pour la ville ${data45.json.sea_id}...`);
    checkGold(data45);
    
    const data55 = await fetchTownData(422);
    console.log(`Récupération des données pour la ville ${data55.json.sea_id}...`);
    checkGold(data55);

    const data75 = await fetchTownData(2831);
    console.log(`Récupération des données pour la ville ${data75.json.sea_id}...`);
    checkGold(data75);

    const data74 = await fetchTownData(4007);
    console.log(`Récupération des données pour la ville ${data74.json.sea_id}...`);
    checkGold(data74);

    const data66 = await fetchTownData(9352);
    console.log(`Récupération des données pour la ville ${data74.json.sea_id}...`);
    checkGold(data66);

    console.log("Attente de 5 secondes...");
    await sleep(5 * SECONDS);
    start();
  } catch (error) {
    console.error("Erreur dans le processus:", error);
  }
}

start();
