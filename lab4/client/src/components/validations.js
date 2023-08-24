
function isValidNum(x){
    if(!x) throw 'No number is given!'
    if(typeof x == 'string') x = x.trim()
    if (x.length === 0) throw 'No number is given!'
    if(isNaN(x)) throw `'${x}' is NOT a number!`
    x=Number(x)
    if(!Number.isInteger(x)) throw `'${x}' is NOT an integer!`
    if(x < 0) throw `'${x}' is NOT a positive integer!`
    if(x === 0) throw `Page Numbers starts from 1`;
    return x
}

module.exports ={
    isValidNum
}