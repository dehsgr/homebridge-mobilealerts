// ~~~ constants ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var POLLING_INTERVAL			= 07 * 60 * 1000;   // 7 minutes
var WAIT_FOR_DATA_INTERVAL		= 01 * 01 * 1000;   // 1 second

var MA10006_TEMPERATURE_INSIDE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10006_TEMPERATURE_OUTSIDE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10006_HUMIDITY_INSIDE		= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10006_HUMIDITY_OUTSIDE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10100_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10120_TEMPERATURE_INSIDE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10120_TEMPERATURE_OUTSIDE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10200_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10200_HUMIDITY			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10320_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10320_TEMPERATURE_CABLE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10320_HUMIDITY			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10350_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10350_HUMIDITY			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10350_LEAK				= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)<\\/h4>';
var MA10421_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_1		= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_2		= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_TEMPERATURE_3		= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10421_HUMIDITY			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_1			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_2			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10421_HUMIDITY_3			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10450_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10450_TEMPERATURE_CABLE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10700_TEMPERATURE			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10700_TEMPERATURE_CABLE	= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[ C]?<\\/h4>';
var MA10700_HUMIDITY			= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)[%]?<\\/h4>';
var MA10800						= '.*?<h4>%SERIAL%[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<\\/h5>[\\s\\S]*?.*?<h4>(.*?)<\\/h4>';

// ~~~ globals ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

var Accessory;
var Service;
var Characteristic;
var UUIDGen;

// ~~~ exports ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

module.exports = function(homebridge)
{
	console.log('homebridge API Version: ' + homebridge.version);

	Accessory = homebridge.platformAccessory;
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	UUIDGen = homebridge.hap.uuid;

	homebridge.registerPlatform('homebridge-mobilealerts', 'MobileAlerts', MobileAlerts, true);
}

// ~~~ constructor / destructor ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function MobileAlerts(myLog, myConfig, myApi)
{
 var Platform = this;

	this.log = myLog;
	this.Config = myConfig || {};
	this.Accessories = [];
	this.Name = this.Config.name || 'MobileAlerts';
	this.Manufacturer = this.Config.manufacturer || 'Technoline';
	this.Model = this.Config.model || 'MobileAlerts';
	this.Serial = this.Config.iphoneid;
	this.LastData;
	this.Config.log = this.Config.log || { verbose: false, HTML: false };
	this.VerboseLogging = this.Config.log.verbose || false;
	this.LogBodyHTML = this.Config.log.HTML || false;
	this.ResetSensors = this.Config.reset || false;

	if (!this.Config.iphoneid) {
		Platform.log.error('iPhone-ID not configured properly! >> Stopping Initialization...');
		return;
	} else {
		Platform.log('iPhone-ID was set to ' + Platform.Config.iphoneid + '...');
	}

	if (!this.Config.pollinginterval) {
		Platform.log.warn('Poling Interval not configured properly! >> Using default of 420s...');
	} else {
		POLLING_INTERVAL = Platform.Config.pollinginterval * 1000
		Platform.log('Polling Interval was set to ' + Platform.Config.pollinginterval + 's...');
	}

	this.fetchData();

	if (myApi) {
		this.Api = myApi;
		this.Api.on('didFinishLaunching', this.OnFinishLaunching.bind(this));
	}
}

// ~~~ enums ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MobileAlerts.prototype.DeviceTypes = { MA10120: 0x01, MA10100: 0x02, MA10200: 0x03, MA10350: 0x04, MA10700: 0x06, MA10006: 0x07, MA10320: 0x09, WH30_3312_02: 0x0E, MA10450: 0x0F, MA10800: 0x10, MA10421: 0x11, MA10230: 0x12, MA10660: 0x17, MA10232: 0x18 };

