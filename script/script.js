// map
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var streets = L.tileLayer(mapboxUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});

var baseMaps = {
  "OpenStreetMap": osm,
  "Mapbox Streets": streets
};

var overlayMaps = {
  "Cities": cities
};

var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

let france = [46.2276, 2.2137];
let map = L.map("map",{scrollWheelZoom: false}).setView(france, 9);

var vineyardIcon = L.icon({
    iconURL: "../images/grape.png", 
    iconSize: [20,20]
}); 

const resultLayer = L.layerGroup();
resultLayer.addTo(map);

document.querySelector("#search-btn").addEventListener("click", async function () {

  resultLayer.clearLayers();

  const searchTerms = document.querySelector("#search-terms").value;
  const center = map.getBounds().getCenter();
  const ll = center.lat + "," + center.lng;
  const results = await loadData(searchTerms, ll, 2000);
  console.log(results)
  // plot markers
  for (let r of results.results) {
    const lat = r.geocodes.main.latitude;
    const lng = r.geocodes.main.longitude;
    const marker = L.marker([lat, lng],{icon:vineyardIcon});
    marker.addTo(resultLayer);
    marker.bindPopup(r.name)

    // search result under the search box
    let resultElement = document.createElement('div');
    resultElement.innerHTML = r.name;

    document.querySelector("#search-results").appendChild(resultElement)
  }
  // displaySearchResults(results.results, resultLayer, map);
});

// let loadData = () =>{
//     return allImages[Number(value)];
//   }

// loadData()

async function loadData(query, latLng, radius) {
  const response = await axios.get("https://api.foursquare.com/v3/places/search", {
    params: {
      query: query,
      ll: latLng,
      v: '20210903',
      radius: radius,
      limit: 10
    },
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3yTCwGoC10mQ96bmvqdlYrI2qhubC42VtmGXbfmaGOrs='
    }
  });
  return response.data;
}


// form
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // extract form data
  const formData = newFormData(form);

  console.log(Object.fromEntries(formData));

})




    
