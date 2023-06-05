let map = L.map('myMap').setView([-1.295287148, 36.81984753], 7);

let tileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// var wmsLayer = L.tileLayer.wms('http://webgis.osgeo.cn/cgi-bin/mapserv?map=/owg/mfb3.map&', {
//     layers: 'states',
//     format: 'image/png'
// }).addTo(map);

// url = 'https://www.gmrt.org/services/mapserver/wms_merc_mask?'

let wmsLayerTopo = L.tileLayer.wms('https://www.gmrt.org/services/mapserver/wms_merc_mask?', {
    layers: 'topo',
    format: 'image/png'
})

let wmsLayerTopomask = L.tileLayer.wms('https://www.gmrt.org/services/mapserver/wms_merc_mask?', {
    layers: 'topo-mask',
    format: 'image/png'
})

// Insert OSM and WSM layers into basemaps object
var basemaps = {
    OSM: tileLayer,
    Topo: wmsLayerTopo,
    Topo_mask: wmsLayerTopomask,
}

L.control.layers(basemaps).addTo(map);

basemaps.Topo.addTo(map);  // To have the Topo as the default map layer

























