const express = require("express");
const { StrategyRouter } = require("./Routers/strategyRouter");
const { OrdersRouter } = require("./Routers/ordersRouter");
const { PortfolioRouter } = require("./Routers/portfolioRouter");
const { BinanceRouter } = require("./Routers/binanceRouter");
const cookieSession = require('cookie-session');
const consts = require('./constants');
const passport = require('passport');
const authRoutes = require('./Routers/authRouter');
const profileRoutes = require('./Routers/profileRouter');
const cors = require('cors');

require('./config/passport_setup');
require('./db_connection');


//Express 
const app = express();
app.use(express.json());


// Permissions
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// View Engine Setup
app.set('view engine', 'ejs');


// Coockies Session Setup
app.use(cookieSession({
    name: 'david',
    maxAge: 24 * 60 * 60 * 1000,
    keys: [consts.GOOGLE_AUTH.session.cookieKey]
}));


// Passport Init
app.use(passport.initialize());
app.use(passport.session());


// Routers Setup
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use("/api/strategy", StrategyRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/portfolio", PortfolioRouter);
app.use("/api/binance", BinanceRouter)
app.use(express.urlencoded({ extended: true }));


//Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});
app.all('*', (req, res) => { res.status(404).send("page not found"); });


// Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Express server is running on port ', port));

