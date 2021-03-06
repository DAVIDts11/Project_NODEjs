const { Router } = require('express');

const { BinanceController } = require('../Controllers/binance.ctrl');

const BinanceRouter = new Router;

BinanceRouter.get('/connect', BinanceController.connectBinance);
BinanceRouter.post('/marketOrder', BinanceController.marketOrder);
BinanceRouter.post('/limitOrder', BinanceController.limitOrder);
BinanceRouter.get('/getPriceForSymbol/:symbol', BinanceController.getPriceForSymbol);
BinanceRouter.get('/getBTCUSD', BinanceController.getBTCUSD);

module.exports.BinanceRouter = BinanceRouter;