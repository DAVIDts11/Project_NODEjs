const { binance } = require('../binance_connection');

exports.portfolioController = {
    getPortfolio(req,res){
        async function getAllBalances() {
            return await binance.balance();
        };

        function getRelevantBalance(balances) {
            const balance = {};
            for (asset in balances) {
                if (balances[asset]['available'] > 0 || balances[asset]['onOrder'] > 0) {
                    let num = Number(balances[asset]['available']) + Number(balances[asset]['onOrder']);
                    balance[asset] = num;
                }
            }
            return balance;
        };

        (async () => {
            const balances = await getAllBalances();
            let myBalance =getRelevantBalance(balances);
            res.send(myBalance);
        })();

    },



    getPrices(req,res){
        async function getAllPrices() {
            return await binance.prices();
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