let hammerResult;
let Strategy_Result = {};

// 1-  Hammer 
exports.isHammer = function isHammer(open, high, close, low) {
    const hammer = require('technicalindicators').bullishinvertedhammerstick;
    let singleInput = {
        open: [Number(open)],
        high: [Number(high)],
        close: [Number(close)],
        low: [Number(low)],
    }
    hammerResult = hammer(singleInput); //? 'yes' : 'no';
    Strategy_Result["Hammer"] = hammerResult;
}


// 2 - Three White Soldiers
exports.isThreewhitesoldiers = function isThreewhitesoldiers(open, high, close, low) {
    const threewhitesoldiers = require('technicalindicators').threewhitesoldiers;
    const input = {
        open: [Number(open[2]), Number(open[1]), Number(open[0])],
        close: [Number(close[2]), Number(close[1]), Number(close[0])],
        high: [Number(high[2]), Number(high[1]), Number(high[0])],
        low: [Number(low[2]), Number(low[1]), Number(low[0])]
    }
    const threeResult = threewhitesoldiers(input);
    Strategy_Result["Three_White_Soldiers"] = threeResult;
}

// 3 - Piercing Line
exports.isPiercingline = function isThreewhitesoldiers(open, high, close, low) {
    const piercingline = require('technicalindicators').piercingline;
    const input = {
        open: [Number(open[1]), Number(open[0])],
        high: [Number(high[1]), Number(high[0])],
        close: [Number(close[1]), Number(close[0])],
        low: [Number(low[1]), Number(low[0])],
    }
    const piercingResult = piercingline(input);
    Strategy_Result["Piercing_Line"] = piercingResult;
}

exports.Strategy_Result = Strategy_Result;