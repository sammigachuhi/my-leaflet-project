var map = L.map('myMap').setView([0.3556, 37.5833], 6.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

///////////////////////////////////////////////////////
var geoJsonUrl = "https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/selected_hospitals.json";

L.geoJson.ajax(geoJsonUrl, {
    //

    success: function (geoJSON) {
      // Create a heatmap layer and add the GeoJSON data to it
      var heatmapLayer = L.heatLayer(geoJSON.features.map(function (feature) {
        return [feature.geometry.coordinates[1], feature.geometry.coordinates[0]];
      }))
    }
  }).addTo(map);

heatmapLayer.setOptions({
    // Customize heatmap options here, such as radius, gradient, etc.
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
            }
});

heatmapLayer.addTo(map); // Add the heatmap layer to the map
  


