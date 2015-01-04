var locationSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');


    var d = new Date();
    var timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + 'T' + ('0' + d.getHours()).slice(-2) + ':'+ ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2)+'.000Z';
    var data = { "name": "Home",
          "latitude": parseFloat(position.coords.latitude),
          "longitude": parseFloat(position.coords.longitude),
          "timestamp": timestamp,
          "elevation": parseInt(position.coords.altitude, 10)
      };

      alert(JSON.stringify(data));
    $.ajax({
         url: "http://api-m2x.att.com/v2/devices/2093f9bf9e6c08467fbe4e06c32edbe2/location",
         dataType: 'json',
         headers: {
                    'X-M2X-KEY': 'f2353d5155ca190a929d422f0bfe608b',
                    'Content-Type': 'application/json'
                },
         data: data,
         type: "PUT",
         success: function() { alert('Success!' + authHeader); }
      }).success(function() {
        alert('success');
      }).error(function(err) {
        alert(JSON.stringify(err));
      }).done(function() {
            locationFetching = false;
      });
};

function locationError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');

    locationFetching = false;
}

var locationFetching = false;
var doLocation = function() {
    if(locationFetching) {
        return;
    }
    locationFetching = true;
    var watchId = navigator.geolocation.watchPosition(locationSuccess, locationError);
};

var initializeLocationService = function() {
    setInterval(doLocation, 20000);
    doLocation();
};


var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        initializeLocationService();
    }
};

app.initialize();