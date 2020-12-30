$(document).ready(function () {
    insertBalancesValues();
    setInterval(function () {
        insertBalancesValues();
    }, 30000);
    // operationsListeners();
    $("#send").click(function () {
        click()
    })
});

$(document)
    .ajaxStart(function () {
        $("#loading").show();
        $(".balance-usd")
            .empty()
        $(".balance-btc")
            .empty()
    })
    .ajaxStop(function () {
        $("#loading").hide();
    });

function insertBalancesValues() {
    $.ajax({
        url: "http://localhost:8080/api/portfolio",
        type: "GET",
        success: function (result) {
            calculateBtcValue(result);
        },
        error: function () {
            console.log("ERROR !");
        },
    });
}

function getAllPrices(callback) {
    return $.ajax({
        url: "http://localhost:8080/api/portfolio/prices",
        type: "GET",
    });
}

async function calculateBtcValue(balance) {
    let result = 0,
        price;
    const prices = await getAllPrices();

    for (coin_name in balance) {
        console.log("checking " + coin_name);
        if (coin_name === "BTC") result += balance["BTC"];
        else {
            for (symbol in prices)
                if (coin_name + "BTC" === symbol) {
                    console.log("Entering " + symbol);
                    const value = prices[symbol] * balance[coin_name];

                    if (value > 0.01) {
                        console.log("coin: " + coin_name + " | value: " + value);
                        result += value;
                    }
                }
        }
        console.log(result);
    }
    console.log("total = " + result);

    $(".balance-btc").text(result.toFixed(8));
    $(".balance-btc")
        .append('&nbsp;<i class="fab fa-btc fa-sm" style="color:orange"></i>')
        .hide()
        .show("fast");

    const usd_val = (prices['BTCUSDT'] * result);
    $(".balance-usd")
        .empty()
        .append('≈ ' + usd_val.toLocaleString('en-US', { maximumFractionDigits: 2 }))
        .append('&nbsp;<i class="fas fa-dollar-sign fa-sm" style="color:#008800"></i>')
        .hide()
        .show("fast");
}

function click() {

    const id = $("#user-id").val();
    let strategy = $(".card-header").text();
    if (strategy === "Hammer")
        strategy = "isHammer";
    const currency = $("#currency").val();
    const amount = $("#amount").val();
    const profit = $("#take-profit").val();
    const stoploss = $("#stop-loss").val();
    var result = {
        "user_id": Number(id),
        "strategy_type": strategy,
        "currency": currency,
        "amount": Number(amount),
        "take_profit": Number(profit),
        "stop_loss": Number(stoploss)
    };
    console.log(result);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/strategy/",
        data: result,
        success: function () {
            console.log("AHLA")
        },
        // dataType: dataType
        error: function () {
            console.log("ERROR !");
        },
    });
}

