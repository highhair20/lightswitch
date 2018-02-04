var express = require('express')
  , bodyParser = require('body-parser')
  , gpio = require('./gpio');

// initialize all pins
var pins = [4,17,27,22]
for (var i=0; i < pins.length; i++) {
  gpio.initialize(pins[i]); 
}

//
var app = express(); 
app.use(bodyParser.json());

// list stations and state
app.get('/station', function (req, res) {
  var re = []
  for (var i=0; i < pins.length; i++) {
    re.push({
      id : pins[i],
      state : gpio.getState(pins[i])
    });
  }
  res.send(re)
});

// toggle the state
app.put('/station/:id', function (req, res) {
  var id = parseInt(req.params.id)
  console.log(pins);
  console.log(id);
  console.log(pins.indexOf(id))
  if (pins.indexOf(id) == -1) {
    res.statusCode = 404;
    return res.json({ status: -100 });
  }
  var value = gpio.toggle(id)
  return res.json({ status : 1, state : value })
});
  
  
  

app.post('/receive', function (req, res) {
//   console.log(req.headers['x-amz-sns-message-type']);
  validateRequest(req.heaaders);
  
  switch (req.headers['x-amz-sns-message-type']) {
    case 'SubscriptionConfirmation':
      subscriptionConfirmation(req.body);
      break;
    case 'Notification':
      notification(req.body);
      break;
    case 'UnsubscribeConfirmation':
      unsubscribeConfirmation(req.body);
      break;
    
  }
  
  res.send({status: 'success'})
})


var PORT = process.argv[2] || 9000;
var server = app.listen(PORT, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});


function subscriptionConfirmation(body) {
  console.log(body);
  // visit SubscribeURL
  
}

function notification(body) {
  
}

function unsubscribeConfirmation(body) {
  
}