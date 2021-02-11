const { Router } = require('express');

const {BinanceController}= require('../Controllers/binance.ctrl');

const BinanceRouter= new Router;


BinanceRouter.get('/conect', BinanceController.conectBinance);
// BinanceRouter.get('/', BinanceController.getB);
// BinanceRouter.get('/:id', BinanceController.getB);
// BinanceRouter.put('/:id', BinanceController.updateB);
// BinanceRouter.delete('/:id', BinanceController.deleteB);

module.exports.BinanceRouter = BinanceRouter;