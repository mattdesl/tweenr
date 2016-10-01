var xtend = require('xtend')
var eases = require('eases')
var Ticker = require('tween-ticker')
var EventEmitter = require('events').EventEmitter;
var inherits = require('inherits')
var mixin = require('mixes')
var loop = require('./loop')

var defaultOpt = { eases: eases }

module.exports = Tweenr
function Tweenr(opt) {
    if (!(this instanceof Tweenr))
        return new Tweenr(opt)

    Ticker.call(this, xtend(defaultOpt, opt))
    EventEmitter.call(this)

    this.timeScale = 1.0
    this._handleTick = function(dt) {
        dt = Math.min(30, dt) //cap delta at 30 ms
        dt /= 1000
        dt *= this.timeScale
        this.emit('tick', dt)
        this.tick(dt)
    }.bind(this)

    loop.on('tick', this._handleTick)
}

inherits(Tweenr, Ticker)
mixin(Tweenr, EventEmitter.prototype)

Tweenr.prototype.dispose = function() {
    loop.removeListener('tick', this._handleTick)
}
