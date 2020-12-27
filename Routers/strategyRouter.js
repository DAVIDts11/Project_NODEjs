const { Router } = require('express');

const {strategyController}= require('../conrollers/strategy.ctrl');

const StrategyRouter= new Router;

// StrategyRouter.get('/', strategyController.getStrategies);
// StrategyRouter.get('/:id', strategyController.getStrategy);
StrategyRouter.post('/', strategyController.addStrategy);
// StrategyRouter.put('/:id', strategyController.updateStrategy);
// StrategyRouter.delete('/:id', strategyController.deleteStrategy);

exports.StrategyRouter = StrategyRouter;