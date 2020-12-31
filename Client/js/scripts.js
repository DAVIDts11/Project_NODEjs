$(document).ready(function () {
    insertBalancesValues();
    setInterval(function () {
        insertBalancesValues();
    }, 10000);

    getActiveStrategies();
    getAllOrders();
    $("#btn-add-strategy").on("click",function()  {
        btnAddStrategy()
    });
    // operationsListeners();
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
            console.log(result); //////////////////// CHANGEEEE
        },
        error: function () {
            console.log("ERROR !");
        },
    });
}


function insertActiveStrategies(active_strategies) {
    $("#active-strategies-container").empty();
    $("#active-strategies-loading").hide();
    let currency, status;
    console.log(active_strategies[0]);
    for (i in active_strategies) {
        currency = active_strategies[i].currency;
        status = active_strategies[i].status;
        if (status === "waiting_to_buy")
            status = "Waiting To <b>BUY</b>";
        else
            status = "Waiting To <b>SELL</b>";
        currency = currency.replace("BTC", "/BTC");
        $("#active-strategies-container").append(
            `<div class="active-strategy" style="position:relative">
            
            <span class="card-header"> ${active_strategies[i].strategy_type} </span>           
                <br><br>

                <div style="font-size:30px;"> ${currency} </div>
                <div> ${status} </div>

                <div style="position:absolute;width:100%;display:flex;justify-content:space-evenly;bottom:5px">
                    <button type="button" class="btn btn-link" 
                    onclick="deleteStrategy(${active_strategies[i].strategy_id})">
                    <i class="fas fa-trash-alt" ></i>
                    </button>

                    <button type="button" class="btn btn-link" 
                    onclick="editStrategy(${active_strategies[i].strategy_id})">
                        <i class="fas fa-pencil-alt "></i>
                    </button>
                </div>
            </div>`
        )
    }
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
    $("#balance-loading").show();
    $(".balance-btc").css("opacity", "0.2");
    $(".balance-usd").css("opacity", "0.2");

    let result = 0;
    const prices = await getAllPrices();

    for (coin_name in balance) {
        if (coin_name === "BTC")
            result += Number(balance["BTC"]);
        else {
            for (symbol in prices)
                if (coin_name + "BTC" === symbol) {
                    const value = prices[symbol] * balance[coin_name];
                    if (value > 0.00001) {
                        result += value;
                    }
                }
        }
    }
    $("#balance-loading").hide();
    $(".balance-btc")
        .css("opacity", "1")
        .text(result.toFixed(8))
        .append('&nbsp;<i class="fab fa-btc fa-sm" style="color:orange"></i>')
        .hide()
        .show("fast");

    const usd_val = (prices['BTCUSDT'] * result);

    $(".balance-usd")
        .css("opacity", "1")
        .empty()
        .append('≈ ' + usd_val.toLocaleString('en-US', { maximumFractionDigits: 2 }))
        .append('&nbsp;<i class="fas fa-dollar-sign fa-sm" style="color:#008800"></i>')
        .hide()
        .show("fast");
}

function btnAddStrategy() {
    let strategy = $(".card-header").text();
    if (strategy === "Hammer")
        strategy = "isHammer";
    const id = $("#user-id").val();
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
        error: function () {
            console.log("ERROR !");
        },
    });
}

