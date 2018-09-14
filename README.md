# homebridge-mobilealerts 

<span class="badge-paypal"><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MRG4QXJBLRV8N" title="Donate to this project using Paypal"><img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" /></a></span>

This is a homebridge plugin for several Mobile-Alerts (Technoline) devices

# Installation
1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-mobilealerts
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration
Configuration sample:

 ```
"platforms": [
    {
        "platform": "MobileAlerts",
        "name": "MobileAlerts",
        "iphoneid": "YOURIPHONEID"
    }
]
```

To retrieve your iPhone ID please follow following guide:
1. Open your Mobile Alerts app.
2. Go to "Settings".
3. Scroll down to find your iPhone ID. 

# Currently Supported Devices
- MA 10006
- MA 10100
- MA 10200
- MA 10320
- MA 10350
- MA 10700