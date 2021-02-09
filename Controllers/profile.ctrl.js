const User = require('../Models/user');


exports.profileController = {
        updateUser(req, res) {
            console.log("I'm trying to update");
            User.updateOne({id: req.user.id }, {
            binance_key: req.body.binance_key,
            binance_private: req.body.binance_private,
        })
            .then(docs => { res.json(docs) })
            .catch(err => console.log(`Error update user from db : ${req.user}`));
    }

}