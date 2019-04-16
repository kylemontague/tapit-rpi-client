const flow = require('./utils/flow-meter')
const api = require('./utils/tapit-web-client')
const sensor = require('ds18b20-raspi');

const TAP_1_CHANNEL = 7
const TAP_2_CHANNEL = 11
const TAP_3_CHANNEL = 13

const TAP_CHANNELS = [TAP_1_CHANNEL,TAP_2_CHANNEL,TAP_3_CHANNEL]


const tapID = "5c9f520a82055ce8f9a11c7e"


api.setAPIKey("")
api.places().then(data => {console.log(data)})

function initTaps(){
    flow.init(TAP_CHANNELS)
    flow.emitter.on("served",(data) =>{
        let temp = readData()
        console.log(`tap:${data.tap}, volume:${data.volume}, temp:${temp}°C`)
        api.addServing(tapID,data.volume)
            .then(data =>{
                console.log(data)
            })
            .catch(err =>{
                console.error(err)
            })
    })

    flow.emitter.on("serving",(data) =>{
        console.log(`tap:${data.tap}, volume:${data.volume}`)
    })
}

function readData(){
    let tempC = sensor.readSimpleC()
    return tempC
}


initTaps()

module.exports = {

}