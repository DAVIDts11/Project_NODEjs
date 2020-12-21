
require('dotenv').config();
require('./server');
require('./db_connection');
require('./binance_connection');

const { binance } = require('./binance_connection');

async function getAllBalances() {
    return await binance.balance();
};

async function getPrices() {
    return await binance.prices();
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


(async () => {
    const prices = await getPrices();
    for (pair in prices) {
        if (pair.endsWith('BTC'))
            {}
            // console.log(pair);
    }
}) ();


(async () => {
    const balances = await getAllBalances();
    console.log(getRelevantBalance(balances));
}) ();

