const flow = require('./utils/flow-meter')
const tapModel = db.tap

const TAP_1_CHANNEL = 3
const TAP_2_CHANNEL = 4
const TAP_3_CHANNEL = 5

const TAP_CHANNELS = [TAP_1_CHANNEL]


function initTaps(){
    flow.init(TAP_CHANNELS)
}

initTaps()

module.exports = {

}