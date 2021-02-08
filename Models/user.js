const mongoose = require('mongoose');
const { Schema, model } = require('mongoose'),
autoIncrement = require('mongoose-auto-increment');

const consts = require('../constants' );
const { DB_HOST, DB_USER, DB_PASS} = consts.DB_CONSTANTS;
const conectionString = DB_HOST;

const options = {
    useNewUrlParser: true, // For deprecation warnings
    useCreateIndex: true, // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    useFindAndModify :false,
    user: DB_USER,
    pass: DB_PASS
   };

const connection = mongoose.createConnection(conectionString,options);
 
autoIncrement.initialize(connection);

const  user = new Schema({
    user_id: {type: Number, default: 0, unique: true},
<<<<<<< HEAD
    username: {type: String},
    googleId: {type: String},
    thumbnail: {type: String},
    binance_key:{type: String ,default:"None"},
    binance_private : {type: String ,default:"None"}
    // first_name: {type : String , required:true},
    // last_name : {type: String, required:true},
    // permissioan:{type: String, default:"reg"},
    // sing_up_date: { type: Date , default: Date.now},
=======
    first_name: {type : String , required:true},
    last_name : {type: String, required:true},
    permission:{type: String, default:"reg"},
    sing_up_date: { type: Date , default: Date.now},
>>>>>>> ec019974413548181d997e75efa416a6ac3f797b
    ////  
}, {collection: 'users'});



user.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'user_id',
    startAt: 1,
    incrementBy: 1
  });


const User = model('User', user );
module.exports = User;