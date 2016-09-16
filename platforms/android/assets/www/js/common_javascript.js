//var url_common = "http://turtledove.in/test/autnex/index.php/mobileapi/";
var url_common = "http://132.148.18.250/~autnexlive/index.php/mobileapi/";
var url_common_2 = " http://132.148.18.250/~autnexlive/"

var NativeStorageElements = {
    couponCode: 'COUPON_CODE',
    couponRedeemDetails: 'COUPON_REDEEM_DETAILS',
    forgetPwdOTPExp: 'FORGET_PWD_OTP_EXP',
    customerId: 'CUSTOMER_ID',
    customerName: 'CUSTOMER_NAME',
}

var ErrorMessages = {
    normal: 'Error occurred, please try again later.',
    noInternet: 'Unable to connect to the servers,<br />Please check your Network connection.',
    noInternetSnackBar: 'Unable to connect to the servers,Please check your Network connection.',
    userData: 'Error geting User profile data.',
    login: 'Error while logging into the App. Please try again later.',
    logout: 'Error ocurred while logging out of the App. Please try again later.',
    invalidUsernamePassword: 'Invalid Username and/or Password.',
    noUsernamePassword: 'Please enter valid Username and Password to log into the App.',
    couponDetails: 'Error occurred while geting Coupon Details, please try again later.',
    noCoupon: 'Please enter a Coupon Code first.',
    incompleteForm: 'Form is incomplete.',
    couponUpdate: 'Error while updating coupon. Please try again later.',
    invalidCoupon: 'Entered Coupon is not valid, pelase check the code and try again.',
    sendOTP: 'Error while sending OTP. Please try again later.',
    wrongOTP: 'Wrong OTP submitted.',
    regCustomer: 'Error while registering new Customer. Please try again later.',
    regAlreadyExists: 'Account with these credentials already exists.',
    sessionExpired: 'Session has expired. Please re-login to continue.',
    noCustomers: 'No Customer registered with you.',
    servicePurchase: 'Error occurred while purchasing the service, please try again later.',
    noOrderHistory: 'No order history to show here.',

}

/** Function to submit a form using Ajax 
 * Type -- POST
 */
function submitForm(obj) {
    var params = {
        type: "POST",
        dataType: "json",
        error: function (jqXHR, textStatus, errorThrown) {

            if (jqXHR.status == 401)
            //window.location.href=urlPrefix+'/login.html';
                alert(textStatus + ' ' + errorThrown + ' ' + jqXHR.status);
        }
    };

    jQuery.extend(params, obj);
    $.ajax(params);

}

/* Loader Object to Hide/Display Progress */
var Loader = {
    show: function (loaderText) {
        document.getElementById("div-circular-loader").style.display = "block";
        document.getElementById("text-circular_loader_message").innerHTML = loaderText;
    },
    hide: function () {
        document.getElementById("div-circular-loader").style.display = "none";
    },
};

function onSuccessScreen() {
    document.getElementById("div-main-body").style.display = "block";
    document.getElementById("div-error-screen").style.display = "none";
}

//function onErrorScreen() {
//    document.getElementById("div-main-body").style.display = "none";
//    document.getElementById("div-error-screen").style.display = "block";
//    document.getElementById("text_error_message").innerHTML = "Error Occurred, Please try again later.";
//}

function onErrorScreen(errorMessage, imageType) {
    $("#div-error-screen").load("error_message_div.html", function () {
        document.getElementById("div-main-body").style.display = "none";
        document.getElementById("div-error-screen").style.display = "block";
        // 1: Error Message, 2: No Internet Message
        document.getElementById("error_image").src = (imageType === 1) ? 'img/error_message.png' : 'img/error_no_internet.png';
        document.getElementById('text_error_message').innerHTML = errorMessage;
    });
}


/* Check internet connection */
function checkConnection() {
    try {
        var networkState = navigator.connection && navigator.connection.type;

        setTimeout(function () {
            networkState = navigator.connection && navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.NONE] = 'No network connection';

        }, 500);
    } catch (e) {
        console.log('Error: ' + e);
    }
}

/**
 * Check for Internet connection, if available --> return 'true'
 */
function internetAvailable() {
    try {
        var networkStatus = navigator.connection;
        if ((networkStatus.type == Connection.UNKNOWN) || (networkStatus.type == Connection.NONE)) {
            return false;
        } else {
            return true;
        }
    } catch (e) {
        console.log('Error caught: ' + e);
        return false;
    }
}

/* On Cancel Click */
function closeApp() {
    navigator.notification.confirm('Do you really want to close the app?',
        dialogKillAppButton,
        'Exit App', ['Exit', 'Cancel']);

}

function dialogKillAppButton(buttonIndex) {
    switch (buttonIndex) {
        case 1:
            killApp();
            break;
        default:
            // do nothing, close the dialog box
            break;
    }
}

/**
 * Function kills the app
 */
function killApp() {
    navigator.app.exitApp();
}

/* Function to go to the previous screen */
function goBack() {
    navigator.app.backHistory();
}

/* handle device online condition */
function onDeviceIsConnected() {
    showSnackBar('Hurray! You are connected to the internet!', false);
}

/* handle device offline condition */
function onDeviceIsNotConnected() {
    showSnackBar('Internet is not available, please try again later.', false);
}

/* Function to display a custom alert box */
function customAlertBox(title, message, button) {
    navigator.notification.alert(message, false, title, button);
}

