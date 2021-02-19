const User = require('../Models/user');
const Binance = require('node-binance-api');
const Order_Strategy = require('../Models/orders_strategies');
const { cryptr } = require("../config/passport_setup")


const binanceConectedList = {};


function saveOrder(orderId, user_id) {
    order_str = new Order_Strategy({
        "strategy_id": -1,
        "order_id": orderId,
        "user_id": user_id
    })
    const result = order_str.save()
        .then(result => {
            if (result) {
                console.log("order has been seved");
            }
            else {
                res.status(404).send("Error saving a order_strategy");
            }
        })
}

exports.BinanceController = {
    async connectBinance(req, res) {
        const decrypteBinanceKey = cryptr.decrypt(req.user.binance_key);
        const decrypteBinancePrivate = cryptr.decrypt(req.user.binance_private);
        console.log("dec key =", decrypteBinanceKey);
        console.log("dec private  =", decrypteBinancePrivate);
        const binance = await new Binance().options({
            APIKEY: decrypteBinanceKey,
            APISECRET: decrypteBinancePrivate,
            useServerTime: true
        });

        binanceConectedList[req.user.id] = binance;

    },
    getPriceForSymbol(req, res) {
        const thisBInance = binanceConectedList[req.user.id];
        const symbol = req.params.symbol;
        thisBInance.bookTickers(symbol, (error, ticker) => {
            console.info("bookTickers", ticker);
            res.send(ticker);

        });

    },

    marketOrder(req, res) {
        const thisBInance = binanceConectedList[req.user.id];
        const quantity = req.body.quantity;
        const symbol = req.body.symbol;
        const order_type = req.body.order_type;
        if (order_type == "buy") {
            thisBInance.marketBuy(symbol, quantity, (error, response) => {
                console.info("Market Buy response", response);
                console.info("order id: " + response.orderId);
                saveOrder(response.orderId, req.user.user_id);
            });
        }
        else if (order_type == "sell") {
            thisBInance.marketSell(symbol, quantity, (error, response) => {
                console.info("Market Sell response", response);
                console.info("order id: " + response.orderId);
                saveOrder(response.orderId, req.user.user_id);
            });
        }
        else {
            res.send("incorect  order type");
        }

    },

    limitOrder(req, res) {
        const thisBInance = binanceConectedList[req.user.id];
        const quantity = req.body.quantity;
        const symbol = req.body.symbol;
        const price = req.body.price;
        const order_type = req.body.order_type;
        if (order_type == "buy") {
            thisBInance.buy(symbol, quantity, price,{type:'LIMIT'}, (error, response) => {
                console.info("Limit buy response", response);
                console.info("order id: " + response.orderId);
                saveOrder(response.orderId, req.user.user_id);
            });
        }
        else if (order_type == "sell") {
            thisBInance.sell(symbol, quantity, price,{type:'LIMIT'}, (error, response) => {
                console.info("Limit sell response", response);
                console.info("order id: " + response.orderId);
                saveOrder(response.orderId, req.user.user_id);
            });
        }
        else {
            res.send("incorect  order type");
        }
    },
    getBTCUSD(req,res){
        const thisBInance = binanceConectedList[req.user.id];
        thisBInance.prices('BTCUSDT', (error, ticker) => {
            console.info("Price of BTC: ", ticker.BTCUSDT);
            res.send(ticker.BTCUSDT);
          });
    }

}



exports.binanceConectedList = binanceConectedList;