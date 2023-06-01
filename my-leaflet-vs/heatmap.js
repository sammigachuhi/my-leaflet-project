var map = L.map('myMap').setView([0.3556, 37.5833], 6.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

///////////////////////////////////////////////////////

var geoJsonUrl = "https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/selected_hospitals.json"

    var geojsonLayer = $.ajax({
    url : geoJsonUrl,
    dataType : 'json',
    jsonpCallback: 'getJson',
    success : console.log("Data successfully loaded!"),
    });

geoJson2heat = ((geojson) => {
        return geojson.features.map(function(feature) {
        return [parseFloat(feature.geometry.coordinates[1]), 
                parseFloat(feature.geometry.coordinates[0])];
        });
        });



$.when(geojsonLayer).done(function() {
        // var kill = L.geoJSON(geojsonLayer.responseJSON);
        var layer = geoJson2heat(geojsonLayer.responseJSON, 4);
        var heatMap = L.heatLayer(layer, { 
                radius: 40,
                blur: 10, 
                gradient: {
                        '0': 'Navy', '0.25': 'Navy',
                        '0.26': 'Green',
                        '0.5': 'Green',
                        '0.51': 'Yellow',
                        '0.75': 'Yellow',
                        '0.76': 'Red',
                        '1': 'Red'
                      },
                maxZoom: 13});
        map.addLayer(heatMap);
        });










  


