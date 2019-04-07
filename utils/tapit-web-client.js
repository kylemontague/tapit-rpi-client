let Request = require('rest-request');
let restAPI = new Request('https://4663e8b1.ngrok.io/api/v1');

let API = ""

function setAPIKey(key){
    API = key
}

function getHeaders(){
    return {api_key:API}
}

function places(){
    return restAPI.get("places",{},getHeaders())
}

function tapsAtPlace(place){
    return restAPI.get("places/:id/taps",{id:place},getHeaders())
}

function addServing(tap,volume){
    return restAPI.post("serving/create/",{tap:tap,volume:volume})
}


module.exports = {
    setAPIKey,
    addServing
}