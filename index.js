
require('dotenv').config();
require('./server');
require('./db_connection');
require('./binance_connection');



const { binance } = require('./binance_connection');


async function asyncCall() {
    let ticker = await binance.prices();
    return prices
};

const b;
binance.balance((error, balances) => {
    if (error) return console.error(error);
    // console.info("balances()", balances);
    const balance = {};
    for (asset in balances){
        if (balances[asset]['available'] > 0 || balances[asset]['onOrder'] > 0 ){
            let num = Number(balances[asset]['available']) + Number(balances[asset]['onOrder']);
            balance[asset] = num
        }
    }
    console.log(balance)
});



