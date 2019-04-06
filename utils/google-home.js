const GoogleHome = require('node-googlehome')

GoogleHome.search(1000)
    .then(resp => {
        console.log(resp)
})

let device = new GoogleHome.Connecter('192.168.2.194')

device.config({lang:'en'})

device.readySpeaker()
    .then(()=>{})

function speak(text){
    device.speak(text).then(console.log(text))
}

module.exports = {
    speak
}