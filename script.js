let gold = 0;
let dwarfs = 0;
let tavernKeepers = 0;

let beers = 0;
let pickaxe = 0;

const goldPerClick = 1;

let currentDwarfCost = 15;
const dwarfMultiplier = 1.1;

let currentTavernKeeperCost = 100;
const tavernKeeperMultiplier = 1.5;

let beerQuality = 0;

const beerCost = 5;
const beerQuantity = 10;


let currentPickaxeCost = 200
const pickAxeMultiplier = 2;
const pickaxes = ['Regular pickaxe', 'Solid pickaxe', 'Strong pickaxe'];

const achievementsContainer = document.getElementById('achievements');

let availableAchievements = [
  {
    accomplished: false,
    name: 'First dwarf',
    condition: () => dwarfs >= 1,
    description: 'First hire, the start of a great clan!',
  },
  {
    accomplished: false,
    name: 'Small clan',
    condition: () => dwarfs >= 10,
    description: 'Look at this, this almost feels like a mining company!',
    trigger: () => unlockTavernKeepers()
  },
  {
    accomplished: false,
    name: 'Dwarf Empire',
    condition: () => dwarfs + tavernKeepers >= 50,
    description: 'You\'ve built an impressive workforce! The mines never sleep now!'
  },
  {
    accomplished: false,
    name: 'Gold',
    condition: () => gold >= 1,
    description: 'You hear this sound? It\'s the sound of gold, nice isn\'t it?',
  },
  {
    accomplished: false,
    name: 'Riches',
    condition: () => gold >= 100,
    description: 'Enough gold to make a bed out of it.',
  },
  {
    accomplished: false,
    name: 'Gold Rush',
    condition: () => gold >= 1000,
    description: 'You\'ve amassed a small fortune! Keep it going!'
  },
  {
    accomplished: false,
    name: 'Beer Connoisseur',
    condition: () => beers >= 1000,
    description: 'You\'ve hoarded a mountain of beers! Cheers to that!'
  },
  {
    accomplished: false,
    name: 'Master Miner',
    condition: () => pickaxe >= 2,
    description: 'Your mining technology has reached new heights! Dig deeper and find more treasures!'
  },
  {
    accomplished: false,
    name: 'Tavern King',
    condition: () => tavernKeepers >= 10,
    description: 'Your taverns are legendary! The dwarves never want for a drink!'
  },
  {
    accomplished: false,
    name: 'End game...for now ! ',
    condition: () => gold >= 1000 && dwarfs >= 20 && tavernKeepers >= 5 && pickaxe >= 2,
    description: "Thanks for playing ! You did everything that was planned for this version, you can keep playing but you won't unlock any more fun stuff.",
    trigger: () => alert("Thanks for playing ! You did everything that was planned for this version, you can keep playing but you won't unlock any more fun stuff."),
  }
]

const inventory = document.getElementById('inventory');
const actions = document.getElementById('actions');
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', reset)

const mineButton = document.getElementById('mineButton');
const hireDwarfButton = document.getElementById('hireDwarfButton');
let hireTavernKeeperButton = null;

const buyBeerButton = document.getElementById('buyBeerButton');
const buyBeer10Button = document.getElementById('buyBeer10Button');
const improvePickaxeButton = document.getElementById('improvePickaxeButton');

const goldDisplay = document.getElementById('goldDisplay');
const dwarfDisplay = document.getElementById('dwarfDisplay');
const beerDisplay = document.getElementById('beerDisplay');
const pickaxeDisplay = document.getElementById('pickaxeDisplay');
let tavernKeeperDisplay = null;


mineButton.addEventListener('click', () => {
  gold += goldPerClick * (pickaxe + 1);
  updateDisplay();
});

hireDwarfButton.addEventListener('click', () => {
  if (gold >= currentDwarfCost) {
    gold -= currentDwarfCost;
    dwarfs++;
    currentDwarfCost = Math.floor(currentDwarfCost * dwarfMultiplier);
    updateDisplay();
  } else {
    alert('Not enough gold to hire a dwarf!');
  }
});

buyBeerButton.addEventListener('click', () => {
  if (gold >= beerCost) {
    gold -= beerCost;
    beers += beerQuantity;
    updateDisplay();
  } else {
    alert('Not enough gold to buy beer!');
  }
});

buyBeer10Button.addEventListener('click', () => {
  if (gold >= beerCost * 10) {
    gold -= beerCost * 10;
    beers += beerQuantity * 10;
    updateDisplay();
  } else {
    alert('Not enough gold to buy beer!');
  }
});


improvePickaxeButton.addEventListener('click', () => {
  if (gold >= currentPickaxeCost && pickaxe < pickaxes.length - 1) {
    gold -= currentPickaxeCost;
    pickaxe += 1;
    currentPickaxeCost = Math.floor(currentPickaxeCost * pickAxeMultiplier);
    updateDisplay();
  } else {
    alert('Not enough gold to improve pickaxe!');
  }
});

