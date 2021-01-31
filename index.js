
require('dotenv').config();
require('./server');
require('./db_connection');
require('./binance_connection');

const { binance } = require('./binance_connection');
require("./type_strategies");



//lastest price:
// let pair  = 'BNBBTC';
// binance.prices(pair, (error, ticker) => {
//     console.info("Price of BNB: ", ticker[pair]);
//   });



// binance.bookTickers('BNBBTC', (error, ticker) => {
//     console.info( ticker["bidPrice"]);
//   });


async function getAllBalances() {
    return await binance.balance();
};



async function getAllPrices() {
    return await binance.prices();
};

async function getAllOpenOrders() {
    return await binance.openOrders();
};


function getRelevantBalance(balances) {
    const balance = {};
    for (asset in balances) {
        if (balances[asset]['available'] > 0 || balances[asset]['onOrder'] > 0) {
            let num = Number(balances[asset]['available']) + Number(balances[asset]['onOrder']);
            balance[asset] = num;
        }
    }
    return balance;
};


//Getting All Balances:
(async () => {
    const balances = await getAllBalances();
    //console.log(balances);
    console.log(getRelevantBalance(balances));
})();


(async () => {
    const openOrders = await getAllOpenOrders();
    console.log(openOrders);
})();

