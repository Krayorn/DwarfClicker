let gold = 0;
let dwarfs = 0;
let beers = 0;

// Global variables for customization
const dwarfCost = 50;
const beerCost = 10;
const beerQuantity = 60;
const goldPerClick = 30; // Quantity of gold mined per click

const goldDisplay = document.getElementById('goldDisplay');
const mineButton = document.getElementById('mineButton');
const hireDwarfButton = document.getElementById('hireDwarfButton');
const buyBeerButton = document.getElementById('buyBeerButton');

mineButton.addEventListener('click', () => {
  gold += goldPerClick;
  updateGoldDisplay();
});

hireDwarfButton.addEventListener('click', () => {
  if (gold >= dwarfCost) {
    gold -= dwarfCost;
    dwarfs++;
    updateGoldDisplay();
  } else {
    alert('Not enough gold to hire a dwarf!');
  }
});

buyBeerButton.addEventListener('click', () => {
  if (gold >= beerCost) {
    gold -= beerCost;
    beers += beerQuantity;
    updateGoldDisplay();
  } else {
    alert('Not enough gold to buy beer!');
  }
});

function updateGoldDisplay() {
  goldDisplay.textContent = `Gold: ${gold} | Dwarves: ${dwarfs} | Beers: ${beers}`;
}

function collectGold() {
  const availableBeers = Math.min(beers, dwarfs); // Ensure we only consume available beers
  gold += availableBeers; // Each dwarf produces one gold per beer consumed
  beers -= availableBeers; // Reduce the number of beers by the amount consumed
  updateGoldDisplay();
}

// Automatically collect gold every second
setInterval(collectGold, 1000);
