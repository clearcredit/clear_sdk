
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

function testxhr() {
	var data = JSON.stringify({"user_agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10.14; rv:74.0) Gecko/20100101 Firefox/74.0","email":"lamine@cheloufi.de","do_not_track":"no"});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function() {
	  if(this.readyState === 4) {
	    return this.responseText;
	  }
	});

	xhr.open("POST", "https://api.clearhq.ai/instant-score/v0/score");
	xhr.setRequestHeader("clearhq-key", "*your-api-key*");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);
}

(function () {
	var apiKey = 'd2bc1c3f-0276-412f-96e7-dc2c69301ac7';	

	/*
		Instance Score example
	*/
	var instScoreBtn = document.getElementById('retrieve_instant_score');

	instScoreBtn.addEventListener('mousedown', function() {
		var emailAddress = document.getElementById('email_address_input').value;
		// response = 
		// requestInstantScore(apiKey, emailAddress);
		testxhr();
	}, false);


	/*
		Email Score example
	*/
	var emailScoreBtn = document.getElementById('retrieve_email_score');

	emailScoreBtn.addEventListener('mousedown', function() {
		var emailAddress = document.getElementById('email_address_input').value;
		requestEmailScore(apiKey, emailAddress);
	}, false);

})(window, document);
