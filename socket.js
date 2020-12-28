const { binance } = require('./binance_connection');
const {isHammer} = require("./type_strategies")


exports.Socket = function openSocket() {
    binance.websockets.chart("ETHBTC", "1h", (symbol, interval, chart) => {
        let tick = binance.last(chart);
        const last = chart[tick].close;
        //console.info(chart);
        // Optionally convert 'chart' object to array:
        let ohlc = binance.ohlc(chart);

        // console.info(`${symbol},open ${ohlc["open"][498]},${ohlc["open"][499]}
    // close ${ohlc["close"][498]}  ${ohlc["close"][499]}`);
        isHammer(ohlc["open"][498], ohlc["high"][498], ohlc["close"][498], ohlc["low"][498]);
        // console.info(symbol + " last price: " + last);

    })
};

