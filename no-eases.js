var loop = require('frame-loop')
var Ticker = require('tween-ticker')
var isArray = require('an-array')

function createTo(ticker) {
    return function to(target, opt) {
        if (Array.isArray(target))
            return ticker.pushObjects(target, opt)
        else
            return ticker.pushObject(target, opt)
    }
}

module.exports = function(opt) {
    opt = opt||{}
    var ticker = Ticker(opt)
    var emitter = loop(function(dt) {
        ticker.tick(dt/1000)
    })
    emitter.ticker = ticker
    emitter.to = createTo(ticker)
    emitter.vector = ticker.pushArray.bind(ticker)
    emitter.clear = ticker.clear.bind(ticker)

    if (opt.running !== false)
        emitter.run()

    return emitter
}