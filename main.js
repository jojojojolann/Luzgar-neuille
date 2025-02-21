import fetch from 'node-fetch';
import nodeNotifier from 'node-notifier';

const H = '7ed655e362544364aefb2fb91081bc53bdd33929';
const cid = "2027860180";
const sid = "w0oo4g8cg4ws4c40gwokwgsc4wss0ow84kgwccg84o48s8g0804wcws4wc0gswos";
const SECONDS = 1000;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function checkGold(data) {
  if (data.json) {
    const woodDiff = data.json.wood.capacity - data.json.wood.stock;
    const stoneDiff = data.json.stone.capacity - data.json.stone.stock;
    const ironDiff = data.json.iron.capacity - data.json.iron.stock;

    if (woodDiff > 1000) {
      nodeNotifier.notify({
        title: `OR mer ${data.json.sea_id}`,
        message: `Trou de ${woodDiff} de bois`
      });
    }
  
    if (stoneDiff > 1000) {
      nodeNotifier.notify({
        title: `OR mer ${data.json.sea_id}`,
        message: `Trou de ${stoneDiff} de pierre`
      });
    }
  
    if (ironDiff > 1000) {
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
  const response = await fetch(`https://fr170.grepolis.com/game/frontend_bridge?town_id=${townId}&action=execute&h=${H}&json={"model_url":"PremiumExchange","action_name":"read","town_id":${townId},"nl_init":true}`, {
    headers: {
      "Content-Type": "application/json",
      "x-requested-with": "XMLHttpRequest",
      "cookie": `cid=${cid}; sid=${sid}; toid=${townId};`
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

    const dataTown = await fetchTownData(510);
    console.log(`Récupération des données pour la ville ${dataTown.json.sea_id}...`);
    checkGold(dataTown);

    console.log("Attente de 5 secondes...");
    await sleep(30 * SECONDS);
    start();
  } catch (error) {
    console.error("Erreur dans le processus:", error);
  }
}

start();