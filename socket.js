const { isHammer } = require("./type_strategies")
const { isThreewhitesoldiers } = require("./type_strategies")
const { isPiercingline } = require("./type_strategies")

let last = {};

exports.Socket = function openSocket(thisBinance, currencyStr, strategyID) {
    const socketID = thisBinance.websockets.chart(currencyStr, "2h", (symbol, interval, chart) => {
        let tick = thisBinance.last(chart);
        last[currencyStr] = chart[tick].close;
        let ohlc = thisBinance.ohlc(chart);

        isHammer(ohlc["open"][498], ohlc["high"][498], ohlc["close"][498], ohlc["low"][498]);

        const open = [ohlc["open"][498], ohlc["open"][497], ohlc["open"][496]];
        const high = [ohlc["high"][498], ohlc["high"][497], ohlc["high"][496]];
        const close = [ohlc["close"][498], ohlc["close"][497], ohlc["close"][496]];
        const low = [ohlc["low"][498], ohlc["low"][497], ohlc["low"][496]];

        isThreewhitesoldiers(open, high, close, low);
        isPiercingline(open, high, close, low);
    })
    return socketID;
};

exports.last = last;
