var eases = require('eases')
var xtend = require('xtend')
var base = require('./index')

module.exports = function Tweenr(opt) {
    return base(xtend({ eases: eases }, opt))
}

var tweenr = require('tweenr/core')()
