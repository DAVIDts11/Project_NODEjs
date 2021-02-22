// Module will handle logs (save and view)
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// File Logger
const morgan = require('morgan');
morgan.token('date', function () { return moment().format('DD/MM/YYYY hh:mm:ss a') });

fileStream = fs.createWriteStream(path.join(__dirname, 'logs.txt'), { flags: 'a' });

module.exports = { fileStream, morgan, fs }