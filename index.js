
require('dotenv').config();
require('./server');
require('./db_connection');
require('./binance_connection');



const { binance } = require('./binance_connection');


async function getPrices() {
    let prices = await binance.prices();
    // console.log(prices);
    return prices;
};

function getBalance(balances) {
    const balance = {};
    for (asset in balances) {
        if (balances[asset]['available'] > 0 || balances[asset]['onOrder'] > 0) {
            let num = Number(balances[asset]['available']) + Number(balances[asset]['onOrder']);
            balance[asset] = num;
        }
    }
    return balance;
}

 binance.balance(
    (error, balances) => {
        if (error)
            return console.error(error);
        const balance = getBalance(balances);
        console.log(`Balance: %O`, balance);
    }
);



// (async () => {
//     const prices = await getPrices();
//     for (pair in prices) {
//         if (pair.endsWith('BTC'))
//             console.log(pair);
//     }
// })()


// totalValue();