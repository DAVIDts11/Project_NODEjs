const { Router } = require('express');

const {portfolioController}= require('../Controllers/portfolio.ctrl');

const PortfolioRouter= new Router;

PortfolioRouter.get('/', portfolioController.getPortfolio);
PortfolioRouter.get('/prices', portfolioController.getPrices);

module.exports.PortfolioRouter = PortfolioRouter;