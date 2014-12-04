var eases = require('eases')
var xtend = require('xtend')
var base = require('./no-eases')

module.exports = function Tweenr(opt) {
    return base(xtend({ eases: eases }, opt))
}