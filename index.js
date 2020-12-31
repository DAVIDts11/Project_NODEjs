
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

// binance.sell("IOTABTC", quantity, price, {type:'LIMIT'}, (error, response) => {
//   console.info("Limit Buy response", response);
//   console.info("order id: " + response.orderId);
// });



// set stop loss :
// let pair = "IOTABTC"
// let type = "OCO";
// let quantity = 10; //strategyInfo["amount"]; //* (100 - binanceCommitionPr)/100;
// let price = 0.00001255 ;  //((lastestPrice * (100 - strategyInfo["stop_loss"]) / 100).toFixed(8));
// let stopPrice =  0.001 ;//((price * 0.98).toFixed(8));
// let profit = 0.00001255 ;
// console.log(`pair = ${pair} order type = ${type} ,quantity = ${quantity} , price = ${price} , stopPrice = ${stopPrice} `);
// binance.sell(pair, quantity, price , { type: type ,  stopLimitPrice: 0.001, stopPrice:0.001} , (error, response) => {
//     console.info("SL response", response);
//     console.info("order id: " + response.orderId);
//     });

    // let type = "STOP_LOSS_LIMIT";
    // let quantity = 10;
    // let price = 0.00001000;
    // let stopPrice = 0.00001005;
    // binance.sell("IOTABTC", quantity, price, {stopPrice: stopPrice, type: type}, (error, response) => {
    //       console.info("SL response", response);
    //       console.info("order id: " + response.orderId);
    //       // Now you can limit sell with a stop loss, etc.
    //     });








    //binance.sell("IOTABTC", quantity, price); //.then(console.log("kjak1")).catch(console.log("kjak2"));
    //binance.marketSell("IOTABTC", quantity);

    // buy (market) order
    // let quantity = 0.3;
    // binance.marketBuy("BNBBTC", quantity, (error, response) => {
    //   console.info("Market Buy response", response);
    //   console.info("order id: " + response.orderId);
    //   // Now you can limit sell with a stop loss, etc.
    // });




    // type = "TAKE_PROFIT";
    // price = 0.00001105;
    // stopPrice = 0.00001108;
    // binance.sell("IOTABTC", quantity, price, {stopPrice: stopPrice, type: type});
    //Getting All Open:
    (async () => {
        const openOrders = await getAllOpenOrders();
        console.log(openOrders);
    })();

// // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
// binance.candlesticks("ETHBTC", "5m", (error, ticks, symbol) => {
//     console.info("candlesticks()", ticks);
//     let last_tick = ticks[ticks.length - 1];
//     let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//     console.info(symbol+" last close: "+close);
//   }, {limit: 1, endTime: Date.now()});
