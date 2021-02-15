//const Strategy = require('../Models/strategy');
const Order_Strategy = require('../Models/orders_strategies');
const { binanceConectedList } = require("./binance.ctrl");


async function getAllOpenOrders(thisBinance) {
    return await thisBinance.openOrders();
};

exports.ordersController = {
    getOrders(req, res) {
        const thisBinance = binanceConectedList[req.user.id];
        let result_list = [];
        Order_Strategy.find({ user_id: req.user.user_id }).
            then(docs => {
                (async () => {
                    await (async () => {
                        const openOrders = await getAllOpenOrders(thisBinance);
                        for (i in openOrders) {
                            for (j in docs) {
                                if (openOrders[i]["orderId"] == docs[j]["order_id"]) {
                                    result_list.push(openOrders[i]);
                                }
                            }
                        }
                    })();
                    res.json(result_list)
                })();
            })
            .catch(err => console.log(`Erorr getting the data from db: ${err}`));
    },
}