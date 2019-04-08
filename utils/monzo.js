require('dotenv').config()
const Monzo = require('monzo-js');


const monzo = new Monzo(process.env.MONZO_ACCESS_TOKEN)
const clientId = process.env.MONZO_CLIENT_ID
const clientSecret = process.env.MONZO_CLIENT_SECRET


Monzo.OAuth.usingClientCredentials(clientId, clientSecret).then(({access_token}) => {
    monzo.accounts.find(process.env.MONZO_ACCOUNT_ID).then(account => {

      });

      monzo.pots.all().then(pots => {
        for (const [id, pot] of pots) {
          console.log(`${pot.name}: ${pot.balance} ${pot.currency} ${pot.id}`);
        }
      });

      monzo.feed.createItem(process.env.MONZO_ACCOUNT_ID, 'How was your Pumpkin Pale Ale?', 'https://icon2.kisspng.com/20180426/qsq/kisspng-beer-glasses-computer-icons-drink-glass-of-beer-5ae2499e2cf493.0731664615247794221842.jpg');

}).catch(err => {
    console.error(err)
})
