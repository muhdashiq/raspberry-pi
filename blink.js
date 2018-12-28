var Gpio = require("onoff").Gpio;
var light = new Gpio(4, 'out');
var redLight = new Gpio(26,'out');
var lightSwitch = new Gpio(17,'in');

function lightUp(){
	const status = lightSwitch.readSync();
	console.log('Switch status: ' + status);
	if(status) {
		light.writeSync(1);
		redLight.writeSync(0);
	} else {
		redLight.writeSync(1);
		light.writeSync(0);
	}	
}

//lightUp();
//var blinkInterval = setInterval(lightUp,100);
while(true) {
	lightUp();
}	

function endLight() {
	//clearInterval(blinkInterval);
	light.writeSync(0);
	light.unexport();
	redLight.writeSync(0);
	redLight.unexport();
}	
//setTimeout(endLight, 10000);
process.on('SIGINT',endLight);
