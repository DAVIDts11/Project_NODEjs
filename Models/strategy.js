const { Schema, model } = require('mongoose');

const  strategySchema= new Schema({
    strategy_id: { type: Number, required:true},
    date_beging: { type: Date , default: Date.now},
    currency: { type: String, required:true},
    amount: { type: Number , required:true},
    take_profit: { type: Number, required:true},
    stop_loss: { type: Number, required:true},
}, {collection: 'strategies'});

const Strategy = model('Strategy', strategySchema);
module.exports = Strategy;