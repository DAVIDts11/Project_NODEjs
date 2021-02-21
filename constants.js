const DB_CONSTANTS = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS
}

const BINANCE_API_TEMP = {
    BINANCE_KEY: process.env.BINANCE_KEY,
    BINANCE_PRIVATE: process.env.BINANCE_PRIVATE
}

GOOGLE_AUTH = {
    google: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    },
    session: {
        cookieKey: process.env.COOKIE_KEY
    },
    crypto: process.env.CRYPTO_KEY
};

module.exports = {
    BINANCE_API_TEMP,
    DB_CONSTANTS,
    GOOGLE_AUTH
}


