
function hello() {
	console.log("Hello world!")
}


function renderAttrTable() {
 	var table = document.getElementById('demo-table')
 	var devInfo = getDeviceInfo()

 	Object.keys(devInfo).forEach(function(key) {
		var tr = document.createElement('tr')
        
        var td1 = document.createElement('td')
        td1.appendChild(document.createTextNode(key))
        tr.appendChild(td1)

        var td2 = document.createElement('td')
        td2.appendChild(document.createTextNode(devInfo[key]))
        tr.appendChild(td2)
        table.appendChild(tr)
	});
}


(function () {
	var apiKey = '**your-api-key**'

	/*
		Instance Score example
	*/
	var instScoreBtn = document.getElementById('retrieve_instant_score')

	instScoreBtn.addEventListener('mousedown', function() {
		var emailAddress = document.getElementById('email_address_input').value
		
		requestInstantScore(apiKey, emailAddress).then( (result) => {
			document.getElementById('instant_score').value = result
		})
	}, false)


	/*
		Email Score example
	*/
	var emailScoreBtn = document.getElementById('retrieve_email_score')

	emailScoreBtn.addEventListener('mousedown', () => {
		var emailAddress = document.getElementById('email_address_input').value
		
		requestEmailScore(apiKey, emailAddress).then( (result) => {
			document.getElementById('email_score').value = result.clear_email_score		
		})
	}, false)

})(window, document)

function debugDevInfo() {
	console.log(getDeviceInfo())
}

function instantScoreCallBack(resData) {
	console.log(resData)
}

function emailScoreCallBack(resData) {
	console.log(resData)
	document.getElementById('email_score').value = resData
}
