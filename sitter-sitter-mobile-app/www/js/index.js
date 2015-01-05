var config = {
    domain: 'DL',
    userId: '553474448',
    password: 'NO-PASSWD',
    appKey: 'XE_D992D03858F2432F_1'
};

// PROD
config.userId = '553290699';
config.password = 'NO-PASSWD';

// Final Presentation Keys
config.userId = '553290699';
config.appKey = 'JE_B926A9F0F2CB8654_1';
config.password = 'NO-PASSWD';
config.authToken = 'ca85a1ae48906dee064bf48231335673112aeb15249cf157f046c0096b0296a0a36599019c78b74060ad94fe68d18cf010c34145154baa412e753b3fd5';
config.requestToken = 'd7b94785d0aeccb4c09df65b4f4e6300';
config.gatewayId = '31A0E161074C49A7A9939B5C2B099FFF';

var runFinalPresentation = function() {
  doAction('PE00000008','switch','on');
  doAction('PE00000005','switch','on');
  doAction('DL00000007','lock','unlock');
};

var resetFinalPresentation = function() {
  doAction('PE00000008','switch','off');
  doAction('PE00000005','switch','off');
  doAction('DL00000007','lock','lock');
};


/*
Lamp: PE00000008 switch on
Lock: DL00000007 lock unlock
Flood Light: PE00000005 switch on
*/


//////// M2X

var locationSuccess = function(position) {
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
*/

    var d = new Date();
    var timestamp = d.getFullYear() + '-' + ('0' + (d.getMonth()+1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2) + 'T' + ('0' + d.getHours()).slice(-2) + ':'+ ('0' + d.getMinutes()).slice(-2) + ':' + ('0' + d.getSeconds()).slice(-2)+'.000Z';
    var data = { "name": "Home",
          "latitude": parseFloat(('' + parseFloat(position.coords.latitude)).substring(0,8)),
          "longitude": parseFloat(('' + parseFloat(position.coords.longitude)).substring(0,8)),
          "timestamp": timestamp,
          "elevation": parseInt(position.coords.altitude, 10)
      };

    $.ajax({
         url: "http://api-m2x.att.com/v2/devices/2093f9bf9e6c08467fbe4e06c32edbe2/location",
         dataType: 'json',
         headers: {
                    'X-M2X-KEY': 'f2353d5155ca190a929d422f0bfe608b',
                    'Content-Type': 'application/json'
                },
         data: JSON.stringify(data),
         type: "PUT",
      }).success(function() {
      }).error(function(err) {
        //alert(JSON.stringify(err));
      }).done(function() {
            locationFetching = false;
      });
};

function locationError(error) {
    /*alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
*/
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







//////// CONNECTED HOME
var devices = [];
var initializeDevices = function() {
    $.ajax({
         url: "https://systest.digitallife.att.com:443/penguin/api/authtokens?userId="+config.userId+"&password="+config.password+"&domain="+config.domain+"&appKey="+config.appKey,
         dataType: 'json',
         type: "POST"
      }).success(function(response) {
        console.log(response);
        config.authToken = response.content.authToken;
        config.requestToken = response.content.requestToken;
        config.gatewayId = response.content.gateways[0].id;

        getDevices();

      }).error(function(err) {
        //alert(JSON.stringify(err));
      });
};

var getDevices = function() {
  $('#status').text('Getting Devices');
    $.ajax({
         url: "https://systest.digitallife.att.com:443/penguin/api/"+config.gatewayId+"/devices",
         dataType: 'json',
         type: "GET",
         headers: {
            'Authtoken': config.authToken,
            'Appkey': config.appKey,
            'Requesttoken': config.requestToken
        },
      }).success(function(response) {
        console.log(response);
        $('#device_list').html('');
        response.content.forEach(function(device) {
            if(device.deviceType == 'door-lock') {
                $('#device_list').append('<button onclick="doAction(\''+device.deviceGuid+'\',\'lock\',\'lock\')">Lock Door</button><button onclick="doAction(\''+device.deviceGuid+'\',\'lock\',\'unlock\')">Unlock Door</button>');
            } else if(device.deviceType == 'garage-door-controller') {
                $('#device_list').append('<button onclick="doAction(\''+device.deviceGuid+'\',\'garage-door-control\',\'open\')">Open Garage Door</button><button onclick="doAction(\''+device.deviceGuid+'\',\'garage-door-control\',\'close\')">Close Garage Door</button>');
                console.log(device);
            }
        });
        
      }).error(function(err) {
        //alert(JSON.stringify(err));
      });
};

var doAction = function(guid, action, value) {
    console.log(guid, action, value);

    $('#status').text('Sending Action: '+value);
    $.ajax({
         url: "https://systest.digitallife.att.com:443/penguin/api/"+config.gatewayId+"/devices/"+guid+"/"+action,
         //dataType: 'json',
         data: value,
         type: "POST",
         headers: {
            'Authtoken': config.authToken,
            'Appkey': config.appKey,
            'Requesttoken': config.requestToken,
            'Content-Type': 'multipart/form-data'
        },
      }).success(function(response) {
        //console.log(response);
        $('#status').text('Action Complete');
      }).error(function(err) {
        //alert(JSON.stringify(err));
      });
};





var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        //initializeLocationService();
        //initializeDevices();
    }
};
app.initialize();
//initializeDevices();