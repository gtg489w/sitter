// ESRI STUFF

var map;
require([
    "esri/map",
    "esri/layers/FeatureLayer",
    "esri/symbols/PictureMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color", 
    "dojo/domReady!",
    ], function(Map, FeatureLayer, PictureMarkerSymbol, SimpleFillSymbol, Color) {
    map = new Map("map", {
        basemap: "streets",
        center: [-115.195684, 36.114539], // longitude, latitude
        zoom: 15
    });

    var sittersLayer = new FeatureLayer("http://services.arcgis.com/T4ElzZ5y0uIajYQQ/arcgis/rest/services/sitters/FeatureServer/0",{
        //infoTemplate: template,
        outFields: ["*"]
    });

    //var pictureMarkerSymbol = new PictureMarkerSymbol('http://www.esri.com/graphics/aexicon.jpg', 51, 51);
    var selectionSymbol = new SimpleFillSymbol().setColor(new Color([255,255,0,0.5]));
    sittersLayer.setSelectionSymbol(selectionSymbol);


    sittersLayer.on('click', function(e) {
        console.log(e.graphic.attributes.sitter_id);
    });
    map.addLayer(sittersLayer);

});


// MOBILE APP CODE

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        alert('here!');
    }
};

app.initialize();