let gold = 0;
let dwarfs = 0;
let beers = 0;
let pickaxe = 0;

const goldPerClick = 1;

let currentDwarfCost = 15;
const dwarfMultiplier = 1.1;

const beerCost = 5;
const beerQuantity = 10;


let currentPickaxeCost = 100
const pickAxeMultiplier = 2;
const pickaxes = ['Regular pickaxe', 'Solid pickaxe', 'Strong pickaxe'];

const achievementsContainer = document.getElementById('achievements');

let availableAchievements = [
  {
    name: 'Gold',
    condition: () => gold >= 1,
    description: 'You hear this sound? It\'s the sound of gold, nice isn\'t it?',
  },
  {
    name: 'First dwarf',
    condition: () => dwarfs >= 1,
    description: 'First hire, the start of a great clan!',
  },
  {
    name: 'Small clan',
    condition: () => dwarfs >= 10,
    description: 'Look at this, this almost feels like a mining company!',
  },
  {
    name: 'Riches',
    condition: () => gold >= 100,
    description: 'Enough gold to make a bed out of it.',
  }
]

const mineButton = document.getElementById('mineButton');
const hireDwarfButton = document.getElementById('hireDwarfButton');
const buyBeerButton = document.getElementById('buyBeerButton');
const buyBeer10Button = document.getElementById('buyBeer10Button');
const improvePickaxeButton = document.getElementById('improvePickaxeButton');

const goldDisplay = document.getElementById('goldDisplay');
const dwarfDisplay = document.getElementById('dwarfDisplay');
const beerDisplay = document.getElementById('beerDisplay');
const pickaxeDisplay = document.getElementById('pickaxeDisplay');


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
    improvePickaxeButton.textContent = `Technology is not available to imrpove the pickaxe even furhter`;
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
  updateDisplay();
  checkAchievements();
}

function checkAchievements() {
  availableAchievements = availableAchievements.filter(achievement => {
    if (achievement.condition()) {
      const achievementParagraph = document.createElement('p');
      achievementParagraph.textContent = `${achievement.name}: ${achievement.description}`;
      achievementsContainer.appendChild(achievementParagraph);
      return false;
    }

    return true;
  })
}

// Automatically collect gold every second
setInterval(collectGold, 1000);
updateDisplay()
