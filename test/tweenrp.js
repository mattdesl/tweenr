var Promise = require('bluebird')
var xtend = require('xtend')
var inherits = require('inherits')
var Base = require('../')

module.exports = TweenrP
function TweenrP(opt) {
    if (!(this instanceof TweenrP))
        return new TweenrP(opt)
    Base.call(this, opt)
}

inherits(TweenrP, Base)

TweenrP.prototype.to = function(element, opt) {
    opt = opt||{}
    var self = this
    return new Promise(function(resolve, reject) {
        opt.onComplete = resolve
        Base.prototype.to.call(self, element, opt)
    })
}

TweenrP.prototype.all = Promise.all.bind(Promise)