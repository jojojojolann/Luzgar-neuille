import fetch from 'node-fetch';
import nodeNotifier from 'node-notifier';

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const H = 'd47a1196dcb8ec2623ea94283054054261e9b128';
const cid = "887926458";
const sid = "4cgk804ksgcwg4k80o8c8k0g004kggsw4ok80k8c4c4c4ccks4k4ggc0skw8wsow"
const referer = "https://fr166.grepolis.com/game/index?login=1&p=849068155&ts=1731333660"
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

    const dataTown = await fetchTownData(429);
    console.log(`Récupération des données pour la ville ${dataTown.json.sea_id}...`);
    checkGold(dataTown);

    console.log("Attente de 5 secondes...");
    await sleep(5 * SECONDS);
    start();
  } catch (error) {
    console.error("Erreur dans le processus:", error);
  }
}

start();