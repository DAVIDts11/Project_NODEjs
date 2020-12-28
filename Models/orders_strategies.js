const { Schema, model } = require('mongoose');

const  orders_strategy = new Schema({
    strategy_id: { type: Number, required:true},
    order_id: {type : Number , required:true}
}, {collection: 'orders_strategies'});

const Order_Strategy = model('Order_Strategy', orders_strategy );
module.exports = Order_Strategy;