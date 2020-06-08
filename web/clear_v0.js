
function getUserAgent() {
    return navigator.userAgent
}


function getHTTPHeaders() {
    var req = new XMLHttpRequest()
    req.open('GET', document.location)
    req.send()

    var data = new Object()
    var headers = req.getAllResponseHeaders().toLowerCase()
    var aHeaders = headers.split('\n')
    var i =0

    for (i= 0; i < aHeaders.length; i++) {
        var thisItem = aHeaders[i]
        var key = thisItem.substring(0, thisItem.indexOf(':'))
        var value = thisItem.substring(thisItem.indexOf(':')+1)
        data[key] = value
    }
    return data
}


function getPlugins() {
    var numPlugins = navigator.plugins.length;
    var plugins = [];

    for(var i = 0; i < numPlugins; i++) {
        plugins.push(navigator.plugins[i].name)
    }
    return plugins
}


function getTimezoneOffset() {
    return new Date().getTimezoneOffset()
}


function getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}


function getScreenSizeColorDepth() {
    return "".concat(
        window.screen.width.toString(), 
        "x",
        window.screen.height.toString(),
        "x",
        screen.colorDepth.toString())
}


function getSystemFonts() {
    return window.fonts
}


function areCookiesEnabled() {
    var cookieEnabled = navigator.cookieEnabled

    if (!cookieEnabled){ 
        document.cookie = "testcookie";
        cookieEnabled = document.cookie.indexOf("testcookie")!==-1
    }
    return cookieEnabled
}


function getLanguage() {
    return navigator.language || navigator.userLanguage
}



function getPlatform() {
    return navigator.platform
}



function getOSCPUInfo() {
    return window.navigator.oscpu
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
    }

    return deviceInfo
}


async function requestInstantScore(apiKey, emailAddress, apiVersion = "0") {
    var endpointUrl = "https://api.clearhq.ai/instant-score/v" + apiVersion + "/score"
    var devInfo = getDeviceInfo();
    var reqBody = {
            user_agent: devInfo["userAgent"],
            httpHeaders: devInfo["httpHeaders"],
            plugins: devInfo["plugins"],
            timezoneOffset: devInfo["timezoneOffset"],
            timezone: devInfo["timezone"],
            screenSize: devInfo["screenSize"],
            systemFonts: devInfo["systemFonts"],
            cookiesEnabled: devInfo["cookiesEnabled"],
            language: devInfo["language"],
            platform: devInfo["platform"],
            oscpu: devInfo["oscpu"],
            email: emailAddress,
            do_not_track: "no"
    }
    var reqHeader = {
            "clearhq-key": apiKey,
            Accept: "application/json"
    }

    const instantScore = await axios.post(endpointUrl, {
        data: reqBody,
        headers: reqHeader
    })
    console.log(instantScore.data)
    return instantScore.data
}


async function requestEmailScore(apiKey, emailAddress, apiVersion = "0") {
    var endpointUrl = "http://api.clearhq.ai/email-score/v" + apiVersion + "/score"
    var reqParams = {
            email: emailAddress
    }
    var reqHeader = {
            "clearhq-key": apiKey,
            Accept: "application/json"
    }

    const emailScore = await axios.get(endpointUrl, {
        params: {
            email: emailAddress
        },
        headers: reqHeader
    })

    return emailScore.data
}
