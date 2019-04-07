let Request = require('rest-request');
var restAPI = new Request('http://192.168.2.194:8008');

var headers = { "Content-Type": "application/json" }


restAPI.get("setup/eureka_info","audio",headers)
.then(data =>{
    console.log(data)
}).catch(err =>{
    console.error(err)
})


function speak(text){
    device.speak(text).then(console.log(text))
}

module.exports = {
    speak
}