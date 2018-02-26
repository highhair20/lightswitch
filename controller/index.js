var express = require('express')
  , bodyParser = require('body-parser')
  , gpio = require('./gpio');

// initialize all pins and map pins to stations
var pins = {
  1:  4,
  2: 17,
  3: 27,
  4: 22
}
for (var i in pins) {
  gpio.initialize(pins[i]); 
}

//
// pulse the blue LED
var Gpio = require('pigpio').Gpio,
  led = new Gpio(pins[4], {mode: Gpio.OUTPUT}),
  dutyCycle = 0,
  phase = 'glo';
setInterval(function () {
  console.log(dutyCycle);
  led.pwmWrite(dutyCycle);
  if (phase == 'glo') {
    if (dutyCycle == 255) {
      phase = 'dim';
    } else {
      dutyCycle += 5;
    }
  } 
  if (phase == 'dim') {
    if (dutyCycle == 0) {
      phase = 'glo';
    } else {
      dutyCycle -= 5;
    }
  }
}, 20);



//
var app = express(); 
app.use(bodyParser.json());

//
// list stations and state
app.get('/station', function (req, res) {
  var re = []
  for (var i in pins) {
    console.log('pin: ' + i)
    re.push({
      id : i,
      state : gpio.getState(pins[i])
    });
  }
  res.send(re)
});

//
// get the state of the specified station
app.get('/station/:id', function (req, res) {
  var id = parseInt(req.params.id)
  if (!pins.hasOwnProperty(id)) {
    res.statusCode = 404;
    return res.json({ status: -100 });
  }
  var value = gpio.getState(pins[id])
  return res.json({ status : 1, state : value })
});

//
// toggle the station
app.put('/station/:id', function (req, res) {
  var id = parseInt(req.params.id)
  if (!pins.hasOwnProperty(id)) {
    res.statusCode = 404;
    return res.json({ status: -100 });
  }
  var value = gpio.toggle(pins[id])
  return res.json({ status : 1, state : value })
});
  
  
  



var PORT = process.argv[2] || 9000;
var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

