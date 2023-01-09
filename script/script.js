var franceMap = L.map('map').setView([46.2276, 2.2137], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// script
const element = document.getElementById("welcome-btn");
    element.addEventListener("click", function(){
    document.getElementById("frenchWines").innerHTML = "Discover the wines across France";
});

    
