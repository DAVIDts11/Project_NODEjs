let hammerResult;
let Strategy_Result = {};

// 1-  hamer 

exports.isHammer = function isHammer(open, high, close, low) {
    const hammer = require('technicalindicators').bullishinvertedhammerstick;
    // console.log(`   open = ${Number(open)} 
    //                 close = ${Number(close)}
    //                 high = ${Number(high)}
    //                 low = ${Number(low)}`);
    let singleInput = {
        open: [Number(open)],
        high: [Number(high)],
        close: [Number(close)],
        low: [Number(low)],
    }

    hammerResult = hammer(singleInput) ? 'yes' : 'no';
    Strategy_Result["Hammer"] = hammerResult;
 //   console.log(`Is Bullish Inverted Hammer Pattern? : ${Strategy_Result["isHammer"]}`);
}



exports.Strategy_Result = Strategy_Result;