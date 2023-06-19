// var cities = {
//     "type": "FeatureCollection",
//     "features": [
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Nairobi",
//           "Population": "4, 300, 000"
//         },
//         "geometry": {
//           "coordinates": [
//             36.8198475311531,
//             -1.2952871483350066
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Kisumu",
//           "Population": "610, 082"
//         },
//         "geometry": {
//           "coordinates": [
//             34.74657469430895,
//             -0.10402992528247523
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Mombasa",
//           "Population": "1, 440, 000"
//         },
//         "geometry": {
//           "coordinates": [
//             39.66358575335434,
//             -4.041883912902392
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Nakuru",
//           "Population": "422, 000"
//         },
//         "geometry": {
//           "coordinates": [
//             36.06412271026528,
//             -0.2754534004690896
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Nyeri",
//           "Population": "759, 164"
//         },
//         "geometry": {
//           "coordinates": [
//             36.957036675396154,
//             -0.42345404217887506
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Machakos",
//           "Population": "1, 422, 000"
//         },
//         "geometry": {
//           "coordinates": [
//             37.25780808801821,
//             -1.518874011494134
//           ],
//           "type": "Point"
//         }
//       },
//       {
//         "type": "Feature",
//         "properties": {
//           "City": "Malindi",
//           "Population": "119, 859"
//         },
//         "geometry": {
//           "coordinates": [
//             40.10521499751357,
//             -3.2138767356491655
//           ],
//           "type": "Point"
//         }
//       }
//     ]
//   }


var map = L.map('myMap').setView([-1.295287148, 36.81984753], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// L.geoJSON(cities).bindPopup(function (layer) {
//     return layer.feature.properties.City;
// }).addTo(map);

// Use ajax to load geojson files
// var geojsonLayer = new L.geoJson.ajax("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson.geojson")
//     .bindPopup(function (layer) {
//         return layer.feature.properties.City;
//     }).addTo(map);

// Use Fetch API to load geojson files

// fetch("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson.geojson")
//     .then(function(response) {
//         return response.json()
//     })
//     .then(function(data) {
//         L.geoJson(data).addTo(map);
//     })
//     .catch(function(error) {
//         console.log(`This is the error: ${error}`)
//     })

fetch("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson.geojson")
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        L.geoJson(data).bindPopup((layer) => {
            return `City: ${layer.feature.properties.City},<br>
            Population: ${layer.feature.properties.Population}`}).addTo(map);
    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })


























