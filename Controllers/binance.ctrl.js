const User = require('../Models/user');
const Binance = require('node-binance-api');
const {cryptr} = require("../config/passport_setup")

const binanceConectedList = [];

exports.BinanceController = {
    async conectBinance(req, res) {
        const decrypteBinanceKey = cryptr.decrypt(req.user.binance_key);
        const decrypteBinancePrivate = cryptr.decrypt(req.user.binance_private);
        console.log("dec key =",decrypteBinanceKey );
        console.log("dec private  =",decrypteBinancePrivate );
        const binance = await new Binance().options({
            APIKEY: decrypteBinanceKey,
            APISECRET: decrypteBinancePrivate,
            useServerTime: true
        });

        binanceConectedList.push({
            userID: req.user.id,
            binance : binance
        });
    }
}

exports.binanceConectedList = binanceConectedList;