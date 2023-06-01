var map = L.map('myMap').setView([-1.295287148, 36.81984753], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var cities = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "City": "Nairobi",
          "Population": 4300000
        },
        "geometry": {
          "coordinates": [
            36.8198475311531,
            -1.2952871483350066
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Kisumu",
          "Population": 610082
        },
        "geometry": {
          "coordinates": [
            34.74657469430895,
            -0.10402992528247523
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Mombasa",
          "Population": 1440000
        },
        "geometry": {
          "coordinates": [
            39.66358575335434,
            -4.041883912902392
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Nakuru",
          "Population": 422000
        },
        "geometry": {
          "coordinates": [
            36.06412271026528,
            -0.2754534004690896
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Nyeri",
          "Population": 759164
        },
        "geometry": {
          "coordinates": [
            36.957036675396154,
            -0.42345404217887506
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Machakos",
          "Population": 1422000
        },
        "geometry": {
          "coordinates": [
            37.25780808801821,
            -1.518874011494134
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "City": "Malindi",
          "Population": 119859
        },
        "geometry": {
          "coordinates": [
            40.10521499751357,
            -3.2138767356491655
          ],
          "type": "Point"
        }
      }
    ]
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////
fetch("https://raw.githubusercontent.com/sammigachuhi/geojson_files/main/cities-geojson2.geojson.txt")
    .then((response) =>{
        return response.json()
    })
    .then((data) => {
        L.geoJson(data, {
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
        }).bindPopup((layer) => {
            return `City: ${layer.feature.properties.City},<br>
            Population: ${layer.feature.properties.Population}`}).addTo(map);
    })
    .catch((error) => {
        console.log(`This is the error: ${error}`)
    })



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

// The below worked
// L.geoJSON(cities, {
//     pointToLayer(feature, latlng) {
//         return L.marker(latlng, {icon: yellowIcon});
//     },

// }).bindPopup(function (layer) {
//     return layer.feature.properties.City;
// }).addTo(map);

// function onEachFeature (feature, layer) {
//         if (feature.properties.Population <= 250000) {
//             return L.circleMarker(latlng, {
//                 radius: 8,
// 				fillColor: '#ff7800',
// 				color: '#000',
// 				weight: 1,
// 				opacity: 1,
// 				fillOpacity: 0.8
//             }) 
//         } else if (feature.properties.Population > 250000) {
//             return L.circleMarker(latlng, {
//                 radius: 13,
// 				fillColor: '#000000',
// 				color: '#000',
// 				weight: 1,
// 				opacity: 1,
// 				fillOpacity: 0.8
//             }) 
//         }
//     }

// The below code worked marvellously
// L.geoJSON(cities, {
//   pointToLayer: function (feature, latlng) {
//     if (feature.properties.Population <= 250000) {
//       return L.circleMarker(latlng, {
//         radius: 4,
//         fillColor: '#FFFF00',
//         color: '#000',
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8  
//       });
//     } else if (feature.properties.Population <= 800000) {
//       return L.circleMarker(latlng, {
//         radius: 8,
//         fillColor: '#ff9900',
//         color: '#000',
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8  
//       });
//     } else {
//       return L.circleMarker(latlng, {
//         radius: 12,
//         fillColor: '#FF0000',
//         color: '#000',
//         weight: 1,
//         opacity: 1,
//         fillOpacity: 0.8  
//       });
//     }
    
//   }
// }).bindPopup(function (layer) {
//   return `City: ${layer.feature.properties.City},<br>
//   Population: ${layer.feature.properties.Population}`;
// }).addTo(map);

// Splendid performance
// L.geoJSON(cities, {
//   pointToLayer: function (feature, latlng) {
//     if (feature.properties.Population <= 250000) {
//       return L.marker(latlng, {
//         icon: yellowIcon 
//       });
//     } else if (feature.properties.Population <= 800000) {
//       return L.marker(latlng, {
//         icon: orangeIcon 
//       });
//     } else {
//       return L.marker(latlng, {
//         icon: redIcon 
//       });
//     }
    
//   }
// }).bindPopup(function (layer) {
//   return `City: ${layer.feature.properties.City},<br>
//   Population: ${layer.feature.properties.Population}`;
// }).addTo(map);

// var geoJson = L.geoJSON(cities, {
//     pointToLayer: function(geoJsonPoint, latlng) {
//         return L.marker([cities.features.geometry.coordinates[0], cities.features.geometry.coordinates[1]], {
//             icon: yellowIcon
//         });
//     }
// }).addTo(map);

// for (var i = 0; i <= geoJson.length; i++) {
//     marker = new L.marker([cities.features.geometry.coordinates[0], cities.features.geometry.coordinates[1]], {
//         icon: yellowIcon
//     })
// }

// for (var i = 0; i <= geoJson.length; i++) {
//     if (cities.features.properties.Population <= 250000) {
//         icon: orangeIcon;
//     } else if (cities.features.properties.Population <= 700000) {
//         icon: yellowIcon;
//     } else {
//         icon: redIcon;
//     }
// }

// function iconLoop (layer) {
//     if (layer.feature.properties.Population <= 250000) {
//                 icon: orangeIcon;
//             } else if (layer.feature.properties.Population <= 700000) {
//                 icon: yellowIcon;
//             } else {
//                 icon: redIcon;
//             }
// }
























