const gpio = require('rpi-gpio')



let TAP_CHANNELS = []
const ROTATIONS = {}
let ROTATION_VOLUME = 10 //10ml

function init(channels = []){
    TAP_CHANNELS = channels
    reset()
}

function reset(){
    gpio.destroy()
    //initialize the flow meters. 
    for(channel of TAP_CHANNELS){
        gpio.setup(channel,gpio.DIR_IN,gpio.EDGE_FALLING)
            .then(() => {
                console.log(`${channel} setup`)
            })
            .catch((err) => {
                console.error(err.toString())
            })
        resetTap(channel) // initialize the tap rotation counter
    }

    //register an on `change` listener for the taps
    gpio.on('change', function(channel, value){
        console.log(`channel: ${channel}, value: ${value}`)
    });

    
}

/**
 * 
 * @param {Number} vpr Volume per rotation in milliliters 
 */
function setVPR(vpr){
    if(vpr > 0)
        ROTATION_VOLUME = vpr
}

/**
 * Calculate the volume of liquid that have passed through the meter.
 * @param {Number} r Rotations
 * @param {Number} vpr Volume per rotation in milliliters 
 */
function calculateVolume(r,vpr = ROTATION_VOLUME){
    return r * vpr
}


/**
 * 
 * @param {Number} channel Tap channel
 */
function resetTap(channel){
    setTap(channel,0)
}


/**
 * 
 * @param {Number} channel Tap channel
 * @param {Number} rotations total number of rotations for that tap
 */
function setTap(channel,rotations = 0){
    ROTATIONS.channel = rotations
}


module.exports = {
    init,
    reset,
    setVPR,
    setTap,
    resetTap,
    calculateVolume
}