
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var cyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}); // the CyclOSM tile layer available from Leaflet servers

var map = L.map('myMap', {
    layers: [osm, cyclOSM]
}).setView([-1.295287148, 36.81984753], 7);

//// Adding some color
function getColor(d) {
    return d > 20 ? '#3288bd' :
            d > 10 ? '#99d594' :
            d > 6 ? '#e6f598' :
            d > 4 ? '#fee08b' :
            d >  2 ? '#fc8d59':
                     '#d53e4f';
                       
}

// Function for setting color (using arrow function)
var style = ((feature)=> {
    return {
        fillColor: getColor(feature.properties.Human_waste_disposal),
        weight: 2,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.9
    }
})

// Adding the first overlay - map of household access to main sewer
var countySanitation = new L.geoJson.ajax("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/counties_sanitation.json", {
    style: style
})
.bindPopup(function (layer) {
            return `<b>County Name: </b> ${layer.feature.properties.ADM1_EN} <br>
            <b>Total County Population: </b><br> 
            ${layer.feature.properties.County_pop.toString()} <br><br>
            <b>% of Conventional Households with access to main sewer: </b><br><br>
            ${layer.feature.properties.Human_waste_disposal.toString()}`
        }).addTo(map);

// Create a legend
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 2, 4, 6, 10, 20],
    labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' + 
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
}

legend.addTo(map);

// Color icons
// Yellow Icon
var yellowIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// Orange Icon
var orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

// Red Icon
var redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


var cities = L.geoJson.ajax("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson2.geojson.txt", {
    pointToLayer: function (feature, latlng) {
            if (feature.properties.Population <= 250000) {
              return L.marker(latlng, {
                icon: yellowIcon 
              });
            } else if (feature.properties.Population <= 800000) {
              return L.marker(latlng, {
                icon: orangeIcon 
              });
            } else {
              return L.marker(latlng, {
                icon: redIcon 
              });
            }
            
          }
}).bindPopup(function (layer) {
      return `City: ${layer.feature.properties.City},<br>
      Population: ${layer.feature.properties.Population}`;
    }).addTo(map);

// Set object for the basemaps
var basemaps = {
    "OpenStreetMap": osm,
    'cycleOsm': cyclOSM,
}

// Set object for the overlay maps
var overlays = {
    'countySanitation': countySanitation,
    'cities': cities
}

// Add layer controls
L.control.layers(basemaps, overlays).addTo(map);

// Add scale
L.control.scale({position:'bottomleft'}).addTo(map);

















