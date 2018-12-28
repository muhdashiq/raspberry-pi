var Gpio = require("onoff").Gpio;
var greenLight = new Gpio(4, 'out');
var redLight = new Gpio(26, 'out');

function dingDong() {
	let redLightStatus = redLight.readSync();
	let greenLightStatus = greenLight.readSync();
	if(!redLightStatus) {
		redLight.writeSync(1);
	} else if(!greenLightStatus)  {
		greenLight.writeSync(1);
	} else {
		redLight.writeSync(0);
		greenLight.writeSync(0);
	}
}

let interval = setInterval(dingDong,1000);

function endLight() {
	clearInterval(interval);
	greenLight.writeSync(0);
	redLight.writeSync(0);
	greenLight.unexport();
	redLight.unexport();
}

setTimeout(endLight, 20000);

process.on('SIGINT',endLight);
