/*
    Most tween engines tend to create garbage when interpolating
    from one object to another, since it needs to build up a "store"
    of the keys being tweened. 

    If we want to optimize for GC, we can use tween-array which
    creates far less garbage.
 */

require('canvas-testbed')(render)

var tweenr = require('../')({ defaultEase: 'backOut' })
var array = require('tween-array')
var mouse = require('touch-position').emitter()

var position = [100, 0]

mouse.on('move', function() {
    //kill any outstanding tweens
    tweenr.clear()
    
    //1 second tween from last mouse position to new mouse position
    tweenr.push(array(position, mouse.position, { duration: 1 }))
})

function render(ctx, width, height) {
    ctx.clearRect(0,0,width,height)

    ctx.beginPath()
    ctx.arc(position[0], position[1], 50, 0, Math.PI*2)
    ctx.fill()
}