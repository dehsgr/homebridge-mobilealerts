/* ~~~ credits ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Credits go to @sarnau for reverse engineering Mobile Alerts API. This gave me the Chance to adopt
his Findings into this Project for a better Approach of communicating with Mobile Alerts Servers.

https://github.com/sarnau/MMMMobileAlerts/blob/master/MobileAlertsGatewayApplicationAPI.markdown
*/

// ~~~ constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const BASE_CONFIG = {
	method: 'POST',
	url: 'http://www.data199.com:8080/api/v1/dashboard',
	headers: {
		"User-Agent" : "remotemonitor/247 CFNetwork/758.2.8 Darwin/15.0.0",
		"Accept-Language" : "en-us",
		"Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
		"Host" : "www.data199.com:8080"
	},
	body: {
		devicetoken: 'empty',								// defaults to "empty"
		vendorid: 'BE60BB85-EAC9-4C5B-8885-1A54A9D51E29',	// iOS vendor UUID (returned by iOS, any UUID will do). Launch uuidgen from the terminal to generate a fresh one.
		phoneid: '$PHONEID$',								// Phone ID - probably generated by the server based on the vendorid (this string can be "Unknown" and it still works)
		version: '1.20',									// Info.plist CFBundleShortVersionString
		build: '247',										// Info.plist CFBundleVersion
		executable: 'Mobile Alerts',						// Info.plist CFBundleExecutable
		bundle: 'de.synertronixx.remotemonitor'				// [[NSBundle mainBundle] bundleIdentifier]
	}
}

// ~~~ public functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = {
	createRequest: function(myPlatform, mySerials)
	{
		var request = JSON.parse(JSON.stringify(BASE_CONFIG));							// clone base config to request first!
	
		var body = '';																	// build temporary body...
		for (var parm in request.body) {
			if (request.body.hasOwnProperty(parm)) {
				body += (body.length > 0 ? '&' : '');
				body += (parm + '=' + request.body[parm]);
			}
		}
	
		body = body.replace(/\$PHONEID\$/gi, myPlatform.PhoneID);						// set configured phone id...
		body += '&lang=' + myPlatform.Language;											// set preferred language
		body += '&timezoneoffset=' + (-1 * new Date().getTimezoneOffset());				// set local offset to UTC time
		body += '&timeampm=' + (myPlatform.Clock ? 'true' : 'false');					// set 12h vs 24h clock
		body += '&usecelsius=' + (myPlatform.Temperature ? 'false' : 'true');			// set Celcius vs Fahrenheit
		body += '&usemm=' + (myPlatform.Rain ? 'false' : 'true');						// set mm va in
		body += '&speedunit=' + myPlatform.Wind;										// set wind speed (0: m/s, 1: km/h, 2: mph, 3: kn)
		body += '&timestamp=' + parseInt(new Date(new Date().toUTCString()) / 1000); 	// set current UTC timestamp
		
		var md5 = body + 'uvh2r1qmbqk8dcgv0hc31a6l8s5cnb0ii7oglpfj'						// SALT for the MD5
		md5 = md5.replace(/\-/gi, '');
		md5 = md5.replace(/\,/gi, '');
		md5 = md5.replace(/\./gi, '');
		md5 = md5.toLocaleLowerCase();
		
		const crypto = require("crypto");												// create hash...
		const utf8 = require('utf8');
		var hash = crypto.createHash("md5").update(utf8.encode(md5)).digest('hex');
		
		body += '&requesttoken=' + hash;												// append hash, serials and filters to body...
		body += '&deviceids=' + mySerials.join(',');
		body += '&measurementcounts=';
		for (var i = 0; i < mySerials.length; i++) {
			switch (parseInt(mySerials[i].substr(0, 2))) {
				case 0x8:					// rain sensor -> all measurements
					var f = '';
					break;
				
				default:					// other sensors -> one measurement
					var f = '1';
			}
			body += ((i > 0 ? ',' : '') + f);
		}
	
		request.body = body;															// finalize our request...
	
		return request;
	}, 

	fetchData: function(myPlatform, mySerials, myCallback)
	{
		myPlatform.debug('Fetching Data...');

		request = this.createRequest(myPlatform, mySerials);
		require('request')(request, function(myError, myResponse) {
			if(myError) {
				console.warn('There was an Error requesting Data from Mobile Alerts Servers: ' + myError);
			} else {
				switch (myResponse.statusCode)
				{
					case 403:
						myPlatform.error('We were locked out from Mobile Alerts Team!');
						break;

					case 200:
						myCallback(JSON.parse(myResponse.body));
						break;
					
					default:
						myPlatform.warn(
							'There was an unexpected Response from the Server: ' +
							myResponse.statusCode + ' (myResponse.body)'
						);
				}
			}
		});		
	},

	// ~~~ deprecated functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

	fetchDataLegacy: function(myServer, myID, myCallback)
	{
		console.debug('Fetching Data...');

		require('request')({
			method: 'POST',
			url: 'https://' + myServer + '/',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'MobileAlertsPleaseProvideOfficialAPI4ALL/1.0'
			},
			body: 'phoneid=' + myID
		}, function(myError, myResponse) {
			if(myError) {
				console.warn('There was an Error requesting initial Data for Sensor-Matching: ' + myError);
			} else {
				switch (myResponse.statusCode)
				{
					case 403:
						console.error(
							'We were locked out from Mobile Alerts Team again! ' +
							'Thank you guys for not providing an adequate public API' +
							'for all users and sensors! :-('
						);
						break;

					case 200:
						myCallback(myResponse.body);
						break;
					
					default:
						console.warn(
							'There was an unexpected response code from the server: ' +
							myResponse.statusCode + ' (myResponse.body)'
						);
				}
			}
		});
	}
};