// ~~~ event handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MobileAlerts.prototype.OnFinishLaunching = function()
{
 var Platform = this;
 var MatchType = { Name: 1, Serial: 2 };
 var ao;  // additional objects (sensors)
 var ay;  // test array
 var r;   // regex
 var m;   // matches
 var n;   // name
 var s;   // serial
 var c;   // # created devices
 var d;   // # deletd devices
 var p;   // position

	Platform.log('Merging Sensors...');

	if (!Platform.LastData) {
		Platform.log.warn('Waiting for initial Sensor Data...');
		setTimeout(Platform.OnFinishLaunching.bind(this), WAIT_FOR_DATA_INTERVAL);
		return;
	}

	c = d = 0;
	ay = [];
	r = /.*?sensor-header[\s\S]*?.*?<a href.*?>(.*?)<\/a>[\s\S]*?.*?<h4>(.*?)<\/h4>/gi;
	m = r.exec(Platform.LastData);
	while(m !== null) {                     // get each sensor serial and name
		n = cleanUmlauts(m[MatchType.Name]);	// from initial sensor data...
		s = m[MatchType.Serial];
		ay[s] = n;                            // ...and add it to test array.

		m = r.exec(Platform.LastData);
	}

	if (Platform.ResetSensors) {
		Platform.log('Resetting Sensors...');
	}

	//remove ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	for (var s in Platform.Accessories) {   // iterate each accessory.
		if ((!ay[s] && s.indexOf('-') < 0) || Platform.ResetSensors) { // known serial or reset?
			if (Platform.VerboseLogging) {
				Platform.log('Removing Sensor with Serial ' + s + '.');
			}

			Platform.removeAccessory(s);        // no! >> so we've to remove accessory!
			var ao = new Array('OUT', 'CABLE', '1', '2', '3');
			for (var i = 0; i < ao.length; i++) {
				if (Platform.Accessories[s + '-' + ao[i]]) {
					Platform.removeAccessory(s + '-' + ao[i]);
				}
			}

			d++;
		}
	}

	r.lastIndex = 0;                        // re-set regex stato te be able to
	m = r.exec(Platform.LastData);          // re-parse.

	//add ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	while(m !== null) {                     // get each sensor serial and name.
		s = m[MatchType.Serial];
		if (!Platform.Accessories[s]) {       // known serial?
			n = cleanUmlauts(m[MatchType.Name]);
			if (Platform.VerboseLogging) {
				Platform.log('Adding Sensor "' + n + '" with Serial ' + s + '.');
			}

			Platform.addAccessory(n, s);        // no! >> so we've to add new accessory!
			c++;
		}

		m = r.exec(Platform.LastData);
	}

	Platform.log(c + ' Sensors created.');
	if (d > 0) {
		Platform.log.warn(d + ' Sensors deleted!');
	} else {
		Platform.log(d + ' Sensors deleted.');
	}
}