function appendCustomDialog(title, message, button) {
    $("#div-dialog_box").load("custom_dialog_box.html", function () {
        $("#div-dialog_box").addClass('dialog_box');
        document.getElementById('div-main-body').style.position = 'fixed';
        document.getElementById('text-update-profile').innerHTML = title;
        document.getElementById('div-dialog_content').innerHTML = message;
//        document.getElementById('button-dialog_negative').innerHTML = button[0];
        document.getElementById('button-dialog_positive').innerHTML = button;
    });
}

$(document).on('click', '.dialog_button', function () {
//    if ($(this).attr('id') === 'button-dialog_negative') {
//        onDialogNegativeClicked(this);
//    } else {
        onDialogPositiveClicked(this);
//    }
});


/* Show SnackBar */
function showSnackBar(displayMessage, showButton) {
    var notification = document.querySelector('.mdl-js-snackbar');
    var snackBarButton = document.getElementById("button_snackbar");
    snackBarButton.style.display = showButton ? "block" : "none";
    var data = {
        message: displayMessage,
        actionHandler: function (event) {},
        actionText: 'Undo',
        timeout: 3000
    };
    notification.MaterialSnackbar.showSnackbar(data);
}

/* SnackBar setInterval */
function sncakbarInterval() {
    setInterval(snackbarIntervalCallBack, 3000);
}

function showSnackBarWithButton(displayMessage, buttonTitle) {
    var notification = document.querySelector('.mdl-js-snackbar');
    var snackBarButton = document.getElementById("button_snackbar");


    var data = {
        message: displayMessage,
        actionHandler: function (event) {},
        actionText: buttonTitle,
        timeout: 5000
    };
    notification.MaterialSnackbar.showSnackbar(data);
    snackBarButton.addEventListener('click', snackBarButtonClicked);
}

/* Check for the device type */
function deviceType(device) {
    console.log('Device Type: ' + device.platform);
    return device.platform;
}

/* Check for the Android Device version */
function deviceVersion(device) {
    console.log('Device Version: ' + parseInt(device.version));
    return parseInt(device.version);
}

/* Function to remove Native Storage Item */
function removeNativeStorageItem(keyName) {
    NativeStorage.remove(keyName, onNativeStorageRemoveSuccess, onNativeStorageRemoveError);
}

/* Function to convert system generated date into a Date String*/
function convertToDate(systemDate) {
    var _date = new Date(systemDate);

    if (Object.prototype.toString.call(_date) === "[object Date]") {
        // it is a date
        if (isNaN(_date.getTime())) { // d.valueOf() could also work
            // date is not valid
            return "Not Available";
        } else {
            // date is valid
            var finalDate = ((_date.getDate() < 10) ? "0" + _date.getDate() : _date.getDate()) + "/" + (((_date.getMonth() + 1) < 10) ? "0" + _date.getMonth() : _date.getMonth()) + "/" + _date.getFullYear();
            return finalDate;
        }
    } else {
        // not a date
        return "Not Available";
    }
}

/**
 * Show this Confirmation dialog box upon expiration of user Session
 **/
function reloginUser() {
    navigator.notification.confirm(
        "You need to relogin to continue using the App. Your Session has expired.",
        confirmCallback,
        "Session Expired", ["Re-login", "Exit App"]
    );

    function confirmCallback(buttonIndex) {
        switch (buttonIndex) {
            case 1: //Re-Login User
                var toReloginUser = window.open('re_login.html', '_self');
                break;
            case 2:
                killApp(); //Kill Application
                break;
            default:
                break;
        }
    }
}

/**
 * Check for Email Validation,
 * return true if Email is valid, otherwise false
 */
function validateEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(input);
}

/**
 * Validate Contact (Indian, starts with 7,8,9)
 * return true if correct, otherwise false
 */
function validateContact(input) {
    var re = /^[789]\d{9}$/;
    return re.test(input);
}


function truncateToTwoDecimalPoints(amountString) {
    var floatAmount = parseFloat(amountString);
    //    console.log("before truncation process: " + floatAmount);
    var _amount = floatAmount.toFixed(2);
    //    console.log('after truncation process: ' + _amount);
    return _amount;
}


/*****************************
 **      Check Session       **
 *****************************/

/**
 * Check Session,
 * If active send true; otherwise false
 */
function checkSession() {
    Loader.show("Loading...");
    var params = {
        dataType: "json",
        url: url_common + 'index/checksession',
        error: function (jqXHR, textStatus, errorThrown) {
            Loader.hide();
            reloginUser(); //Error occurred, relogin user
        },
        success: function (data, responseText, jqXHR) {
            Loader.hide();
            if (data.status === 1) { //Session is present, continue with the code
                checkSessionSuccess();
            } else { //Session expired, relogin user
                reloginUser();
            }
        }
    };

    $.ajax(params);
}


function rateApp() {
    var toAppPage = window.open('https://play.google.com/store/apps/details?id=' + 'co.turtledove.autnex.dealer');
}

function shareApp() {
    var options = {
        message: 'Hey, would you like to join us? Register with our AutNex Dealers App and get enrolled.',
        subject: 'Hey, would you like to join us? Register with our AutNex Dealers App and get enrolled.',
        url: 'https://www.autnex.com',
        chooserTitle: 'Share AutNex Dealers App'
    }

    var onSuccess = function (result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true 
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false) 
    }

    var onError = function (msg) {
        console.log("Sharing failed with message: " + msg);
    }

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}
