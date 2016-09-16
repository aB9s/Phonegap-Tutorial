function init() {
    //Load after page successfully loads up UI elements
    document.addEventListener("deviceready", onDeviceReady, false);
    //to detect back button press on Android Devices
    document.addEventListener("backbutton", onBackKeyDown, false);
}
//Load after page successfully loads up UI elements
function onDeviceReady() {}
//to detect back button press on Android Devices
function onBackKeyDown() {
    //kill the App
    navigator.app.exitApp();
}
$(document).ready(function () {
    $('ul').on('click', 'li', function () {
        var listEleClicked = $(this);
        switch (listEleClicked.index()) {
        case 0: //to Plugins Screen
            window.open("phonegap_plugins_demo.html", "_self");
            break;
        default:
            break;
        }
    });
});