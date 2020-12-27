
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
        if (pair.endsWith('BTC')) { }
        // console.log(pair);
    }
})();


(async () => {
    const balances = await getAllBalances();
    console.log(getRelevantBalance(balances));
})();

// // Intervals: 1m,3m,5m,15m,30m,1h,2h,4h,6h,8h,12h,1d,3d,1w,1M
// binance.candlesticks("ETHBTC", "5m", (error, ticks, symbol) => {
//     console.info("candlesticks()", ticks);
//     let last_tick = ticks[ticks.length - 1];
//     let [time, open, high, low, close, volume, closeTime, assetVolume, trades, buyBaseVolume, buyAssetVolume, ignored] = last_tick;
//     console.info(symbol+" last close: "+close);
//   }, {limit: 1, endTime: Date.now()});

function isHammer(open, high, close, low) {
    const hammer = require('technicalindicators').bullishinvertedhammerstick;
    console.log(`           open = ${Number(open)} 
                 close = ${Number(close)}
                 high = ${Number(high)}
                 low = ${Number(low)}`);
    let singleInput = {
        open: [Number(open)],
        high: [Number(high)],
        close: [Number(close)],
        low: [Number(low)],
    }

    const result = hammer(singleInput) ? 'yes' : 'no';
    console.log(`Is Bullish Inverted Hammer Pattern? : ${result}`);
}

function openSocket() {
    binance.websockets.chart("ETHBTC", "1h", (symbol, interval, chart) => {
        let tick = binance.last(chart);
        const last = chart[tick].close;
        //console.info(chart);
        // Optionally convert 'chart' object to array:
        let ohlc = binance.ohlc(chart);

        console.info(`${symbol},open ${ohlc["open"][498]},${ohlc["open"][499]}
    close ${ohlc["close"][498]}  ${ohlc["close"][499]}`);
        isHammer(ohlc["open"][498], ohlc["high"][498], ohlc["close"][498], ohlc["low"][498]);
        console.info(symbol + " last price: " + last);

    })
};
openSocket();
console.log("Hello David ");