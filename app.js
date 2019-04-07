const flow = require('./utils/flow-meter')
const api = require('./utils/tapit-web-client')

const TAP_1_CHANNEL = 3
const TAP_2_CHANNEL = 4
const TAP_3_CHANNEL = 5

const TAP_CHANNELS = [TAP_1_CHANNEL]


const tapID = "5c9f520a82055ce8f9a11c7e"


api.setAPIKey("")


function initTaps(){
    flow.init(TAP_CHANNELS)
    flow.emitter.on("served",(data) =>{
        console.log(`tap:${data.tap}, volume:${data.volume}`)
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

initTaps()

module.exports = {

}