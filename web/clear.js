function hello() {
	console.log("Hello world!");	
}


function renderAttrTable() {
 	var table = document.getElementById('demo-table');
 	var devInfo = getDeviceInfo();

 	Object.keys(devInfo).forEach(function(key) {
		var tr = document.createElement('tr');
        
        var td1 = document.createElement('td');
        td1.appendChild(document.createTextNode(key));
        tr.appendChild(td1);

        var td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(devInfo[key]));
        tr.appendChild(td2);
        table.appendChild(tr);
	});
}


function debugDevInfo() {
	console.log(getDeviceInfo());
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


function getUserAgent() {
	return navigator.userAgent;
}


function getHTTPHeaders() {
	var req = new XMLHttpRequest();
	req.open('GET', document.location, false);
	req.send(null);

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
        cookieEnabled = document.cookie.indexOf("testcookie")!=-1;
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



