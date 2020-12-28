const { Schema, model } = require('mongoose');

const  strategy = new Schema({
    strategy_id: { type: Number, required:true},
    user_id: {type : Number },
    strategy_type : {type: String, required:true},
    date_begin: { type: Date , default: Date.now},
    currency: { type: String},
    amount: { type: Number},
    take_profit: { type: Number},
    stop_loss: { type: Number},
}, {collection: 'strategies'});

const Strategy = model('Strategy', strategy );
module.exports = Strategy;