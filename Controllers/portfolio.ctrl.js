// const { binance } = require('../binance_connection');
const { binanceConectedList } = require("./binance.ctrl");


exports.portfolioController = {
    getPortfolio(req, res) {
        thisBinance = binanceConectedList[req.user.id];
        async function getAllBalances() {
            return await thisBinance.balance();
        };

        async function getUsdValue(asset)  {
            const val = await thisBinance.prices(asset + 'USDT');
            console.log(val[asset + 'USDT']);
            return Number(val[asset + 'USDT']);
        };

        async function getRelevantBalance(balances) {
            const balance = [];
            let assetValue = "";
            for (asset in balances) {
                if (balances[asset]['available'] > 0 || balances[asset]['onOrder'] > 0) {
                    let num = Number(balances[asset]['available']) + Number(balances[asset]['onOrder']);
                    assetValue =  await getUsdValue(asset);
                    balance.push({ "id": asset, "amount": num, "value": assetValue*num })
                }
            }
            console.log("new balance:" ,balance);
            return balance;
        };

        (async () => {
            const balances = await getAllBalances();
            let Portfolio = await getRelevantBalance(balances);
            console.log("new balance:" ,Portfolio);
            res.send(Portfolio);
        })();
    },



    getPrices(req, res) {
        thisBinance = binanceConectedList[req.user.id];
        async function getAllPrices() {
            return await thisBinance.prices();
        };
        (async () => {
            const prices = await getAllPrices();
            res.send(prices);
        })();

    }

    // getStrategies(req, res) {
    //     const id = req.params.id
    //     Schedule.find({ id: id }).
    //         then(docs => { res.json(docs) })
    //         .catch(err => console.log('Erorr getting the data from db: ${err}'));
    // },
    // getStrategy(req, res) {
    //     let filter= { };
    //     if('date' in req.query)
    //         filter.date=req.query.date;
    //     if('time' in req.query)
    //         filter.time= req.query.time;
    //     Schedule.find(filter)
    //         .then(docs => { res.json(docs) })
    //         .catch(err => console.log('Error getting the data from db: ${err}'));

    // },
}