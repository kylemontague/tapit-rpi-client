const gpio = require('rpi-gpio')

const events = require('events');
let emitter = new events.EventEmitter();


let gpiop = gpio.promise;


let TAP_CHANNELS = []
let TIMERS = {}
let ROTATIONS = {}
let ROTATION_VOLUME = 0.2 //10ml
let TIMEOUT = 2000 // 2 seconds

gpio.on('change', function(channel, value){
    clearTimeout(TIMERS.channel)
    TIMERS.channel = setTimeout(() => {
        console.log(`tap ${channel}`);
        emitter.emit("served",{tap:channel,volume:getVolume(channel)})
    },TIMEOUT)
    incrementTap(channel)
    emitter.emit("serving",{tap:channel,volume:getVolume(channel)})

});


function init(channels = []){
    TAP_CHANNELS = channels
    console.log(TAP_CHANNELS)
    reset()
}

async function reset(){
    //initialize the flow meters. 

    for(channel of TAP_CHANNELS){

        await gpiop.setup(channel,gpio.DIR_IN,gpio.EDGE_FALLING)
            .then(() => {
                console.log(`${channel} setup`)
                // TIMERS.channel = setTimeout(() => {
                //     console.log('init timer:'+channel);
                //   },500)
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
    ROTATIONS.channel = rotations
}

function incrementTap(channel){
    ROTATIONS.channel += 1
}

function getVolume(channel){
    return ROTATIONS.channel * ROTATION_VOLUME
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
