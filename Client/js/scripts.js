$(document).ready(function () {
    insertBalancesValues();
    setInterval(function () {insertBalancesValues()},30000);
    // operationsListeners();
});


function insertBalancesValues() {
    $.ajax({
        url: 'http://localhost:8080/api/portfolio',
        type: 'GET',
        success: function (result) {
            
            calculateBtcValue(result);
           
            
        },
        error: function () {
            console.log("ERROR !");
        }
    });
}

function getAllPrices(callback) {
    return $.ajax({
        url: 'http://localhost:8080/api/portfolio/prices',
        type: 'GET',
    });
}

async function calculateBtcValue(balance) {
    
    let result = 0, price;
    const prices = await getAllPrices();
    
    for (coin_name in balance) {
        console.log("checking " + coin_name);
        if (coin_name === 'BTC')
            result += balance['BTC'];
        else {
            for (symbol in prices)
                if (coin_name + "BTC" === symbol) {
                    console.log("Entering " + symbol);
                    const value = prices[symbol] * balance[coin_name];

                    if (value > 0.01 && coin_name != "MCO") {
                        console.log('coin: ' + coin_name + ' | value: ' + value);
                        result += value;
                    }

                }
        }
        console.log(result);
    }
    console.log("total = " + result);
    $('.balance-btc').text(result.toFixed(8));
    $('.balance-btc').append('&nbsp;<i class="fab fa-btc"></i>').hide().show('normal');
}

function Convert(coin_name, value) {

}
// function getBalanceValue(coin){

// }