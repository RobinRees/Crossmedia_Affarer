// https://leafletjs.com/reference.html

alert("123")

// 🗺️ Starta karta (Malmö)
const map = L.map("map").setView([55.5833, 13.0333], 15);

// 🌍 Mörk karta (snyggare för spel)
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

// 🧍 NPC (Doris)
const npc = {
  name: "Doris",
  coords: [55.608856865560334, 12.994557023048403],
  radius: 50,
  visited: false
};

// 🖼️ Rund NPC ikon
const dorisIcon = L.divIcon({
  className: "",
  html: `
    <div class="npc-wrapper">
      <img src="doris.png" />
    </div>
  `,
  iconSize: [70, 70],
  iconAnchor: [35, 35]
});

// Lägg ut Doris på kartan
L.marker(npc.coords, { icon: dorisIcon })
  .addTo(map)
  .bindPopup("Doris är här");

// 📏 Kolla avstånd
function checkDistance(playerPos) {
  const dist = map.distance(playerPos, npc.coords);

  if (dist < npc.radius && !npc.visited) {
    npc.visited = true;
    alert("Du möter Doris!");
    // Här kommer funktioner triggas för att prata med Doris specefikt. Vi kommer skapa
    // UI osv i andra funktioner. 
  }
}

// 📡 GPS tracking
navigator.geolocation.watchPosition(
  (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    const playerPos = [lat, lng];

    // 🔄 Uppdatera spelare
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

// 🧪 Klicka på kartan för koordinater (debug)
map.on("click", function (e) {
  console.log(e.latlng);
});