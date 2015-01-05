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
		//console.log(response);
	});
	$('#video-bio').show();
	$('#value-bio').text("Hi! I'm Jeremy. I look forward to serving you.");
	$('#value-sits').text('1');
	$('#value-age').text('37');
	$('#whitepages_verified').hide();
	$('#filter-baby').removeClass('unavailable');
	$('#filter-pet').addClass('unavailable');
	$('#filter-house').addClass('unavailable');
	$('.value-name').text('Jeremy L.');
	$('.profile-photo-round').css('background-image','url(img/jeremy.jpg)');
	$('.profile-photo-backdrop').css('background-image','url(img/jeremy.jpg)');
	$('#fifthstar').hide();
};

var showAmanda = function() {
	$.ajax({
		url: "https://proapi.whitepages.com/2.0/phone.json?phone_number=5708671755&api_key=1178a3b580cea98d66fc73e233f344b3",
		context: document.body
	}).success(function(response) {
		//console.log(response);
	});
	$('#video-bio').hide();
	$('#value-bio').text("Thanks for visiting my profile! I'm Amanda and I've been a nanny and babysitter for a number of years.");
	$('#value-sits').text('47');
	$('#value-age').text('28');
	$('#whitepages_verified').show();
	$('#filter-baby').removeClass('unavailable');
	$('#filter-pet').removeClass('unavailable');
	$('#filter-house').removeClass('unavailable');
	$('.value-name').text('Amanda S.');
	$('.profile-photo-round').css('background-image','url(img/amanda.jpg)');
	$('.profile-photo-backdrop').css('background-image','url(img/amanda.jpg)');
	$('#fifthstar').show();
};


// WEBRTC

var openVideoChat = function() {
	/*var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("GET", "https://opentokrtc.com/cordova.json", false);
	xmlhttp.send();
	var data = JSON.parse( xmlhttp.response );

	// Very simple OpenTok Code for group video chat
	var publisher = TB.initPublisher(data.apiKey,'myPublisherDiv');

	var session = TB.initSession( '45120902', '0c534ebf0392325a3b0d906469084c7be5abeff4' ); 
	session.on({
		'streamCreated': function( event ){
			var div = document.createElement('div');
			div.setAttribute('id', 'stream' + event.stream.streamId);
			document.body.appendChild(div);
			session.subscribe( event.stream, div.id, {subscribeToAudio: false} );
		}
	});
	session.connect(data.token, function(){
		session.publish( publisher );
	});*/

	navigator.startApp.start("com.android.chrome", function(message) {
	    //alert(message);
	}, 
	function(error) {
	    //alert('ERROR Launching Interview');
	});
};



// MOBILE APP CODE
var menuOpen = false;
var app = {
	initialize: function() {
		this.bindEvents();
		$('#button-video-interview').click(openVideoChat);
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
		$('#book-button').click(function() {
			$('#page_map').hide();
			$('#page_access').fadeIn();
		});
		$('button.toggle').click(function() {
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
			} else {
				$(this).addClass('active');
			}
		});
		$('#button-bookit').click(function() {
			$('#page_access').hide();
			$('#page-section-booked').hide();
			$('#page-section-booking').show();
			$('#page_booking').show();
			setTimeout(function() {
				$('#page-section-booking').hide();
				$('#page-section-booked').show();
				setTimeout(function() {
					$('#page_booking').hide();
					$('#page_receipt').show();
				}, 3000);
			}, 3000);
		});
		$('#button-close-video').click(function() {
			$('#map_video_bio').hide();
			$('#map_profile').show();
		});
		$('#video-bio').click(function() {
			$('#map_profile').hide();
			$('#map_video_bio').show();
		});
	},
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
	}
};

app.initialize();