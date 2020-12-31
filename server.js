const express = require("express");
const { StrategyRouter } = require("./Routers/strategyRouter");
const { OrdersRouter } = require("./Routers/ordersRouter");
const { PortfolioRouter } = require("./Routers/portfolioRouter");



const app = express();
const port = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','POST, PUT, GET, DELETE, OPTIONS');
    res.set('Content-Type', 'application/json');
    next();
});


app.use("/api/strategy", StrategyRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/portfolio", PortfolioRouter);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});



app.listen(port, () => console.log('Express server is running on port ', port));

