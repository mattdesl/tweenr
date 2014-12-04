var loop = require('frame-loop')
var Ticker = require('tween-ticker')
var isArray = require('an-array')

function push(ticker) {
    return function to(start, target, opt) {
        if (isArray(start) && isArray(target))
            return ticker.pushArray(start, target, opt)
        else
            return ticker.pushObject(start, target)
    }
}

module.exports = function(opt) {
    opt = opt||{}
    var ticker = Ticker(opt)
    var emitter = loop(function(dt) {
        ticker.tick(dt/1000)
    })
    emitter.to = push(ticker)
    emitter.clear = ticker.clear.bind(ticker)

    if (opt.running !== false)
        emitter.run()

    return emitter
}