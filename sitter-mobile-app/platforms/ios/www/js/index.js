// ESRI STUFF

var map;

setTimeout(function() {
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
            if(e.graphic.attributes.sitter_id == 1) {
                showJeremy();
            } else {
                showAmanda();
            }
            $('#map_profile').fadeIn();
        });
        map.addLayer(sittersLayer);

    });
}, 1000);

var showJeremy = function() {
    
    $.ajax({
        url: "https://proapi.whitepages.com/2.0/phone.json?phone_number=8643568373&api_key=1178a3b580cea98d66fc73e233f344b3",
        context: document.body
    }).success(function(response) {
        console.log(response);
    });
    $('#video-bio').show();
    $('#value-bio').text("Hi! I'm Jeremy. I look forward to serving you.");
    $('#value-sits').text('1');
    $('#value-age').text('37');
    $('#whitepages_verified').hide();
    $('#filter-baby').removeClass('unavailable');
    $('#filter-pet').addClass('unavailable');
    $('#filter-house').addClass('unavailable');
    $('#value-name').text('Jeremy L.');
    $('.profile-photo-round').css('background-image','url(img/jeremy.jpg)');
    $('.profile-photo-backdrop').css('background-image','url(img/jeremy.jpg)');
    $('#fifthstar').hide();
};

var showAmanda = function() {
    $.ajax({
        url: "https://proapi.whitepages.com/2.0/phone.json?phone_number=5708671755&api_key=1178a3b580cea98d66fc73e233f344b3",
        context: document.body
    }).success(function(response) {
        console.log(response);
    });
    $('#video-bio').hide();
    $('#value-bio').text("Thanks for visiting my profile! I'm Amanda and I've been a nanny and babysitter for a number of years.");
    $('#value-sits').text('47');
    $('#value-age').text('28');
    $('#whitepages_verified').show();
    $('#filter-baby').removeClass('unavailable');
    $('#filter-pet').removeClass('unavailable');
    $('#filter-house').removeClass('unavailable');
    $('#value-name').text('Amanda S.');
    $('.profile-photo-round').css('background-image','url(img/amanda.jpg)');
    $('.profile-photo-backdrop').css('background-image','url(img/amanda.jpg)');
    $('#fifthstar').show();
};


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
    }
};

app.initialize();