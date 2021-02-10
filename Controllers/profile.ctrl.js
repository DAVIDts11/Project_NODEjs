const User = require('../Models/user');


exports.profileController = {
    updateUser(req, res) {
        console.log("I'm trying to update:", req);
        User.updateOne({ _id: req.user.id }, {
            binance_key: req.body.binance_key,
            binance_private: req.body.binance_private,
        })
            .then(docs => {
                console.log(req.body.binance_key);
                console.log(req.body.binance_private);
                console.log(req.user);
                res.json(docs);
            })
            .catch(err => console.log(`Error update user from db : ${req.user}`));
    }
}