let france = [46.2276, 2.2137];
let map = L.map("map",{scrollWheelZoom: false}).setView(france, 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw' //demo access token
}).addTo(map);

var vineyardIcon = L.icon({
    iconURL: "../images/grape.png", 
    iconSize: [20,20]
}); 

loadData();

async function loadData() {
    // important: axios.get requires a URL
    let response = await axios.get("wine.geojson");

    // display the content of the geojson file on the map
    // response.data holds the actual data from the geojson file
    // the second paramter of L.geoJson is a configuration object
    const wineLayer = L.geoJson(response.data, {
        // onEachFeature is a fixed function name from Leaflet
        // it is called for each feature in response.data
        onEachFeature: function(feature, layer) {
            // feature paramter to the data of the feature
            console.log(feature);

            // layer parameter is the shape, line or marker etc. that will be added to the map
            layer.bindPopup(feature.properties.Description);
        }
    })

    // add the wine region layer to the map
    wineLayer.addTo(map);

    wineLayer.setStyle({
        color: 'red'
    })
}   


    
