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

// =====================
// NPCs
// =====================

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
    text: `Ingrid möter din blick utan att tveka, men hennes händer är knäppta hårt.<br><br>“Folk pratar för mycket… och lyssnar för lite. Ibland är sanningen farligare än lögnen.”`,
    dialog: dialogIngrid
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
    text: `Gustaf står stilla, med en blick som väger varje ord du säger.<br><br>“Det som hände var ingen olycka. Någon såg till att det blev så… frågan är vem som tjänar på det.”`,
    dialog: dialogGustaf
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
    text: `August lutar sig lätt tillbaka, som om han redan vet mer än han säger.<br><br>“Alla spelar ett spel här… vissa är bara bättre på att dölja reglerna.”`,
    dialog: dialogAugust
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
    text: `Doris ser nervös ut, som att hon bär på en hemlighet.<br><br>“Jag såg något vid vattnet den morgonen... något som inte borde varit där.”`,
    dialog: dialogDoris
  }
];

// =====================
// NPC STATE
// =====================

let currentNPCIndex = 0;
let currentMarker = null;
let activeNPC = null;

// =====================
// Visa NPC
// =====================

function showCurrentNPC() {
  const npc = npcs[currentNPCIndex];

  const icon = L.divIcon({
    className: "",
    html: `
      <div class="npc-wrapper ${npc.id}">
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

showCurrentNPC();

// =====================
// INTRO DIALOG (lilla rutan)
// =====================

let typingInterval;
let isTyping = false;
let currentText = "";

function typeWriter(text, element, speed = 25) {

  // resetta allt först
  clearInterval(typingInterval);

  isTyping = true;
  currentText = text;

  element.innerHTML = "";

  let i = 0;

  typingInterval = setInterval(() => {

    element.innerHTML = text.substring(0, i);

    i++;

    if (i > text.length) {

      clearInterval(typingInterval);

      element.innerHTML = text;

      isTyping = false;

      // bara intro-dialogen använder buttons
      if (buttons && dialogBox.style.display === "flex") {
        buttons.style.visibility = "visible";
      }
    }

  }, speed);
}

const dialogBox = document.getElementById("dialogBox");
const nameEl = document.getElementById("name");
const dialogEl = document.getElementById("dialog");
const buttons = document.getElementById("buttons");
const paperdoll = document.querySelector("#paperdollImage img");

function showNPCDialog(npc) {
  activeNPC = npc;

  dialogBox.style.display = "flex";
  nameEl.textContent = npc.name;
  paperdoll.src = npc.paperdoll;

  buttons.style.visibility = "hidden";
  typeWriter(npc.text, dialogEl);
}

// =====================
// DISTANCE
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
// SKIP TYPING
// =====================

dialogBox.addEventListener("click", () => {
  if (!isTyping) return;

  clearInterval(typingInterval);
  dialogEl.innerHTML = currentText;
  isTyping = false;

  buttons.style.visibility = "visible";
});

// =====================
// NEXT NPC
// =====================

function nextNPC() {
  if (currentMarker) map.removeLayer(currentMarker);

  dialogBox.style.display = "none";

  currentNPCIndex++;

  if (currentNPCIndex < npcs.length) {
    showCurrentNPC();
  }
}

// =====================
// PRATA-KNAPP
// =====================

const talkButton = document.querySelector(".talk");

talkButton.addEventListener("click", () => {
  if (!activeNPC) return;

  const npc = activeNPC;

  dialogBox.style.display = "none";
  document.getElementById("conversation").style.display = "flex";

  // rätt bild + namn
  conversationImage.src = npc.icon;
  conversationName.textContent = npc.name;

  startConversation(npc.dialog);
});

// =====================
// CONVERSATION SYSTEM
// =====================

let currentIndex = 0;
let activeDialog = [];

const dialogNameEl = document.getElementById("dialogName");
const dialogTextEl = document.getElementById("dialogText");
const continueBtn = document.getElementById("conversationContinue");
const kartaBtn = document.getElementById("conversationKarta");
const conversationImage = document.getElementById("conversationImage");
const conversationName = document.getElementById("conversationName");

function startConversation(dialog) {

  // stoppa gammal typing
  clearInterval(typingInterval);
  isTyping = false;

  activeDialog = dialog;
  currentIndex = 0;

  continueBtn.style.display = "block";

  // 🔥 förhindra instant click från samma touch
  continueBtn.style.pointerEvents = "none";

  setTimeout(() => {
    continueBtn.style.pointerEvents = "auto";
  }, 300);

  if (kartaBtn) {
    kartaBtn.style.display = "none";
  }

  // koppla NPC → UI
  if (activeNPC) {
    conversationImage.src = activeNPC.icon;
    conversationName.textContent = activeNPC.name;
  }

  updateDialog();
}

function updateDialog() {
  const current = activeDialog[currentIndex];
  if (!current) return;

  dialogNameEl.textContent =
    current.type === "info" ? "" : current.name;

  // typewriter även i conversation
  setTimeout(() => {
    typeWriter(current.line, dialogTextEl, 32);
  }, 10);
}

// =====================
// FORTSÄTT
// =====================

continueBtn.addEventListener("click", () => {

  // om text fortfarande skrivs → visa hela direkt
  if (isTyping) {
    clearInterval(typingInterval);

    dialogTextEl.innerHTML = currentText;

    isTyping = false;
    return;
  }

  currentIndex++;

  if (currentIndex >= activeDialog.length) {

    continueBtn.style.display = "none";

    if (kartaBtn) {
      kartaBtn.style.display = "block";
    } else {
      document.getElementById("conversation").style.display = "none";
      nextNPC();
    }

    return;
  }

  updateDialog();
});

// =====================
// TILLBAKA TILL KARTA
// =====================

if (kartaBtn) {
  kartaBtn.addEventListener("click", () => {
    document.getElementById("conversation").style.display = "none";
    kartaBtn.style.display = "none";
    nextNPC();
  });
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

  // sätt som aktiv NPC
  activeNPC = npc;

  // visa lilla dialogrutan
  showNPCDialog(npc);
}