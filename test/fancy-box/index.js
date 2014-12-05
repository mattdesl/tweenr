/*  
    This is an example of using tween-ticker alone.
    This has a nearly identical API to tweenr, but it 
    is better suited for reusable modules because:

        - the user is forced to handle rAF/ticking
        - you can specify exactly what eases you need
        - there is no global state (i.e. no global raf loop)
        - you can use whatever time units you want (e.g. seconds or milliseconds)
 */

var easeExpo = require('eases/expo-in-out')
var easeQuad = require('eases/quad-out')
var ticker = require('tween-ticker')({ defaultEase: easeExpo })
var colorStyle = require('color-style')
var xtend = require('xtend')

var initial = {
    padding: 3,
    thickness: 2,
    arc: Math.PI*2
}

module.exports = function (opt) { 
    return new Box(opt)
}

function Box(opt) {
    opt = opt || {}
    this.position = opt.position || [0, 0]
    this.shape = opt.shape || [100, 40]
    this.color = opt.color || [0, 0, 0]
    this.state = xtend(initial)
}

Box.prototype.show = function(opt) {
    var delay = (opt && opt.delay) || 0

    this.state.padding = Math.min(this.shape[0]/2, this.shape[1]/2)
    this.state.thickness = 0.001
    this.state.arc = 0

    var end = { duration: 1, delay: delay }

    //create a little timeline...
    ticker.to(this.state, xtend(end, { padding: initial.padding }))
    ticker.to(this.state, xtend(end, { 
        thickness: initial.thickness, 
        ease: easeQuad, 
        delay: delay+0.1 
    }))
    ticker.to(this.state, xtend(end, { arc: initial.arc, delay: delay+0.5 }))
}

Box.prototype.hide = function(opt) {
    var delay = (opt && opt.delay) || 0

    //kill existing tweens before animating out
    ticker.clear()
    ticker.to(this.state, { arc: 0, delay: delay, duration: 0.5 })
    ticker.to(this.state, {
        delay: delay + 0.1,
        thickness: 0.001,
        duration: 1,
        padding: Math.min(this.shape[0]/2, this.shape[1]/2)
    })  
}

Box.prototype.update = function(dt) {
    ticker.tick(dt/1000)
}

Box.prototype.draw = function(ctx) {
    var style = colorStyle(this.color),
        x = this.position[0], 
        y = this.position[1],
        w = this.shape[0],
        h = this.shape[1],
        pad = this.state.padding

    ctx.save()
    ctx.strokeStyle = ctx.fillStyle = style
    ctx.lineWidth = this.state.thickness
    ctx.fillRect(x+pad, y+pad, w-pad*2, h-pad*2)
    ctx.strokeRect(x, y, w, h)

    ctx.beginPath()
    ctx.arc(x+w/2, y+h/2, Math.min(w/4, h/4), this.state.arc, this.state.arc/2, true)
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 4
    ctx.stroke()

    ctx.restore()
}