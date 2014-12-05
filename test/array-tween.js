/*
    
    Custom tween types are experimental. Thoughts:

        - tween-object 
        - tween-objects
        - tween-array
        - tween-dom 

    Problems:

        - use a different ticker method? or try to ducktype into to() ?
        - handling objects across module versions could be problematic
        - base tween should have its own tick(dt) handling rather than
          coupling it into the tween-ticker
 */

require('canvas-testbed')(render)

var array = require('tween-array')
var tweenr = require('../')({ defaultEase: 'expoOut' })

var start = [0, 20], 
    end = [100, 20],
    tmp = start.slice()

tweenr.push(array(start, end, { duration: 1, delay: 0.4, output: tmp }))

function render(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    
    ctx.fillRect(tmp[0], tmp[1], 40, 40)    
}