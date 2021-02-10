const express = require("express");
const { StrategyRouter } = require("./Routers/strategyRouter");
const { OrdersRouter } = require("./Routers/ordersRouter");
const { PortfolioRouter } = require("./Routers/portfolioRouter");
const cookieSession = require('cookie-session');
const consts = require('./constants');
const passport = require('passport');
const authRoutes = require('./Routers/authRouter');
const profileRoutes = require('./Routers/profileRouter');
require('./config/passport_setup');
require('./db_connection');
const cors = require('cors');
// const bodyParser = require('body-parser')

const app = express();
app.use(express.json());

app.use(cors({credentials: true, origin:"http://localhost:3000"}));
// app.use(bodyParser.json());

// set view engine
app.set('view engine', 'ejs');

// set up session cookies
app.use(cookieSession({
    name: 'david',
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




app.use(express.urlencoded({ extended: true }));



app.use((req, res, next) => {
    // res.header('Access-Control-Allow-Origin', '*');  
    // res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', true);
    
    next();
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something is broken!');
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Express server is running on port ', port));

