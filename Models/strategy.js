const mongoose = require('mongoose');
const { Schema, model } = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment');

const consts = require('../constants');
const { DB_HOST, DB_USER, DB_PASS } = consts.DB_CONSTANTS;
const conectionString = DB_HOST;

const options = {
  useNewUrlParser: true, // For deprecation warnings
  useCreateIndex: true, // For deprecation warnings
  useUnifiedTopology: true, // For deprecation warnings
  useFindAndModify: false,
  user: DB_USER,
  pass: DB_PASS
};

const connection = mongoose.createConnection(conectionString, options);

autoIncrement.initialize(connection);

const strategy = new Schema({
  strategy_id: { type: Number, default: 0, unique: true },
  user_id: { type: Number },
  strategy_type: { type: String, required: true },
  socket_id: { type: String, default: "" },
  status: { type: String, default: "waiting_to_buy" },
  date_begin: { type: Date, default: Date.now },
  currency: { type: String },
  amount: { type: Number },
  take_profit: { type: Number },
  stop_loss: { type: Number },
}, { collection: 'strategies' });


strategy.plugin(autoIncrement.plugin, {
  model: 'Strategy',
  field: 'strategy_id',
  startAt: 1,
  incrementBy: 1
});


const Strategy = model('Strategy', strategy);
module.exports = Strategy;