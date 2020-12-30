const { binance } = require('../binance_connection');
//const Strategy = require('../Models/strategy');
const Order_Strategy = require('../Models/orders_strategies');


async function getAllOpenOrders() {
    return await binance.openOrders();
};

exports.ordersController = {
    getOrders(req, res) {
        let result_list = [];
        Order_Strategy.find({ user_id: req.query.user_id }).
            then(docs => {

                (async () => {

                    await (async () => {
                        const openOrders = await getAllOpenOrders();
                        for (i in openOrders) {
                            for (j in docs) {
                                console.log(`openOrder = ${openOrders[i]["orderId"]}
                                  doc = ${docs[j]["order_id"]}`)
                                if (openOrders[i]["orderId"] == docs[j]["order_id"]) {
                                    result_list.push(openOrders[i]);
                                }

                            }
                        }

                    })();

                    // console.log(result_list);            ///
                    res.json(result_list)

                })();


            })
            .catch(err => console.log(`Erorr getting the data from db: ${err}`));
    },
}