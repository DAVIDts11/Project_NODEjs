const Strategy = require('../Models/strategy');
const Order_Strategy = require('../Models/orders_strategies');
const { binance } = require('../binance_connection');


const { Strategy_Result } = require("../type_strategies");


function runStrategy(strategyInfo,count) {
    let strategy_status;
    console.log(count);
    (async () => {
        await Strategy.find({ strategy_id: count}).      //strategyInfo["strategy_id"]
            then(docs => { strategy_status = docs[0]["status"] })
            .catch(err => console.log('Erorr getting the data from db: ${err}'));
        console.log(strategy_status);
        if (strategy_status == "waiting_to_buy") {
            if (Strategy_Result[strategyInfo["strategy_type"]] == "yes") {
                let quantity = strategyInfo["amount"];
                // buy market:
                binance.marketBuy(strategyInfo["currency"], quantity, (error, response) => {
                    console.info("Market Buy response", response);
                    console.info("order id: " + response.orderId);
                    const order_str = new Order_Strategy({
                        "strategy_id": count,                            //strategyInfo["strategy_id"]
                        "order_id": response.orderId
                    })

                    //save order
                    const result = order_str.save()
                        .then(result => {
                            if (result) {
                                console.log("order has been seved");

                                //update strategy status:         
                                Strategy.updateOne({ strategy_id: count }, {
                                    status: "waiting_to_sell"
                                })
                                    .then(docs => { res.json(docs) })
                                    .catch(err => console.log(`Error update strategy  status from db `));

                            }
                            else {
                                res.status(404).send("Error saving a order_strategy");
                            }
                        })
                        .catch(err => console.log(`Error saving the data from db order_str: ${err}`))

                    //set stop loss    

                    // let price = ;
                    // binance.sell("BNBETH", quantity, price, { type: 'LIMIT' }, (error, response) => {
                    //     console.info("Limit Sell response", response);
                    //     console.info("order id: " + response.orderId);
                    // });
                });


                ///    V  console.log("I'm bying");
                console.log("I'm set stop_loss , and take_profit");
                //    V  console.log("I'm chenge status");
                //   V   console.log("I'm save order_Id to orders_strategies");
            }
        }


    }
    )();
    console.log(Strategy_Result[strategyInfo["strategy_type"]]);
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
                    
                    Strategy.nextCount(function(err, count) {
                    setInterval(runStrategy, 2000, strategyInfo,count-1);
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
        let filter= { };
        filter.user_id = req.query.user_id ;
        if('currency' in req.query)
            filter.currency=req.query.currency;
        if('status' in req.query)
            filter.status= req.query.status;       
        Strategy.find(filter).
            then(docs => { res.json(docs) })
            .catch(err => console.log(`Erorr getting the data from db: ${err}`));
    },

    getStrategy(req, res) {
        Schedule.find( {strategy_id :req.params.id})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error getting the data from db: ${err}`));

    },


    updateStrategy(req, res) {
        Strategy.updateOne({ strategy_id : req.params.id }, {
            amount: req.body.amount,
            take_profit: req.body.take_profit,
            stop_loss: req.body.stop_loss
        })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error update schedule from db : ${req.params.id}`));
    },

    deleteStrategy(req, res) {
        Strategy.deleteOne( {strategy_id :req.params.id})
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error deleting strategy from db : ${req.params.id}`));
    }
}
