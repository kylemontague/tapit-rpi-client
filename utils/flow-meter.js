const gpio = require('rpi-gpio')
let gpiop = gpio.promise;

gpio.on('change', function(channel, value){
    timeout.refresh()
    incrementTap(channel)
    printVolume(channel)
});


const timeout = setTimeout(() => {
    console.log('tap timeout');
  },2000);

timeout.unref()


let TAP_CHANNELS = []
let ROTATIONS = {}
let ROTATION_VOLUME = 0.2 //10ml

function init(channels = []){
    TAP_CHANNELS = channels
    console.log(TAP_CHANNELS)
    reset()
}

function reset(){
    //initialize the flow meters. 
    for(channel of TAP_CHANNELS){
        console.log('setting up pin:'+channel)
        gpiop.setup(channel,gpio.DIR_IN,gpio.EDGE_FALLING)
            .then(() => {
                console.log(`${channel} setup`)
            })
            .catch((err) => {
                console.error(err.toString())
            })
        resetTap(channel) // initialize the tap rotation counter
    }
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

function incrementTap(channel){
    ROTATIONS.channel += 1
}

function printVolume(channel){
    console.log(ROTATIONS.channel * ROTATION_VOLUME+ "ml")
}

module.exports = {
    init,
    reset,
    setVPR,
    setTap,
    resetTap,
    calculateVolume
}
