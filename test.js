const sensor = require('ds18b20-raspi');

function readData(){
    let tempC = sensor.readSimpleC()
    console.log(`${tempC} degC`)
}

setInterval(readData(),1000)

