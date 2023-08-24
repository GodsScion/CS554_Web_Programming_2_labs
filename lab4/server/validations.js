
function isValidNum(x){
    if(!x) throw 'No number is given!'
    x = x.trim()
    if (x.length === 0) throw 'No number is given!'
    if(isNaN(x)) throw `'${x}' is NOT a number!`
    x=Number(x)
    if(!Number.isInteger(x)) throw `'${x}' is NOT an integer!`
    return x
}

module.exports ={
    isValidNum
}