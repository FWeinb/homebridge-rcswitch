var rcswitch = require('rcswitch');

var Service, Characteristic;

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-rcswitch", "RcSwitch", RadioSwitch);
}

function RadioSwitch(log, config) {

  if (config.systemcode === undefined) {
    return log("Systemcode missing from configuration.");
  }
  if (config.unitcode  === undefined) {
    return log("Unitcode missing from configuration.");
  }
  if (config.name  === undefined) {
    return log("Name missing from configuration.");
  }

  rcswitch.enableTransmit(config.pin || 0);

  var switchOn = rcswitch.switchOn.bind(rcswitch, config.systemcode, config.unitcode);
  var switchOff = rcswitch.switchOff.bind(rcswitch, config.systemcode, config.unitcode);

  var informationService = new Service.AccessoryInformation();

  informationService
    .setCharacteristic(Characteristic.Name, "Raspberry-Projekt")
    .setCharacteristic(Characteristic.Manufacturer, "JadeHochschule")
    .setCharacteristic(Characteristic.Model, "v0.1")
    .setCharacteristic(Characteristic.SerialNumber, "0000000001");

  var state = false;
  var switchService = new Service.Switch(config.name);

  switchService
  .getCharacteristic(Characteristic.On)
  .on('set', function(value, callback) {
    state = value;
    if (state) {
      switchOn();
    } else {
      switchOff();
    }
    callback();
  });

  switchService
  .getCharacteristic(Characteristic.On)
  .on('get', function(callback){
    callback(null, state);
  });

   this.services = [ informationService, switchService ];
}


RadioSwitch.prototype = {
  getServices : function (){
    return this.services;
  }
}