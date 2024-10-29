// Testing purposes
// function clickElementContinuously() {
//   const element = document.querySelector('#mainDuck');
//   setInterval(() => element.click(), 1);
// }

// clickElementContinuously();

const appContainer = document.getElementById("appContainer");
const mainDuck = document.getElementById("mainDuck");
const currentDucksContainer = document.getElementById("currentDucksContainer");
const debugClickButton = document.getElementById("debugClickButton");
// #region UPGRADES

const buyCursorButton = document.getElementById("buyCursorButton");
const cursorPriceElement = document.getElementById("cursorPriceElement");

const buyGrandpaButton = document.getElementById("buyGrandpaButton");
const grandpaPriceElement = document.getElementById("grandpaPriceElement");

const buyFarmButton = document.getElementById("buyFarmButton");
const farmPriceElement = document.getElementById("farmPriceElement");

const buyMouseUpgradeButton = document.getElementById("buyMouseUpgradeButton");
const mouseUpgradePriceElement = document.getElementById(
  "mouseUpgradePriceElement"
);

const cursorsBuildingContainer = document.getElementById(
  "cursorsBuildingContainer"
);
const grandpasBuildingContainer = document.getElementById(
  "grandpasBuildingContainer"
);
const farmsBuildingContainer = document.getElementById(
  "farmsBuildingContainer"
);

// #region RESOURCES

let currentDucks = 0;
let ducksPerClick = 1;
let ducksPerSecond = 0;

let mouseUpgradePrice = 500;
let mouseUpgradeBasePrice = 500;
let mouseUpgrades = 0;

let cursors = 0;
let cursorBasePrice = 100;
let cursorPrice = 100;

let grandpas = 0;
let grandpasBaseDucks = 5;
let grandpasDucks = 0;
let grandpaBasePrice = 300;
let grandpaPrice = 300;

let farms = 0;
let farmsBaseDucks = 10;
let farmsDucks = 0;
let farmBasePrice = 600;
let farmPrice = 600;

// #region RENDER TEXTS
cursorPriceElement.innerText = cursorPrice;
grandpaPriceElement.innerText = grandpaPrice;
farmPriceElement.innerText = farmPrice;
mouseUpgradePriceElement.innerText = `${mouseUpgradePrice}`;

const cuack = document.createElement("span");

const pCurrentDucks = document.createElement("p");
currentDucksContainer.appendChild(pCurrentDucks);

// #region FUNCTIONS
document.addEventListener("DOMContentLoaded", (event) => {
  function addDucksClick() {
    currentDucks += ducksPerClick;
    pCurrentDucks.innerHTML = `You have <strong>${currentDucks.toFixed()}</strong> ducks`;
  }
  // #region BUY FUNCTIONS
  function buyCursor() {
    if (currentDucks >= cursorPrice) {
      currentDucks -= cursorPrice;
      cursors++;
      cursorPrice = cursorBasePrice + (10 + cursors * 5) * cursors;
      cursorPriceElement.innerText = cursorPrice;
      cursorsBuildingContainer.innerText = `Cursors: ${cursors} generating ${
        ducksPerClick * cursors
      } ducks per second.`;
      console.log(`cursors: ${cursors} | cursor price: ${cursorPrice}`);
    }
  }

  function buyGrandpa() {
    if (currentDucks >= grandpaPrice) {
      currentDucks -= grandpaPrice;
      grandpas++;
      grandpaPrice = grandpaBasePrice + (20 + grandpas * 10) * grandpas;
      grandpasDucks = grandpasBaseDucks * Math.pow(1.50, grandpas);
      grandpaPriceElement.innerText = grandpaPrice;
      grandpasBuildingContainer.innerText = `Grandpas: ${grandpas} generating ${grandpasDucks.toFixed(
        2
      )} ducks per second.`;
      console.log(`Grandpas: ${grandpas} | Grandpa price: ${grandpaPrice}`);
    }
  }

  function buyFarm() {
    if (currentDucks >= farmPrice) {
      currentDucks -= farmPrice;
      farms++;
      farmPrice = farmBasePrice + (30 + farms * 20) * farms;
      farmsDucks = farmsBaseDucks * Math.pow(1.75, farms);
      farmPriceElement.innerText = farmPrice;
      farmsBuildingContainer.innerText = `Farms: ${farms} generating ${farmsDucks.toFixed(
        2
      )} ducks per second.`;
      console.log(`Farms: ${farms} | Farm price: ${farmPrice}`);
    }
  }

  function buyMouseUpgrade() {
    if (currentDucks >= mouseUpgradePrice) {
      currentDucks -= mouseUpgradePrice;
      mouseUpgrades++;
      mouseUpgradePrice =
        mouseUpgradeBasePrice + (60 + mouseUpgrades * 30) * mouseUpgrades;
      mouseUpgradePriceElement.innerText = `${mouseUpgradePrice} | Mouse upgrades: ${mouseUpgrades}% ducks per click `;
      ducksPerClick = ducksPerSecond * 0.01;
    }
  }
  // #region ADD DUCKS TO CURRENT DUCKS
  function addCursorsDucksToCurrentDucks() {
    currentDucks += cursors * ducksPerClick;
    pCurrentDucks.innerHTML = `You have <strong>${currentDucks.toFixed()}</strong> ducks`;
  }

  function addGrandpasDucksToCurrentDucks() {
    currentDucks += grandpasDucks;
    pCurrentDucks.innerHTML = `You have <strong>${currentDucks.toFixed()}</strong> ducks`;
  }
  function addFarmsDucksToCurrentDucks() {
    currentDucks += farmsDucks;
    pCurrentDucks.innerHTML = `You have <strong>${currentDucks.toFixed()}</strong> ducks`;
  }

  // #region MISC
  function clickElementContinuously() {
    const element = document.querySelector("#mainDuck");
    intervalId = setInterval(() => element.click(), 1);
  }

  function stopClicking() {
    clearInterval(intervalId);
  }

  setInterval(() => {
    addCursorsDucksToCurrentDucks();
    addGrandpasDucksToCurrentDucks();
    addFarmsDucksToCurrentDucks();
    document.title = `${currentDucks.toFixed()} ducks`;
    ducksPerSecond = grandpasDucks + farmsDucks + ducksPerClick;
  }, 1000);

  // #region EVENTS
  debugClickButton.addEventListener("mousedown", clickElementContinuously);
  debugClickButton.addEventListener("mouseup", stopClicking);
  debugClickButton.addEventListener("mouseleave", stopClicking);
  buyCursorButton.addEventListener("click", buyCursor);
  buyGrandpaButton.addEventListener("click", buyGrandpa);
  buyFarmButton.addEventListener("click", buyFarm);
  buyMouseUpgradeButton.addEventListener("click", buyMouseUpgrade);
  mainDuck.addEventListener("click", addDucksClick);
  mainDuck.addEventListener("mousedown", () => {
    mainDuck.classList.add("duck-clicked");
  });
  mainDuck.addEventListener("mouseup", () => {
    mainDuck.classList.remove("duck-clicked");
  });
});
