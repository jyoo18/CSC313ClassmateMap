const STROKE = new ol.style.Stroke({color: 'black', width: 1});
const RADIUS_CONSTANT = 10000;

var stylekeys = ['SLO', 'Bay Area', 'Fresno'];
var groupData = {
   'SLO': {'density': 3, 'coords': [-120.661907, 35.295224]},
   'Bay Area': {'density': 2, 'coords': [-121.888767, 37.335578]},
   'Fresno': {'density': 1, 'coords': [-119.772421, 36.741085]}
}

var features = new Array(3);
for (var i = 0; i < features.length; i++) {
   var area = groupData[stylekeys[i]];
   var density = area['density'];
   var coords = ol.proj.fromLonLat(area['coords']);
   var radius = RADIUS_CONSTANT * density;
   var fill;

   if (density == 1) {
      fill = new ol.style.Stroke({color: 'rgba(185, 19, 19, 0.3)'});
   } else if (density == 2) {
      fill = new ol.style.Stroke({color: 'rgba(19, 66, 185, 0.6)'});
   } else {
      fill = new ol.style.Stroke({color: 'rgba(47, 185, 19, 0.8)'});
   }

   features[i] = new ol.Feature(new ol.geom.Circle(coords, radius));
   features[i].setStyle(
      new ol.style.Style({
         stroke: STROKE,
         fill: fill
      })
   );
}

var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var source = new ol.source.Vector({
   features: features
});

var vector = new ol.layer.Vector({
  source: source
});

var map = new ol.Map({
  target: 'map',
  layers: [raster, vector],
  view: new ol.View({
    center: ol.proj.fromLonLat([-120.660385, 35.300801]),
    zoom: 7
  })
});
