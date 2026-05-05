// https://leafletjs.com/reference.html

const map = L.map("map").setView([55.5833, 13.0333], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Spelarens position
let playerCircle = L.circle([55.5833, 13.0333], {
  radius: 10,
  color: "blue",
  fillColor: "blue",
  fillOpacity: 0.9
}).addTo(map);

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
    text: "Ingrid möter din blick utan att tveka..."
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
    text: "Gustaf står stilla..."
  }
];

// STATE
let currentNPCIndex = 0;
let currentMarker = null;

// Visa NPC
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

// Dialog UI
const dialogBox = document.getElementById("dialogBox");
const nameEl = document.getElementById("name");
const dialogEl = document.getElementById("dialog");
const paperdoll = document.querySelector("#paperdollImage img");

// Visa dialog
function showNPCDialog(npc) {
  dialogBox.style.display = "flex";
  nameEl.textContent = npc.name;
  dialogEl.textContent = npc.text;
  paperdoll.src = npc.paperdoll;
}

// Distance check
function checkDistance(playerPos) {
  const npc = npcs[currentNPCIndex];
  const dist = map.distance(playerPos, npc.coords);

  if (dist < npc.radius && !npc.visited) {
    npc.visited = true;
    showNPCDialog(npc);
  }
}

// GPS
navigator.geolocation.watchPosition(
  pos => {
    const playerPos = [pos.coords.latitude, pos.coords.longitude];

    playerCircle.setLatLng(playerPos);
    accuracyCircle.setLatLng(playerPos);
    accuracyCircle.setRadius(pos.coords.accuracy);

    checkDistance(playerPos);
  },
  () => alert("GPS fungerar inte"),
  { enableHighAccuracy: true }
);

// Nästa NPC
function nextNPC() {
  if (currentMarker) map.removeLayer(currentMarker);

  dialogBox.style.display = "none";

  currentNPCIndex++;

  if (currentNPCIndex < npcs.length) {
    showCurrentNPC();
  }
}

// Prata-knapp
document.querySelector(".talk").addEventListener("click", () => {
  nextNPC();
});