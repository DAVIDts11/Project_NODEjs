const { Router } = require('express');

const {portfolioController}= require('../Controllers/portfolio.ctrl');

const PortfolioRouter= new Router;

PortfolioRouter.get('/', portfolioController.getPortfolio);

exports.PortfolioRouter = PortfolioRouter;