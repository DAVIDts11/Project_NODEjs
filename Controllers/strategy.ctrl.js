const Strategy = require('../Models/strategy');
const Order_Strategy = require('../Models/orders_strategies');
const { binance } = require('../binance_connection');
require("../socket");
const { Socket, last } = require("../socket");

const { Strategy_Result } = require("../type_strategies");

const binanceCommitionPr = 0.5;

function updateStrategyStatus(strategyID, newStatus) {
    Strategy.updateOne({ strategy_id: strategyID }, {
        status: newStatus
    })
        .then(docs => { res.json(docs) })
        //.catch(err => console.log(`Error update strategy  status from db `));
}



function saveOrder(order_str, strategy_id, orderType) {
    const result = order_str.save()
        .then(result => {
            if (result) {
                console.log("order has been seved");
                //update strategy status:  
                if (orderType == "buyMarket") {
                    const newStatus = "waiting_to_sell";
                    updateStrategyStatus(strategy_id, newStatus);
                }
            }
            else {
                res.status(404).send("Error saving a order_strategy");
            }
        })
        .catch(err => console.log(`Error saving the data from db order_str: ${err}`))

}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

function setStopLimits(strategyInfo, count, pair, lastestPrice) {
    // set stop loss and take profit :
    let quantity = Number(strategyInfo["amount"]);
    let profitPrice = Number((lastestPrice * (100 + strategyInfo["take_profit"]) / 100).toFixed(7));                                     
    let stop_Price = Number((lastestPrice * (100 - strategyInfo["stop_loss"]) / 100).toFixed(7));        
    let stop_Limit_Price = stop_Price;      
    console.log(`pair = ${pair} ,quantity = ${quantity} , profitPrice = ${profitPrice} , stopPrice = ${stop_Price} , stopLimitPrice = ${stop_Limit_Price} `);
    console.log(typeof (pair), typeof (quantity), typeof (profitPrice), typeof (stop_Price), typeof (stop_Limit_Price));

    binance.sell(pair, quantity, profitPrice, { type: "OCO", stopLimitPrice: stop_Limit_Price, stopPrice: stop_Price }, (error, response) => {
        console.info("RESPONSE:", response);
        if (response.orders) {
            console.info("ORDER_IDS: ", response.orders[0].orderId, " ", response.orders[1].orderId);

            for (let i = 0; i < 2; i++) {
                order_str = new Order_Strategy({
                    "strategy_id": count,
                    "order_id": response.orders[i].orderId,
                    "user_id": strategyInfo["user_id"]
                });
                //save take_profit order
                const orderType = "limitOrder";
                saveOrder(order_str, count, orderType);
            }
        }

    });

}

function buyMarket(strategyInfo, count) {
    let quantity = strategyInfo["amount"];
    let order_str;
    // buy market:
    binance.marketBuy(strategyInfo["currency"], quantity, (error, response) => {
        console.info("Market Buy response", response);
        console.info("order id: " + response.orderId);
        order_str = new Order_Strategy({
            "strategy_id": count,
            "order_id": response.orderId,
            "user_id": strategyInfo["user_id"]
        })
        //save buy order
        saveOrder(order_str, count, "buyMarket");

        // // lastest price:
        let pair = strategyInfo["currency"];

        binance.prices(pair, (error, ticker) => {
            console.info(`Price of ${pair}:  ${ticker[pair]}`);   //
            let lastestPrice = Number(ticker[pair]);
            // set OCO order :
            setStopLimits(strategyInfo, count, pair, lastestPrice);

        });

    });
}



function runStrategy(strategyInfo, count) {
    Socket(strategyInfo["currency"]);
    let strategy_status;
    console.log(count);
    (async () => {
        await Strategy.find({ strategy_id: count }).      
            then(docs => { strategy_status = docs[0]["status"] })
            .catch(err => console.log('Erorr getting the data from db: ${err}'));
        console.log(strategy_status);
        if (strategy_status == "waiting_to_buy") {
            if (Strategy_Result[strategyInfo["strategy_type"]] == "yes") {
                buyMarket(strategyInfo, count);
            }
        }
    }
    )();
    console.log(`${Strategy_Result[strategyInfo["strategy_type"]]} , lastest price = ${last[strategyInfo["currency"]]}  `);
}




exports.strategyController = {
    addStrategy(req, res) {
        strategyInfo = {
            "user_id": req.body.user_id,
            "strategy_type": req.body.strategy_type,
            "currency": req.body.currency,
            "amount": req.body.amount,
            "take_profit": req.body.take_profit,
            "stop_loss": req.body.stop_loss
        }
        const newStrategy = new Strategy(strategyInfo);
        const result = newStrategy.save()
            .then(result => {
                if (result) {
                    // console.log(Strategy_Result[req.body.strategy_type]);

                    Strategy.nextCount(function (err, count) {
                        setInterval(runStrategy, 7500, strategyInfo, count - 1);
                    });
                    res.json(result);
                }
                else {
                    res.status(404).send("Error saving a Schedule");
                }
            })
            .catch(err => console.log(`Error saving the data from db: ${err}`))
    },

    getStrategies(req, res) {
        let filter = {};
        filter.user_id = req.query.user_id;
        if ('currency' in req.query)
            filter.currency = req.query.currency;
        if ('status' in req.query)
            filter.status = req.query.status;
        Strategy.find(filter).
            then(docs => { res.json(docs) })
            .catch(err => console.log(`Erorr getting the data from db: ${err}`));
    },

    getStrategy(req, res) {
        Strategy.find({ strategy_id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));

    },

    updateStrategy(req, res) {
        Strategy.updateOne({ strategy_id: req.params.id }, {
            amount: req.body.amount,
            take_profit: req.body.take_profit,
            stop_loss: req.body.stop_loss
        })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error update schedule from db : ${req.params.id}`));
    },

    deleteStrategy(req, res) {
        Strategy.deleteOne({ strategy_id: req.params.id })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting strategy from db : ${req.params.id}`));
    }
}
