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
		"iphoneid": "YOURIPHONEID"
		"pollinginterval": 420,
		"log": {
			"verbose": false,
			"HTML": false
		},
		"reset": false
	}
]
```

To retrieve your iPhone ID please follow following guide:
1. Open your Mobile Alerts app.
2. Go to "Settings".
3. Scroll down to find your iPhone ID. 

#### Optional Parameters

* `pollinginterval` is the interval in seconds at which the sensor values are fetched from the Mobile Alerts Server. A value smaller than 420 seconds, i.e. 7 minutes, is meaningless because Mobile Alerts only saves the values every 7 minutes anyway.

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
* MA 10700
* MA 10800
* WH 30.3312.02

## ToDo
* Fakegato Support
