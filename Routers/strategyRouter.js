const { Router } = require('express');


const {strategyController}= require('../Controllers/strategy.ctrl');

const StrategyRouter= new Router;


StrategyRouter.post('/', strategyController.addStrategy);
StrategyRouter.get('/', strategyController.getStrategies);
StrategyRouter.get('/:id', strategyController.getStrategy);
StrategyRouter.put('/:id', strategyController.updateStrategy);
StrategyRouter.delete('/:id', strategyController.deleteStrategy);

module.exports.StrategyRouter = StrategyRouter;