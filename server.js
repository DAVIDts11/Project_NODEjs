const express = require("express");
const { StrategyRouter } = require("./Routers/strategyRouter");
const { OrdersRouter } = require("./Routers/ordersRouter");
const { PortfolioRouter } = require("./Routers/portfolioRouter");
const cookieSession = require('cookie-session');
const consts = require('./constants');
const passport = require('passport');
const authRoutes = require('./Routers/authRouter');
const profileRoutes = require('./Routers/profileRouter');
const passportSetup = require('./config/passport_setup');
require('./db_connection');

const app = express();


<<<<<<< HEAD


// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [consts.GOOGLE_AUTH.session.cookieKey]
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// // set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.use("/api/strategy", StrategyRouter);
app.use("/api/orders", OrdersRouter);
app.use("/api/portfolio", PortfolioRouter);


// create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

=======
const app = express();
const port = process.env.PORT || 8080;  
>>>>>>> ec019974413548181d997e75efa416a6ac3f797b


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods','POST, PUT, GET, DELETE, OPTIONS');
    res.set('Content-Type', 'application/json');
    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Express server is running on port ', port));

