// ref: https://webofthings.org/2016/10/23/node-gpio-and-the-raspberry-pi/


// Import the onoff library
var onoff = require('onoff');
// 
var Gpio = onoff.Gpio;
// declare an array to keep track of plug states 
var pins = [];

exports.initialize = function (pin) {
  // Initialize the pin to be an output pin
  pins[pin] = new Gpio(pin, 'out'); 
}

exports.toggle = function (pin) {
  // Synchronously read the value of the pin and transform 1 to 0 or 0 to 1
  var value = (pins[pin].readSync() + 1) % 2;
  // Asynchronously write the new value to pin 4
  pins[pin].write(value, function() {
    console.log("Changed pin " + pin + " state to: " + value);
  });
  return value;  
}

exports.getState = function (pin) {
  // Synchronously read the value of the pin
  var value = pins[pin].readSync()
  return value
}


// Listen to the event triggered on CTRL+C
process.on('SIGINT', function () {
  // Cleanly close the GPIO pins before exiting
  pins.forEach(function (pin, index) {
    pin.writeSync(0);
    pin.unexport();
    console.log('Closed pin ' + pin);
  });
  console.log('Bye, bye!');
  process.exit();
});

