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
        center: [-115.1480962, 36.1714265], // longitude, latitude
        zoom: 13
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
        $('#map_profile').fadeIn();
    });
    map.addLayer(sittersLayer);

});


// MOBILE APP CODE
var menuOpen = false;
var app = {
    initialize: function() {
        this.bindEvents();
        $('#page_home').click(function() {
            $('#page_home').hide();
            $('#page_map').css('visibility','visible');
            $('#map_root').show();
            $('#page_map').fadeIn();
        });
        $('#header_action').click(function() {
            if(menuOpen) {
                $('.header_menu').removeClass('open');
                $('#header_action').removeClass('icon_arrow_up');
                $('#header_action').addClass('icon_arrow_down');
            } else {
                $('.header_menu').addClass('open');
                $('#header_action').removeClass('icon_arrow_down');
                $('#header_action').addClass('icon_arrow_up');
            }
            menuOpen = !menuOpen;
        });
        $('#profile-close').click(function() {
            $('#map_profile').fadeOut();
        });
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        alert('here!');
    }
};

app.initialize();