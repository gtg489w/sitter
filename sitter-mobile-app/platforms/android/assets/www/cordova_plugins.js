cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.apache.cordova.startapp/www/startApp.js",
        "id": "org.apache.cordova.startapp.startapp",
        "merges": [
            "navigator.startApp"
        ]
    },
    {
        "file": "plugins/jaeger.Html5Video/www/Html5Video.js",
        "id": "jaeger.Html5Video.Html5Video",
        "clobbers": [
            "plugins.html5Video"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.device/www/device.js",
        "id": "org.apache.cordova.device.device",
        "clobbers": [
            "device"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.tokbox.cordova.opentok": "1.0.2",
    "org.apache.cordova.startapp": "0.3.0",
    "jaeger.Html5Video": "1.2.1",
    "org.apache.cordova.device": "0.2.14-dev"
}
// BOTTOM OF METADATA
});