// ~~~ functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MobileAlerts.prototype.updateSensorData = function()
{
 var Platform = this;
 var i;   // id (serial)
 var a;   // accessory
 var r;   // regex
 var m;   // matches
 var b;   // boolean
 var p;   // postion
 var d;   // data 

	Platform.log('Updating Accessory Data...');
	for (var i in Platform.Accessories) {
		a = Platform.Accessories[i];
		s = a.getService(Service.AccessoryInformation);
		c = s.getCharacteristic(Characteristic.SerialNumber);
		r = undefined;

		if(a.getService(Service.LeakSensor)) {
			s = a.getService(Service.LeakSensor);
			switch (parseInt(c.value.substr(0, 2), 16)) {
				case Platform.DeviceTypes.MA10350:
					r = MA10350_LEAK.replace(/%SERIAL%/gi, c.value);
					break;
			}

			if (r) {
				r = new RegExp(r, 'gi');
				m = r.exec(Platform.LastData);
				if (m) {
					b = true;
					s.setCharacteristic(
					Characteristic.LeakDetected,
						(
							m[1] == 'Trocken' ||
							m[1] == 'Dry' ||
							m[1] == 'Aride'
						) ?
						Characteristic.LeakDetected.LEAK_NOT_DETECTED :
						Characteristic.LeakDetected.LEAK_DETECTED
					);

					if (Platform.VerboseLogging) {
						Platform.log('Setting Leack Detection Value to "' + m[1]  + '" for Sensor ' + a.displayName + '.');
					}
				}
			}
		}

		if(a.getService(Service.ContactSensor)) {
			s = a.getService(Service.ContactSensor);
			switch (parseInt(c.value.substr(0, 2), 16)) {
				case Platform.DeviceTypes.MA10800:
					r = MA10800.replace(/%SERIAL%/gi, c.value);
					break;
			}

			if (r) {
				r = new RegExp(r, 'gi');
				m = r.exec(Platform.LastData);
				if (m) {
					b = true;
					s.setCharacteristic(
					Characteristic.ContactSensorState,
						(
							m[1] == 'Geschlossen' ||
							m[1] == 'Closed' ||
							m[1] == 'Fermé'
						) ?
						Characteristic.ContactSensorState.CONTACT_DETECTED :
						Characteristic.ContactSensorState.CONTACT_NOT_DETECTED
					);

					if (Platform.VerboseLogging) {
						Platform.log('Setting Contact State Value to "' + m[1]  + '" for Sensor ' + a.displayName + '.');
					}
				}
			}
		}

		if(a.getService(Service.TemperatureSensor)) {
			s = a.getService(Service.TemperatureSensor);
			switch (parseInt(c.value.substr(0, 2), 16)) {
				case Platform.DeviceTypes.MA10006:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10006_TEMPERATURE_INSIDE.replace(/%SERIAL%/gi, c.value) :
						MA10006_TEMPERATURE_OUTSIDE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

				case Platform.DeviceTypes.MA10100:
					r = MA10100_TEMPERATURE.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10120:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10120_TEMPERATURE_INSIDE.replace(/%SERIAL%/gi, c.value) :
						MA10120_TEMPERATURE_OUTSIDE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

				case Platform.DeviceTypes.MA10200:
				case Platform.DeviceTypes.MA10230:
				case Platform.DeviceTypes.MA10232:
				case Platform.DeviceTypes.WH30_3312_02:
					r = MA10200_TEMPERATURE.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10320:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10320_TEMPERATURE.replace(/%SERIAL%/gi, c.value) :
						MA10320_TEMPERATURE_CABLE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

				case Platform.DeviceTypes.MA10350:
					r = MA10350_TEMPERATURE.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10421:
					p = c.value.indexOf('-');
					switch (true) {
						case c.value.indexOf('-1') >= 0:
							r = MA10421_TEMPERATURE_1.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break; 

						case c.value.indexOf('-2') >= 0:
							r = MA10421_TEMPERATURE_2.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break; 

						case c.value.indexOf('-3') >= 0:
							r = MA10421_TEMPERATURE_3.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break;
						
						default:
							r = MA10421_TEMPERATURE.replace(/%SERIAL%/gi, c.value);
							break;
					}
					break;

				case Platform.DeviceTypes.MA10450:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10450_TEMPERATURE.replace(/%SERIAL%/gi, c.value) :
						MA10450_TEMPERATURE_CABLE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

				case Platform.DeviceTypes.MA10700:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10700_TEMPERATURE.replace(/%SERIAL%/gi, c.value) :
						MA10700_TEMPERATURE_CABLE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

			}

			if (r) {
				r = new RegExp(r, 'gi');
				m = r.exec(Platform.LastData);
				if (m) {
					d = parseFloat(m[1].replace(/,/gi, '.'));
					if (!isNaN(d)) {
						b = true;
						s.getCharacteristic(Characteristic.CurrentTemperature).setProps({ minValue: -100 });
						s.setCharacteristic(Characteristic.CurrentTemperature, d);

						if (Platform.VerboseLogging) {
							Platform.log('Setting Temperature Value to ' + parseFloat(m[1].replace(/,/gi, '.'))  + '° for Sensor ' + a.displayName + '.');
						}
					} else {
						Platform.log.warn('Could not get valid Temperature Value for Sensor ' + a.displayName + '!');
					}
				}
			}
		}

		if(a.getService(Service.HumiditySensor)) {
			s = a.getService(Service.HumiditySensor);
			switch (parseInt(c.value.substr(0, 2), 16)) {
				case Platform.DeviceTypes.MA10006:
					p = c.value.indexOf('-');
					r = (p < 0) ?
						MA10006_HUMIDITY_INSIDE.replace(/%SERIAL%/gi, c.value) :
						MA10006_HUMIDITY_OUTSIDE.replace(/%SERIAL%/gi, c.value.substr(0, --p));
					break;

				case Platform.DeviceTypes.MA10200:
				case Platform.DeviceTypes.MA10230:
				case Platform.DeviceTypes.MA10232:
				case Platform.DeviceTypes.WH30_3312_02:
					r = MA10200_HUMIDITY.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10320:
					r = MA10320_HUMIDITY.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10350:
					r = MA10350_HUMIDITY.replace(/%SERIAL%/gi, c.value);
					break;

				case Platform.DeviceTypes.MA10421:
					p = c.value.indexOf('-');
					switch (true) {
						case c.value.indexOf('-1') >= 0:
							r = MA10421_HUMIDITY_1.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break; 

						case c.value.indexOf('-2') >= 0:
							r = MA10421_HUMIDITY_2.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break; 

						case c.value.indexOf('-3') >= 0:
							r = MA10421_HUMIDITY_3.replace(/%SERIAL%/gi, c.value.substr(0, --p));
							break;
						
						default:
							r = MA10421_HUMIDITY.replace(/%SERIAL%/gi, c.value);
							break;
					}
					break;

				case Platform.DeviceTypes.MA10700:
					r = MA10700_HUMIDITY.replace(/%SERIAL%/gi, c.value);
					break;
			}

			if (r) {
				r = new RegExp(r, 'gi');
				m = r.exec(Platform.LastData);
				if (m) {
					d = parseInt(m[1]);
					if (!isNaN(d)) {
						b = true;
						s.setCharacteristic(Characteristic.CurrentRelativeHumidity, d);

						if (Platform.VerboseLogging) {
							Platform.log('Setting Humidity Value to ' + parseInt(m[1])  + '% for Sensor ' + a.displayName + '.');
						}
					} else {
						Platform.log.warn('Could not get valid Humidity Value for Sensor ' + a.displayName + '!');
					}
				}
			}

			if (!b) {
				Platform.log.warn('Could not get Data for Sensor ' + a.displayName + '!');
			}
		}
	}
}

