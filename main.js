// https://leafletjs.com/reference.html

alert("Updated NPC system");

// 🗺️ Starta karta (Malmö)
const map = L.map("map").setView([55.5833, 13.0333], 15);

// 🌍 Karta
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Spelarens prick
let playerCircle = L.circle([55.5833, 13.0333], {
  radius: 10,
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.9
}).addTo(map);

// Accuracy-ring
let accuracyCircle = L.circle([55.5833, 13.0333], {
  radius: 0,
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.1
}).addTo(map);

// NPCs
const npcs = [
  {
    id: "ingrid",
    name: "Ingrid",
    coords: [55.5901, 12.9937],
    radius: 50,
    visited: false,
    color: "red",
    icon: "Images/Paperdoll/ingrid.png",
    paperdoll: "Images/Paperdoll/ingridNew.png",
    text: `Ingrid möter din blick utan att tveka, men hennes händer är knäppta hårt.<br><br>“Folk pratar för mycket… och lyssnar för lite. Ibland är sanningen farligare än lögnen.”`
  },
  {
    id: "gustaf",
    name: "Gustaf",
    coords: [55.5900, 12.9967],
    radius: 50,
    visited: false,
    color: "gold",
    icon: "Images/Paperdoll/gustaf.png",
    paperdoll: "Images/Paperdoll/gustavNew.png",
    text: `Gustaf står stilla, med en blick som väger varje ord du säger.<br><br>“Det som hände var ingen olycka. Någon såg till att det blev så… frågan är vem som tjänar på det.”`
  },
  {
    id: "august",
    name: "August",
    coords: [55.5883, 12.9929],
    radius: 50,
    visited: false,
    color: "blue",
    icon: "Images/Paperdoll/August.png",
    paperdoll: "Images/Paperdoll/augustNew.png",
    text: `August lutar sig lätt tillbaka, som om han redan vet mer än han säger.<br><br>“Alla spelar ett spel här… vissa är bara bättre på att dölja reglerna.”`
  },
  {
    id: "doris",
    name: "Doris",
    coords: [55.6057, 13.0013],
    radius: 50,
    visited: false,
    color: "purple",
    icon: "Images/Paperdoll/doris.png",
    paperdoll: "Images/Paperdoll/dorisNew.png",
    text: `Doris ser nervös ut, som att hon bär på en hemlighet.<br><br>“Jag såg något vid vattnet den morgonen... något som inte borde varit där.”`
  }
];

// =====================
// NPC STATE
// =====================

let currentNPCIndex = 0;
let currentMarker = null;

// Visa aktuell NPC
function showCurrentNPC() {
  const npc = npcs[currentNPCIndex];

  const icon = L.divIcon({
    className: "",
    html: `
      <div class="npc-wrapper ${npc.id}" style="--npc-color: ${npc.color}">
        <img src="${npc.icon}" />
      </div>
    `,
    iconSize: [70, 70],
    iconAnchor: [35, 35]
  });

  currentMarker = L.marker(npc.coords, { icon })
    .addTo(map)
    .bindPopup(npc.name);
}

// Starta med första NPC
showCurrentNPC();

// =====================
//  DIALOG SYSTEM
// =====================

let typingInterval;
let isTyping = false;
let currentText = "";

function typeWriter(text, element, speed = 25) {
  clearInterval(typingInterval);

  element.innerHTML = "";
  currentText = text;
  isTyping = true;

  let i = 0;

  typingInterval = setInterval(() => {
    element.innerHTML = text.slice(0, i);
    i++;

    if (i > text.length) {
      clearInterval(typingInterval);
      isTyping = false;
      buttons.style.visibility = "visible";
    }
  }, speed);
}

const dialogBox = document.getElementById("dialogBox");
const nameEl = document.getElementById("name");
const dialogEl = document.getElementById("dialog");
const buttons = document.getElementById("buttons");
const paperdollContainer = document.querySelector("#paperdollImage");
const paperdoll = document.querySelector("#paperdollImage img");

function showNPCDialog(npc) {
  dialogBox.style.display = "flex";
  nameEl.textContent = npc.name;
  paperdoll.src = npc.paperdoll;
  paperdollContainer.className = npc.name;

  buttons.style.visibility = "hidden";

  typeWriter(npc.text, dialogEl);
}

// =====================
// DISTANCE CHECK
// =====================

function checkDistance(playerPos) {
  const npc = npcs[currentNPCIndex];
  const dist = map.distance(playerPos, npc.coords);

  if (dist < npc.radius && !npc.visited) {
    npc.visited = true;
    showNPCDialog(npc);
  }
}

// =====================
// GPS
// =====================

navigator.geolocation.watchPosition(
  pos => {
    const playerPos = [pos.coords.latitude, pos.coords.longitude];

    playerCircle.setLatLng(playerPos);
    accuracyCircle.setLatLng(playerPos);
    accuracyCircle.setRadius(pos.coords.accuracy);

    checkDistance(playerPos);
  },
  () => alert("GPS fungerar inte – testa på mobil!"),
  { enableHighAccuracy: true }
);

// =====================
// DIALOG INTERACTION
// =====================

dialogBox.addEventListener("click", () => {
  if (!isTyping) return;

  clearInterval(typingInterval);
  dialogEl.innerHTML = currentText;
  isTyping = false;

  buttons.style.visibility = "visible";
});

// =====================
//  NEXT NPC
// =====================

function nextNPC() {
  // Ta bort nuvarande NPC
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }

  dialogBox.style.display = "none";

  currentNPCIndex++;

  if (currentNPCIndex < npcs.length) {
    showCurrentNPC();
  } else {
    console.log("Alla NPC klara!");
  }
}

// =====================
// TEST NPC
// =====================

function testNPC(id) {
  const npc = npcs.find(n => n.id === id);

  if (!npc) {
    console.warn("NPC not found:", id);
    return;
  }

  showNPCDialog(npc);
}

// =====================
// PRATA-KNAPP
// =====================

const talkButton = document.getElementById("talk_doris");

if (talkButton) {
  talkButton.addEventListener("click", () => {
    nextNPC();
  });
}

//SKA NU MERGA FÖRSÖKA BYGGA OM