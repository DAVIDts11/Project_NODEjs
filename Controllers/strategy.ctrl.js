const Strategy = require('../Models/strategy');

const {Strategy_Result} = require("../type_strategies");



exports.strategyController = {
    addStrategy(req, res) {
        const newStrategy = new Strategy(
            {
                "strategy_id": req.body.strategy_id,
                "user_id":req.body.user_id,
                "strategy_type": req.body.strategy_type,
                "currency": req.body.currency,
                "amount": req.body.amount,
                "take_profit": req.body.take_profit,
                "stop_loss": req.body.stop_loss
            }
        );
        const result = newStrategy.save()
            .then(result => {
                if (result) {
                    console.log(Strategy_Result[req.body.strategy_type]);
                    res.json(result);
                }
                else {
                    res.status(404).send("Error saving a Schedule");
                }
            })
            .catch(err => console.log('Error saving the data from db: ${err}'))



    }
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


    // updateStrategy(req, res) {
    //     Schedule.updateOne({ id: req.params.id }, {
    //         userId: req.body.userId,
    //         date: req.body.date,
    //         time: req.body.time,
    //         game: req.body.game
    //     })
    //         .then(docs => { res.json(docs) })
    //         .catch(err => console.log(`Error update schedule from db : ${req.params.id}`));
    // },
    // deleteStrategy(req, res) {
    //     Schedule.deleteOne({ id: req.params.id })
    //         .then(docs => { res.json(docs) })
    //         .catch(err => console.log(`Error deleting schedule from db : ${req.params.id}`));
    // }

