// https://leafletjs.com/reference.html

alert("Updated NPC system");

// 🗺️ Starta karta (Malmö)
const map = L.map("map").setView([55.5833, 13.0333], 15);

// 🌍 Karta
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 🔵 Spelarens prick
let playerCircle = L.circle([55.5833, 13.0333], {
  radius: 10,
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.9
}).addTo(map);

// 🔵 Accuracy-ring
let accuracyCircle = L.circle([55.5833, 13.0333], {
  radius: 0,
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.1
}).addTo(map);

// 🧍 NPCs
const npcs = [
  {
    id: "doris",
    name: "Doris",
    coords: [55.608856865560334, 12.994557023048403],
    radius: 50,
    visited: false,

    icon: "Images/Paperdoll/Doris.png",          
    paperdoll: "Images/Paperdoll/dorisNew.png", 

    text: `Doris ser nervös ut, som att hon bär på en hemlighet.<br><br>“Jag såg något vid vattnet den morgonen... något som inte borde varit där.”`
  },

  {
    id: "ingrid",
    name: "Ingrid",
    coords: [55.6095, 12.9955],
    radius: 50,
    visited: false,

    icon: "Images/Paperdoll/Ingrid.png",
    paperdoll: "Images/Paperdoll/ingridNew.png",

    text: `Ingrid möter din blick utan att tveka, men hennes händer är knäppta hårt.<br><br>“Folk pratar för mycket… och lyssnar för lite. Ibland är sanningen farligare än lögnen.”`
  },

  {
    id: "gustaf",
    name: "Gustaf",
    coords: [55.6075, 12.9935],
    radius: 50,
    visited: false,

    icon: "Images/Paperdoll/Gustaf.png",
    paperdoll: "Images/Paperdoll/gustavNew.png",

    text: `Gustaf står stilla, med en blick som väger varje ord du säger.<br><br>“Det som hände var ingen olycka. Någon såg till att det blev så… frågan är vem som tjänar på det.”`
  },

  {
    id: "august",
    name: "August",
    coords: [55.6065, 12.9925],
    radius: 50,
    visited: false,

    icon: "Images/Paperdoll/August.png",
    paperdoll: "Images/Paperdoll/augustNew.png",

    text: `August lutar sig lätt tillbaka, som om han redan vet mer än han säger.<br><br>“Alla spelar ett spel här… vissa är bara bättre på att dölja reglerna.”`
  }
];
//
// 
npcs.forEach(npc => {
  const icon = L.divIcon({
    className: "",
    html: `
      <div class="npc-wrapper">
        <img src="${npc.icon}" />
      </div>
    `,
    iconSize: [70, 70],
    iconAnchor: [35, 35]
  });

  L.marker(npc.coords, { icon })
    .addTo(map)
    .bindPopup(npc.name);
});


let typingInterval;
let isTyping = false;
let currentText = "";

// Skriv ut text
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

// Dialog
const dialogBox = document.getElementById("dialogBox");
const nameEl = document.getElementById("name");
const dialogEl = document.getElementById("dialog");
const buttons = document.getElementById("buttons");
const paperdollContainer = document.querySelector("#paperdollImage")
const paperdoll = document.querySelector("#paperdollImage img");


function showNPCDialog(npc) {
  dialogBox.style.display = "flex";
  nameEl.textContent = npc.name;
  paperdoll.src = npc.paperdoll;
  paperdollContainer.className = npc.name;

  buttons.style.visibility = "hidden";

  typeWriter(npc.text, dialogEl);
}

// Distance check
function checkDistance(playerPos) {
  npcs.forEach(npc => {
    const dist = map.distance(playerPos, npc.coords);

    if (dist < npc.radius && !npc.visited) {
      npc.visited = true;
      showNPCDialog(npc);
    }
  });
}

// ´hps
navigator.geolocation.watchPosition(
  pos => {
    const playerPos = [pos.coords.latitude, pos.coords.longitude];

    playerCircle.setLatLng(playerPos);
    accuracyCircle.setLatLng(playerPos);
    accuracyCircle.setRadius(pos.coords.accuracy);

    map.panTo(playerPos);
    checkDistance(playerPos);
  },
  () => alert("GPS fungerar inte – testa på mobil!"),
  { enableHighAccuracy: true }
);

//  tryck för att skippa.
dialogBox.addEventListener("click", () => {
  if (!isTyping) return;

  clearInterval(typingInterval);
  dialogEl.innerHTML = currentText;
  isTyping = false;

  buttons.style.visibility = "visible";
});

// Test Skriv testNPC("doris")
function testNPC(id) {
  const npc = npcs.find(n => n.id === id);
  if (npc) showNPCDialog(npc);
}