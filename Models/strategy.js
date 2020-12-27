const { Schema, model } = require('mongoose');

const  strategySchema= new Schema({
    strategy_id: { type: Number},
    date_beging: { type: Date , default: Date.now},
    currency: { type: String},
    amount: { type: Number },
    take_profit: { type: Number},
    stop_loss: { type: Number},
}, {collection: 'schedules'});

const Strategy = model('Strategy', strategySchema);
module.exports = Strategy;