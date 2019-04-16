require('dotenv').config()
const Monzo = require('monzo-js');


const monzo = new Monzo(process.env.MONZO_ACCESS_TOKEN)
const clientId = process.env.MONZO_CLIENT_ID
const clientSecret = process.env.MONZO_CLIENT_SECRET
const dedupe_id = "KYLE"+Math.random()




Monzo.OAuth.usingClientCredentials(clientId, clientSecret).then(data => {
    console.log(data);
    //payMe(process.env.MONZO_ACCOUNT_ID,process.env.MONZO_POT_ID,250,dedupe_id)
}).catch(err => {
    console.error(err)
})


function payMe(accountID,potID,amount,dedupe_id){
    monzo.pots.deposit(potID,accountID,amount,dedupe_id).then(data =>{
        console.log(data)
    })
    .catch(err =>{
        console.error(err)
        console.log("free beer")
    })


}