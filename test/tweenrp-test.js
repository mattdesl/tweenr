require('canvas-testbed')(render)


require('canvas-testbed')(render)

var array = require('tween-array')
var animate = require('./tweenrp')({ defaultEase: 'expoOut' })

var box = { position: [10, 10], size: 20 }
var box2 = { position: [140, 50], size: 50 }


animate.all([
    anim1(box),
    anim2(box2)
]).then(function() {
    console.log("All timelines finished")
})

function anim1(element) {
    return animate.to(element, { size: 50, duration: 1, delay: 0.5 })
}

function anim2(element) {
    return animate.to(element, { size: 20, duration: 1.5, delay: 0.0 })
        .then(function() {
            return animate.to(element, { position: [150, 20], duration: 0.5 })
        })
}

function render(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)
    
    ctx.fillRect(box.position[0], box.position[1], box.size, box.size)    
    ctx.fillRect(box2.position[0], box2.position[1], box2.size, box2.size)    
}

window.addEventListener('click', function() {
    animate.clear()
})