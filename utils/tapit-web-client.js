let Request = require('rest-request');
let restAPI = new Request('URL');

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
    return restAPI.post("serving/create/")
}