MobileAlerts.prototype.fetchData = function()
{
 var Platform = this;
 var r;   // request

	Platform.log('Fetching Data...');
	r = require('request');
	r(	{
			method: 'POST',
			url: 'https://measurements.mobile-alerts.eu/',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'User-Agent': 'MobileAlertsFetcher/1.0'
			},
			body: 'phoneid=' + Platform.Config.iphoneid
		},
		function (myError, myResponse, myBody) {
			switch (true) {
				case myResponse && myResponse.statusCode == 200:
					if (Platform.LogBodyHTML) {
						Platform.log('We\'ll update Sensor Data from the following HTML Body:');
						myBody.split('\n').forEach(function(myLine) { Platform.log(myLine); });
					}

					Platform.LastData = myBody;
					Platform.updateSensorData();
					break;

				default:
					Platform.log.warn('There was an Error requesting initial Data: ' + (myError || 'HTTP Status Code is ' + myResponse.statusCode));
					break;
			}
		}.bind(this)
	);

	setTimeout(Platform.fetchData.bind(this), POLLING_INTERVAL);
}

MobileAlerts.prototype.configureAccessory = function(myAccessory) {
 var Platform = this;
 var s;   // service
 var c;   // characteristic

	Platform.log(myAccessory.displayName, 'is being configured.');

	s = myAccessory.getService(Service.AccessoryInformation);
	c = s.getCharacteristic(Characteristic.SerialNumber);
	Platform.Accessories[c.value] = myAccessory;

	myAccessory.reachable = false;
	myAccessory.on('identify', function(isPaired, myCallback) {
		Platform.log(myAccessory.displayName, 'is being identified.');
		myCallback();
	});
}

