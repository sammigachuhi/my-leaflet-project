var map = L.map('myMap').setView([-1.295287148, 36.81984753], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


url = 'https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/selected_hospitals.json'

// L.geoJson.ajax(url).addTo(map);

// var markers = L.markerClusterGroup();

// L.geoJson.ajax(url, {
//     pointToLayer: ((feature, latLng) => {
//         return markers.addLayer(L.circleMarker(latLng));
//     }),

//     onEachFeature: ((feature, layer) => {
//         layer.bindPopup(`<b>Facility Name:</b> ${feature.properties.Facility_N} <br>
//         <b>Type:</b> ${feature.properties.Type}`)
//     })
// }).addTo(map);

// //... Add more layers ...

// map.addLayer(markers);

/////////////////
// fetch(url)
//     .then((response) =>{
//         return response.json()
//     })
//     .then((data) => {
//         var markers = L.markerClusterGroup();

//         var geojsonGroup = L.geoJSON(data, {
//             onEachFeature : function(feature, layer){
//                 layer.bindPopup(`<b>Facility Name:</b> ${feature.properties.Facility_N} <br>
//                 <b>Type:</b> ${feature.properties.Type}`);
//             },
//             pointToLayer: function (feature, latlng) {
//                 return L.circleMarker(latlng);
//             }
//         });

//         markers.addLayer(geojsonGroup);
//         map.addLayer(markers);

//     })
//     .catch((error) => {
//         console.log(`This is the error: ${error}`)
//     })

/////// Added `mouseover` event

fetch(url)
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        var markers = L.markerClusterGroup({chunkedLoading: true}); // Splits the add layers to small intervals to prevent page freezing

        var geojsonGroup = L.geoJSON(data, {
            onEachFeature : function(feature, layer){
                layer.bindPopup(`<b>Facility Name:</b> ${feature.properties.Facility_N} <br>
                <b>Type:</b> ${feature.properties.Type}`);
            },
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng).on('mouseover', function(){
                    this.bindPopup(`Nearest_Center: ${feature.properties.Nearest_To}`).openPopup(); // Add mouseover event
                });
            }
        });

        markers.addLayer(geojsonGroup);
        map.addLayer(markers);

    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })


























