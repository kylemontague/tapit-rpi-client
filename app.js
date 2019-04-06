const flow = require('./utils/flow-meter')
const googlehome = require('./utils/google-home')


const TAP_1_CHANNEL = 3
const TAP_2_CHANNEL = 4
const TAP_3_CHANNEL = 5

const TAP_CHANNELS = [TAP_1_CHANNEL]


function initTaps(){
    flow.init(TAP_CHANNELS)
    flow.emitter.on("served",(data) =>{
        console.log(`tap:${data.tap}, volume:${data.volume}`)
        googlehome.speak(`Kyle just poured ${Math.round(data.volume)}ml from tap ${data.tap}. Fuck Yeah!`)
    })

    flow.emitter.on("serving",(data) =>{
        console.log(`tap:${data.tap}, volume:${data.volume}`)
    })
}

initTaps()

module.exports = {

}