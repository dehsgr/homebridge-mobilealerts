# homebridge-mobilealerts 

This is a homebridge plugin for several Mobile-Alerts (Technoline/Weatherhub) devices.

## Installation
1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-mobilealerts
3. Update your configuration file. See sample-config.json in this repository for a sample. 


## Configuration
#### Configuration sample:

 ```
"platforms": [
	{
		"platform": "MobileAlerts",
		"name": "MobileAlerts",
		"iphoneid": "YOURIPHONEID",
		"devices": [
			"0123456789ABCDEF",	// sensor serial
			"1234567890ABCDEF",	// sensor serial
			"2345678901ABCDEF"	// sensor serial
		],
		"api": {				// -> fit this to app settings!
			"language": "de",		
			"ampm": false,		// use am/pm vs. 24h
			"celsius": true,	// use °C vs. °F
			"mm": true,			// use mm vs. in
			"speedunit": 0		// 0=m/s; 1=km/h; 2=mph; 3=kn
		},
		"log": {
			"verbose": false,	// increase log output
			"data": false		// log received data
		},
		"reset": false			// reset all sensors
	}
]
```

To retrieve your iPhone ID please follow following guide:
1. Open your Mobile Alerts app.
2. Go to "Settings".
3. Scroll down to find your iPhone ID. 

#### Optional Parameters

* `reset` removes and add the sensors/accessories again.


## Currently Supported Devices
* MA 10001
* MA 10006
* MA 10100
* MA 10120
* MA 10200
* MA 10230
* MA 10232
* MA 10320
* MA 10350
* MA 10410
* MA 10421
* MA 10450
* MA 10700
* MA 10800
* WH 30.3312.02