MobileAlerts.prototype.addAccessory = function(myName, mySerial) {
 var Platform = this;
 var u;   // uuid
 var a;   // accessory
 var s;   // service
 var c;   // characteristic
 var t;   // type

	Platform.log('Adding Accessory ' + myName + '.');

	t = parseInt(mySerial.substr(0, 2), 16);
	Platform.log('Adding Accessory ' + t + '.');
	u = UUIDGen.generate(myName);
	a = new Accessory(myName, u);
	a.on('identify', function(isPaired, myCallback) {
		Platform.log(myName, 'is being identified.');
		myCallback();
	});

	s = a.getService(Service.AccessoryInformation);
	s.setCharacteristic(Characteristic.Manufacturer, Platform.Manufacturer)
	s.setCharacteristic(Characteristic.SerialNumber, mySerial);
	for (var i in Platform.DeviceTypes) {
		if (t == Platform.DeviceTypes[i]) {
			s.setCharacteristic(Characteristic.Model, i);
		}
	}

	switch (t) {
		case Platform.DeviceTypes.MA10006:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			s = a.addService(Service.HumiditySensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				Platform.addAccessory(myName + ' (Out)', mySerial + '-OUT');
			}
			break;

		case Platform.DeviceTypes.MA10120:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				Platform.addAccessory(myName + ' (Out)', mySerial + '-OUT');
			}
			break;

		case Platform.DeviceTypes.MA10100:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			break;

		case Platform.DeviceTypes.MA10200:
		case Platform.DeviceTypes.MA10230:
		case Platform.DeviceTypes.MA10232:
		case Platform.DeviceTypes.WH30_3312_02:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			s = a.addService(Service.HumiditySensor, a.displayName);
			break;

		case Platform.DeviceTypes.MA10320:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				s = a.addService(Service.HumiditySensor, a.displayName);
				Platform.addAccessory(myName + ' (Cable)', mySerial + '-CABLE');
			}
			break;

		case Platform.DeviceTypes.MA10350:
			s = a.addService(Service.LeakSensor, a.displayName);
			s = a.addService(Service.TemperatureSensor, a.displayName);
			s = a.addService(Service.HumiditySensor, a.displayName);
			break;

		case Platform.DeviceTypes.MA10421:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			s = a.addService(Service.HumiditySensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				Platform.addAccessory(myName + ' (1)', mySerial + '-1');
				Platform.addAccessory(myName + ' (2)', mySerial + '-2');
				Platform.addAccessory(myName + ' (3)', mySerial + '-3');
			}
			break;

		case Platform.DeviceTypes.MA10450:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				Platform.addAccessory(myName + ' (Cable)', mySerial + '-CABLE');
			}
			break;

		case Platform.DeviceTypes.MA10700:
			s = a.addService(Service.TemperatureSensor, a.displayName);
			if (mySerial.indexOf('-') < 0) {
				s = a.addService(Service.HumiditySensor, a.displayName);
				Platform.addAccessory(myName + ' (Cable)', mySerial + '-CABLE');
			}
			break;

		case Platform.DeviceTypes.MA10800:
			s = a.addService(Service.ContactSensor, a.displayName);
			break;
	}

	Platform.Accessories[mySerial] = a;
	Platform.Api.registerPlatformAccessories("homebridge-mobilealerts", "MobileAlerts", [a]);
}

MobileAlerts.prototype.removeAccessory = function(mySerial)
{
 var Platform = this;
 var a;   // accessory
 var i;   // index

	a = Platform.Accessories[mySerial];
	if (!a) {
		return;
	}

	Platform.log.warn('Removing Accessory ' + a.displayName + '.');

  i = Platform.Accessories.indexOf(a);
  Platform.Accessories.splice(i, 1);
  Platform.Api.unregisterPlatformAccessories("homebridge-mobilealerts", "MobileAlerts", [a]);
  delete Platform.Accessories[mySerial];    //wichtig, sonst funktioniert reset nicht, da a bislang nicht eigentlich entfernt wurde
}

function cleanUmlauts(myName) {
	myName=myName.replace(/&#228;/g, "ä");
	myName=myName.replace(/&#246;/g, "ö");
	myName=myName.replace(/&#252;/g, "ü");
	myName=myName.replace(/&#196;/g, "Ä");
	myName=myName.replace(/&#214;/g, "Ö");
	myName=myName.replace(/&#220;/g, "Ü");
	myName=myName.replace(/&#223;/g, "ß");
	myName=myName.replace(/\(/g, "");
	myName=myName.replace(/\)/g, "");
	myName=myName.replace(/ /g, "");

	return myName;
}