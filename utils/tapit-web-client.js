let Request = require('rest-request');
let restAPI = new Request('https://b70489c0.ngrok.io/api/v1');

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
    return restAPI.post("servings/create/",{tap:tap,volume:volume})
}


module.exports = {
    setAPIKey,
    addServing
}