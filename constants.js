const DB_CONSTANTS = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS
}


const BINANCE_API_TEMP = {
    BINANCE_KEY: process.env.BINANCE_KEY,
    BINANCE_PRIVATE: process.env.BINANCE_PRIVATE
}

module.exports = {
    BINANCE_API_TEMP,
    DB_CONSTANTS
}