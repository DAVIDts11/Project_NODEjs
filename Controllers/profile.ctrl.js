const User = require('../Models/user');
const { cryptr } = require("../config/passport_setup")


exports.profileController = {
    updateUser(req, res) {
        const enc_binance_key = cryptr.encrypt(req.body.binance_key);
        const enc_binance_private = cryptr.encrypt(req.body.binance_private);
        User.updateOne({ _id: req.user.id }, {
            binance_key: enc_binance_key,
            binance_private: enc_binance_private,
        })
            .then(docs => {
                res.json(docs);
            })
            .catch(err => console.log(`Error update user from db : ${req.user}`));
    }
}