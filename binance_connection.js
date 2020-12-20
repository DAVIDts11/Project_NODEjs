const Binance = require('node-binance-api');
const consts = require('./constants');


const binance = new Binance().options({
  APIKEY: consts.BINANCE_API_TEMP.BINANCE_KEY,
  APISECRET: consts.BINANCE_API_TEMP.BINANCE_PRIVATE 
});


exports.binance = binance;