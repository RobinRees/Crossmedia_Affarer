// 🗺️ Starta karta (Malmö)
const map = L.map("map").setView([55.5833, 13.0333], 15);

// 🌍 OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// 🧍 NPC
const npc = {
  name: "Gustaf",
  coords: [55.5838, 13.034],
  radius: 50,
  visited: false,
};

// Visa NPC på kartan
L.marker(npc.coords).addTo(map).bindPopup("NPC: Gustaf");

// 📏 Kolla avstånd
function checkDistance(playerPos) {
  const dist = map.distance(playerPos, npc.coords);

  if (dist < npc.radius && !npc.visited) {
    npc.visited = true;
    alert("Du möter Gustaf!");
  }
}

// 📡 GPS
navigator.geolocation.watchPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    const playerPos = [lat, lng];

    L.marker(playerPos).addTo(map).bindPopup("Du är här");

    checkDistance(playerPos);
  },
  (error) => {
    alert("GPS fungerar inte, testa på mobil!");
  },
);
