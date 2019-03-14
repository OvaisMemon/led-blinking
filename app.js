const onoff = require('onoff');

var gpio = onoff.Gpio;
var led = new gpio(4,'out');
var interval;

interval = setInterval(function(){
  var value = (led.readSync() + 1) % 2;
  led.write(value, function(){
    console.log("Changed LED state to: " + value);
  });
},500);

process.on('SIGINT', function(){
  clearInterval();
  led.writeSync(0);
  led.unexport();
  console.log('Bye, bye!');
  process.exit();
});
