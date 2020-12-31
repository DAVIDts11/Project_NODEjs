
require('dotenv').config();
require('./server');
require('./db_connection');
require('./binance_connection');

const { binance } = require('./binance_connection');
require("./type_strategies");








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


// (async () => {
//     const prices = await getAllPrices();
//     for (pair in prices) {
//         if (pair.endsWith('BTC')) {
//             console.log(pair);
//         }

//     }
// })();




//Getting All Balances:
(async () => {
    const balances = await getAllBalances();
    //console.log(balances);
    console.log(getRelevantBalance(balances));
})();

(async () => {
    console.log("SELLING FOR OMRI");
    await binance.sell("IOTABTC", 10, 0.0000105, {type:"OCO",stopLimitPrice:0.0000101, stopPrice:0.0000101}, (error, response) => {
        console.info("RESPONSE:", response);
        console.info("ORDER_ID: ", response.orders[0].orderId, " ",  response.orders[1].orderId);
    } );
    //console.log(balances);
})();

    //Getting All Open:
    (async () => {
        const openOrders = await getAllOpenOrders();
        console.log(openOrders);
    })();
