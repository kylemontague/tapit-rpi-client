const gpio = require('rpi-gpio')

const events = require('events');
let emitter = new events.EventEmitter();


let gpiop = gpio.promise;


let TAP_CHANNELS = []
let TIMERS = {}
let ROTATIONS = {}
let ROTATION_VOLUME = 0.22 //10ml
let TIMEOUT = 2000 // 2 seconds
let MIN_VOLUME = 30 // 30ml

gpio.on('change', function(channel, value){
    clearTimeout(TIMERS[channel])
    TIMERS[channel] = setTimeout(() => {
        if(getVolume(channel)>= MIN_VOLUME){
            emitter.emit("served",{tap:channel,volume:getVolume(channel)})
        }else{
            resetTap(channel)
        }
    },TIMEOUT)
    incrementTap(channel)
    emitter.emit("serving",{tap:channel,volume:getVolume(channel)})

});


function init(channels = []){
    TAP_CHANNELS = channels
    reset()
}

async function reset(){
    //initialize the flow meters. 
    for(channel of TAP_CHANNELS){

        await gpiop.setup(channel,gpio.DIR_IN,gpio.EDGE_FALLING)
            .then(() => {
                console.log(`${channel} setup`)
                resetTap(channel) // initialize the tap rotation counter
            })
            .catch((err) => {
                console.error(err.toString())
            })
        }
}


function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
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
    ROTATIONS[channel] = rotations
}

/**
 * 
 * @param {Number} volume value in milliliters to set the minimum volume to. Default is 30ml
 */
function setMinimumVolume(volume){
    if(volume >= 10){
        MIN_VOLUME = volume
    }
}


function incrementTap(channel){
    ROTATIONS[channel] += 1
}

/**
 * 
 * @param {Number} channel get the volume in milliliters for a specific tap.
 */
function getVolume(channel){
    return ROTATIONS[channel] * ROTATION_VOLUME
}

module.exports = {
    init,
    reset,
    setVPR,
    setTap,
    resetTap,
    calculateVolume,
    emitter,
}
