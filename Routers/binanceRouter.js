const { Router } = require('express');

const {BinanceController}= require('../Controllers/binance.ctrl');

const BinanceRouter= new Router;


BinanceRouter.get('/connect', BinanceController.connectBinance);
BinanceRouter.post('/buyMarket', BinanceController.buyMarket);
BinanceRouter.post('/sellMarket', BinanceController.sellMarket);
BinanceRouter.get('/getPriceForSymbol', BinanceController.getPriceForSymbol);
// BinanceRouter.put('/:id', BinanceController.updateB);
// BinanceRouter.delete('/:id', BinanceController.deleteB);

module.exports.BinanceRouter = BinanceRouter;