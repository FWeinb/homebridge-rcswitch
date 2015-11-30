# homebridge-rcswitch

Add support for rc switches using [rcswitch](https://github.com/marvinroger/node-rcswitch)

# Installation

1. Install [WiringPi](https://projects.drogon.net/raspberry-pi/wiringpi/download-and-install/)
2. Install homebridge using: `npm install -g homebridge`
3. Install this plugin using: `npm install -g homebridge-rcswitch`
4. Update your configuration file.

# Configuration

You can add as many switches as you like. You will need to pass the `name`, `systemcode` and `unitcode`.
This plugin assumes that you connect the 433Mhz transmitter to GPIO0, this can be changed via the `pin` propertie. 

 ```
 "accessories": [
     {
       "accessory": "RcSwitch",
       "name": "Switch One",
       "systemcode": "11101", 
       "unitcode": 1,
       "pin": 0
     }
]
```