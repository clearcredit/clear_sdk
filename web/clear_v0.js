
function getUserAgent() {
    return navigator.userAgent;
}


function getHTTPHeaders() {
    var req = new XMLHttpRequest();
    req.open('GET', document.location);
    req.send();

    var data = new Object();
    var headers = req.getAllResponseHeaders().toLowerCase();
    var aHeaders = headers.split('\n');
    var i =0;

    for (i= 0; i < aHeaders.length; i++) {
        var thisItem = aHeaders[i];
        var key = thisItem.substring(0, thisItem.indexOf(':'));
        var value = thisItem.substring(thisItem.indexOf(':')+1);
        data[key] = value;
    }
    return data;
}


function getPlugins() {
    var numPlugins = navigator.plugins.length;
    var plugins = [];

    for(var i = 0; i < numPlugins; i++)
    {
        plugins.push(navigator.plugins[i].name); 
    }
    return plugins;
}


function getTimezoneOffset() {
    return new Date().getTimezoneOffset();
}


function getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}


function getScreenSizeColorDepth() {
    return "".concat(
        window.screen.width.toString(), 
        "x",
        window.screen.height.toString(),
        "x",
        screen.colorDepth.toString());
}


function getSystemFonts() {
    return window.fonts;
}


function areCookiesEnabled() {
    var cookieEnabled = navigator.cookieEnabled;

    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!==-1;
    }
    return cookieEnabled;
}


function getLanguage() {
    return navigator.language || navigator.userLanguage;
}



function getPlatform() {
    return navigator.platform;
}



function getOSCPUInfo() {
    return window.navigator.oscpu;
}


function getDeviceInfo() {
    var deviceInfo = {
        "userAgent": getUserAgent(),
        "httpHeaders": JSON.stringify(getHTTPHeaders()),
        "plugins": getPlugins(),
        "timezoneOffset": getTimezoneOffset(),
        "timezone": getTimezone(),
        "screenSize": getScreenSizeColorDepth(),
        "systemFonts": getSystemFonts(),
        "cookiesEnabled": areCookiesEnabled(),
        "language": getLanguage(),
        "platform": getPlatform(),
        "oscpu": getOSCPUInfo(),
    };

    return deviceInfo
}


function requestInstantScore(apiKey, emailAddress, apiVersion = "0") {
    var endpointUrl = "https://api.clearhq.ai/instant-score/v" + apiVersion + "/score";
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            return xhr.responseText;
        } else {
            return {};
        }
    };

    var devInfo = getDeviceInfo();

    var reqBody = {
        "user_agent": devInfo["userAgent"],
        "email": emailAddress,
        "do_not_track": "no"
    };

    xhr.open("POST", endpointUrl, true);
    xhr.setRequestHeader("clearhq-key", apiKey);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send(JSON.stringify(reqBody));
}


function requestEmailScore(apiKey, emailAddress, apiVersion = "0") {
    var endpointUrl = "https://api.clearhq.ai/email-score/v" + apiVersion + 
                    "/score?email=" + emailAddress;
    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            return xhr.responseText;

        } else {
            return {};
        }
    };

    xhr.open("GET", endpointUrl);
    xhr.setRequestHeader("clearhq-key", apiKey);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xhr.send();
}
