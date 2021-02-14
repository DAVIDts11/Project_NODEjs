const { binance } = require('./binance_connection');
const {isHammer} = require("./type_strategies")


let last = {};
let sockets = {};
exports.Socket = function openSocket(currencyStr,strategyID) {
    binance.websockets.chart(currencyStr, "2h", (symbol, interval, chart) => {
        let tick = binance.last(chart);
        last[currencyStr] = chart[tick].close;
        if (!sockets[currencyStr]){
            sockets[currencyStr]=[];
        }
        sockets[currencyStr].push(strategyID);
        //console.info(chart);
        // Optionally convert 'chart' object to array:
        let ohlc = binance.ohlc(chart);

        isHammer(ohlc["open"][498], ohlc["high"][498], ohlc["close"][498], ohlc["low"][498]);
        // console.info(symbol + " last price: " + last);

    })
};

exports.last =last;
exports.sockets = sockets;