function updateDisplay() {
  goldDisplay.textContent = `Gold: ${gold}`;
  dwarfDisplay.textContent = `Dwarves: ${dwarfs}`;
  beerDisplay.textContent = `Beers: ${beers}`;
  pickaxeDisplay.textContent = `${pickaxes[pickaxe]}`;

  hireDwarfButton.textContent = `Hire a Dwarf (${currentDwarfCost} golds)`;
  buyBeerButton.textContent = `Buy beers: (${beerCost} golds)`;
  buyBeer10Button.textContent = `Buy beer keg: (${beerCost * 10} golds)`;
  improvePickaxeButton.textContent = `Improve pickaxe (${currentPickaxeCost} golds)`;
  if (pickaxe >= pickaxes.length - 1) {
    improvePickaxeButton.textContent = `Technology is not available to improve the pickaxe even further`;
  }

  if (tavernKeeperDisplay) {
    tavernKeeperDisplay.textContent = `Tavern Keepers: ${tavernKeepers}`;
    hireTavernKeeperButton.textContent = `Hire a Tavern Keeper (${currentTavernKeeperCost} golds)`;
  }

  hireDwarfButton.disabled = gold < currentDwarfCost;
  buyBeerButton.disabled = gold < beerCost;
  buyBeer10Button.disabled = gold < beerCost * 10;
  
  improvePickaxeButton.disabled = gold < currentPickaxeCost || pickaxe >= pickaxes.length - 1;
}


function collectGold() {
  const dwarvesMining = Math.min(beers, dwarfs);  
  gold += dwarvesMining  * (pickaxe + 1);
  beers -= dwarvesMining;
  
  beers += tavernKeepers * (beerQuality + 1) * 3
  
  checkAchievements();
  updateDisplay();
  localSave()
}

function checkAchievements() {
  availableAchievements.filter(achievement => !achievement.accomplished).forEach(achievement => {
    if (achievement.condition()) {
      const achievementParagraph = document.createElement('p');
      achievementParagraph.textContent = `${achievement.name}: ${achievement.description}`;
      achievementsContainer.appendChild(achievementParagraph);
      if (achievement.trigger) {
        achievement.trigger()
      } 
      achievement.accomplished = true
      return false;
    }

    return true;
  })
}

function unlockTavernKeepers() {
  tavernKeeperDisplay = document.createElement('div');
  tavernKeeperDisplay.id = "tavernKeeperDisplay";
  inventory.appendChild(tavernKeeperDisplay);    
  
  const d = document.createElement('div');
  d.className = 'action';
  
  const d2 = document.createElement('div');

  hireTavernKeeperButton = document.createElement('button');
  hireTavernKeeperButton.id = "hireTavernKeeperButton";
  hireTavernKeeperButton.textContent = "hireTavernKeeperButton";
  hireTavernKeeperButton.onclick = () => {
    if (gold >= currentTavernKeeperCost) {
      gold -= currentTavernKeeperCost;
      tavernKeepers++;
      currentTavernKeeperCost = Math.floor(currentTavernKeeperCost * tavernKeeperMultiplier);
      updateDisplay();
    } else {
      alert('Not enough gold to hire a BAR dwarf!');
    }
  }


  const i = document.createElement('img');
  i.className = "icon";
  i.src = "./assets/dwarf/miner.webp"

  const p = document.createElement('p');
  p.textContent = "Tavern Keepers will pour beers to the other dwarfs, allowing them to keep working as needed"

  d2.appendChild(i)
  d2.appendChild(hireTavernKeeperButton)

  d.appendChild(d2)
  d.appendChild(p)

  actions.appendChild(d)
}

loadSave()
const intervalId = setInterval(collectGold, 1000);
updateDisplay()

function localSave() {
  const progress = {
    gold: gold,
    dwarfs: dwarfs,
    tavernKeepers: tavernKeepers,
    beers: beers,
    pickaxe: pickaxe,
    achievements: availableAchievements.filter(achievement => achievement.accomplished).map(achievement => achievement.name)
  };
  localStorage.setItem('playerProgress', JSON.stringify(progress));
}

function loadSave() {
  const savedProgress = localStorage.getItem('playerProgress');
  if (savedProgress) {
    const progress = JSON.parse(savedProgress);

    progress.achievements.forEach(achievementName => {
      const achievement = availableAchievements.find(achievement => achievement.name === achievementName);

      const achievementParagraph = document.createElement('p');
      achievementParagraph.textContent = `${achievement.name}: ${achievement.description}`;
      achievementsContainer.appendChild(achievementParagraph);
      if (achievement.trigger) {
        achievement.trigger()
      }
      achievement.accomplished = true
    });

    gold = progress.gold;
    dwarfs = progress.dwarfs;

    for(let i = 0; i < dwarfs;i++) {
      currentDwarfCost = Math.floor(currentDwarfCost * dwarfMultiplier);
    }

    beers = progress.beers;
    
    pickaxe = progress.pickaxe;
    for(let i = 0; i < pickaxe;i++) {
      currentPickaxeCost = Math.floor(currentPickaxeCost * pickAxeMultiplier);
    }
    
    tavernKeepers = progress.tavernKeepers;
    for(let i = 0; i < tavernKeepers;i++) {
      currentTavernKeeperCost = Math.floor(currentTavernKeeperCost * tavernKeeperMultiplier);
    }
  }
}

function reset() {
  clearInterval(intervalId)
  localStorage.removeItem('playerProgress');
  window.location.reload();
}