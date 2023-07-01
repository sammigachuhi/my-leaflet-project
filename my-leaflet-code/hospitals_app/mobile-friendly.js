
// Basemaps
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var cyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
	maxZoom: 20,
	attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}); // the CyclOSM tile layer available from Leaflet servers

// Add the Leaflet basemaps
var map = L.map('myMap', {
    layers: [osm, cyclOSM]
}).setView([-1.295287148, 36.81984753], 7);

// Add hospital dataset

url = 'https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/selected_hospitals.json'

///////////

// var markers = L.markerClusterGroup();
// const geojsonGroup = L.geoJson.ajax(url, {
//     onEachFeature : function(feature, layer){
//         var popupContent =  '<h4 class = "text-primary">Street Light</h4>' +
//                             '<div class="container"><table class="table table-striped">' +
//                             '<thead><tr><th>Properties</th><th>Value</th></tr></thead>' +
//                             '<tbody><tr><td> Facility Name </td><td>'+ feature.properties.Facility_N +'</td></tr>' +
//                             '<tr><td>Type </td><td>' + feature.properties.Type +'</td></tr>' 
//         layer.bindPopup(popupContent)
//     },
//     pointToLayer: function (feature, latlng) {
//         return L.circleMarker(latlng);
//     }
// });
// markers.addLayer(geojsonGroup);
// map.addLayer(markers);

//////////////////////////////////////////

// var markers = L.markerClusterGroup();

var cluster = fetch(url)
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        var markers = L.markerClusterGroup();

        var geojsonGroup = L.geoJSON(data, {
            onEachFeature : function(feature, layer){
                var popupContent =  `<b>Facility Name:</b> ${feature.properties.Facility_N} <br>
                <b>Type:</b> ${feature.properties.Type}`;
                layer.bindPopup(popupContent)
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            }
        });

        markers.addLayer(geojsonGroup);
        map.addLayer(markers);

    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })
// markers.addLayer(geojsonGroup);
// map.addLayer(markers);

// Set object for the basemaps
var basemaps = {
    "OpenStreetMap": osm,
    'cycleOsm': cyclOSM,
}

// Set object for the overlay maps
// var overlays = {
//     'Hospitals': cluster
// }

// Add layer controls
L.control.layers(basemaps).addTo(map);

// Add scale
L.control.scale({position:'bottomleft'}).addTo(map);

// Zoom to your location
map.locate({setView: true, maxZoom: 16});

// Add marker at your location
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + Number((radius/1000).toFixed(2)) + " kilometers from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);

// Error displayed after finding location failed
function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);






















