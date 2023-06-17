const apiKey = "AAPK2ebf5b4cecc748e0b3b63c07e5136eefdqTFQtnVgwj1BzXnXzlhfkDvDq9wBRXvPV402956sglVQeXpKLUAFbT5XobTbE-M";
// const basemapEnum = "ArcGIS:Streets";
const basemapEnum = "ArcGIS:Navigation";

const map = L.map("myMap", {
    minZoom: 2
}).setView([0.3556, 37.5833], 6.5);



L.esri.Vector.vectorBasemapLayer(basemapEnum, {
    apiKey: apiKey,
}).addTo(map);

// L.esri.tiledMapLayer({
//     url:"https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer",
//     apiKey: apiKey,

//     opacity:0.2

// }).addTo(map);

// map.getPane("tilePane").style.zIndex = 800;

// L.esri.RasterLayer({
//     f: "data\settlement\hrsl_ken_settlement.tif",
//     opacity: 0.3,
//     position: 'front',
//     apiKey: apiKey
// }).addTo(map)


// Geocode search service
const searchControl = L.esri.Geocoding.geosearch({
    position: "topright",
    placeholder: "Enter an address or place e.g. 1 York St",
    useMapBounds: false,

    // Add provider
    providers: [
        L.esri.Geocoding.arcgisOnlineProvider({
          apikey: apiKey,
          nearby: {
            lat: 0.3556,
            lng: 37.5833
          }
        })
      ]

  }).addTo(map);

const results = L.layerGroup().addTo(map);

searchControl.on("results", (data) => {
    results.clearLayers();

    for (let i = data.results.length - 1; i >= 0; i--) {
        const marker = L.marker(data.results[i].latlng);

        const lngLatString = `${Math.round(data.results[i].latlng.lng * 100000) / 100000}, ${
            Math.round(data.results[i].latlng.lat * 100000) / 100000
          }`;
          marker.bindPopup(`<b>${lngLatString}</b><p>${data.results[i].properties.LongLabel}</p>`);

        results.addLayer(marker);

        marker.openPopup();

      }

  });


































