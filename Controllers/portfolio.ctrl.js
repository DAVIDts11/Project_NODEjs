const { binanceConectedList } = require("./binance.ctrl");


exports.portfolioController = {
    getPortfolio(req, res) {

        let thisBinance = binanceConectedList[req.user.id];

        async function getAllBalances() {
            return await thisBinance.balance();
        };

        async function getUsdValue(asset) {
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
                    assetValue = await getUsdValue(asset);
                    balance.push({ "id": asset, "amount": num, "value": assetValue * num })
                }
            }
            console.log("new balance:", balance);
            return balance;
        };

        (async () => {
            const balances = await getAllBalances();
            let Portfolio = await getRelevantBalance(balances);
            console.log("new balance:", Portfolio);
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
}