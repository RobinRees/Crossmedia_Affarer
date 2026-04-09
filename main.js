alert("ny Version 123")

// 🗺️ Starta karta (Malmö)
const map = L.map("map").setView([55.5833, 13.0333], 15);

// 🌍 OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

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

// 🧍 NPC
const npc = {
  name: "Gustaf",
  coords: [55.5838, 13.0340],
  radius: 50,
  visited: false
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

// 📡 GPS tracking
navigator.geolocation.watchPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    const playerPos = [lat, lng];

    // 🔄 Uppdatera position
    playerCircle.setLatLng(playerPos);
    accuracyCircle.setLatLng(playerPos);
    accuracyCircle.setRadius(accuracy);

    // 🗺️ Följ spelaren
    map.panTo(playerPos);

    checkDistance(playerPos);
  },
  (error) => {
    alert("GPS fungerar inte – testa på mobil!");
  },
  {
    enableHighAccuracy: true
  }
);

map.on("click", function (e) {
  console.log("Koordinater:", e.latlng);
  alert(`Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`);
});