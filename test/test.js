require('canvas-testbed')(render)

var tweenr = require('../')({ defaultEase: 'expoOut' })
var start = [25, 25],
    end = [100, 50],
    size = { width: 5, height: 5 }

setTimeout(function() {
    tweenr.to(start, end, 2)
    tweenr.to(size, { width: 150, height: 100, ease: 'expoOut', duration: 1.5, delay: 0.0 })
}, 1000)

function render(ctx, width, height) {
    ctx.clearRect(0,0,width,height)
    ctx.fillRect(start[0], start[0], size.width, size.height)
}