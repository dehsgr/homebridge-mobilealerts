# homebridge-mobilealerts [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=MRG4QXJBLRV8N)

This is a homebridge plugin for several Mobile-Alerts (Technoline) devices

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-mobilealrts
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample file:

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

# Remarks
- Currently only MA 10006 and MA 10350 devices can be processed.
