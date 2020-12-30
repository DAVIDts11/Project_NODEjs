$(document).ready(function () {
    insertBalancesValues();
    setInterval(function () {
        insertBalancesValues();
    }, 30000);
    // operationsListeners();
    $("#send").click(function () {
        btnAddStrategy()
    })
    getActiveStrategies();
    getAllOrders()
});

$(document)
    .ajaxStart(function () {
        $(".loading").show();
        $(".balance-usd")
            .empty()
        $(".balance-btc")
            .empty()

    })
    .ajaxStop(function () {
        $(".loading").hide();
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

function getActiveStrategies() {
    $.ajax({
        url: "http://localhost:8080/api/strategy/?user_id=12",
        type: "GET",
        success: function (result) {
            insertActiveStrategies(result);
        },
        error: function () {
            console.log("ERROR !");
        },
    });
}


function getAllOrders() {
    $.ajax({
        url: "http://localhost:8080/api/orders/?user_id=12",
        type: "GET",
        success: function (result) {
            console.log(result);
        },
        error: function () {
            console.log("ERROR !");
        },
    });
}


function insertActiveStrategies(active_strategies) {
    $("#active-strategies-container").empty();
    $(".loading").hide();
    for (i in active_strategies)
        $("#active-strategies-container").append(
            `<div class="active-strategy" style="position:relative">
            
            <span class="card-header"> ${active_strategies[i].strategy_type} </span>
            <span style="position:absolute;right:4px;margin:4px"> 
            
            <i class="fas fa-pencil-alt fa-sm" ></i>
            <button type="button" class="btn btn-danger delete-strategy" 
            onclick="deleteStrategy(${active_strategies[i].strategy_id})">
                <i class="fas fa-trash-alt"></i>
            </button>
            </span>
            <br><br>
            <div> ${active_strategies[i].currency} </div>
            <div> Status: ${active_strategies[i].status} </div>
            
        </div>`
        )
}


function deleteStrategy(strategy_id) {
    console.log(`ID: ${strategy_id}`);
    $.ajax({
        url: `http://localhost:8080/api/strategy/${strategy_id}`,
        type: "DELETE",
        success: function (result) {
            getActiveStrategies();
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

function btnAddStrategy() {

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
        error: function () {
            console.log("ERROR !");
        },
    });
}

