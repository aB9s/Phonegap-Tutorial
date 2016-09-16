function init() {
    //Load after page successfully loads up UI elements
    document.addEventListener("deviceready", onDeviceReady, false);
    //to detect back button press on Android Devices
    document.addEventListener("backbutton", onBackKeyDown, false);
}
//to detect back button press on Android Devices
function onBackKeyDown() {
    goBack();
}

//Load after page successfully loads up UI elements
function onDeviceReady() {
    document.getElementById('td-cordova').innerHTML = device.cordova;
    document.getElementById('td-model').innerHTML = device.model;
    document.getElementById('td-platform').innerHTML = device.platform;
    document.getElementById('td-uuid').innerHTML = device.uuid;
    document.getElementById('td-version').innerHTML = device.version;
    document.getElementById('td-manufacturer').innerHTML = device.manufacturer;
    document.getElementById('td-isVirtual').innerHTML = device.isVirtual;
    document.getElementById('td-serial').innerHTML = device.serial;
}

