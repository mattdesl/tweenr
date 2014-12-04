require('canvas-testbed')(render)

var tweenr = require('../')({ defaultEase: 'expoOut' })

var array = require('array-range')

var elements = array(50).map(function() {
    return {
        position: [ 0, 0 ],
        radius: 0,
        thickness: 0
    }
})

var eases = Object.keys(require('eases'))
var next = 0

reset()

window.addEventListener('click', function(ev) {
    reset()
})

function stagger(elements, ease) {
    return elements.map(function(e, i, list) {
        var a = (i/(list.length-1))*2-1
        
        e.position = [a, i%2 === 0 ? -0.5 : 0.5]
        e.radius = 0
        return tweenr.to(e, { 
            position: [a, 0], 
            duration: 1, 
            radius: 5,
            delay: i*0.02,
            ease: ease
        })
    })
}

function reset() {
    var ease = eases[next++ % eases.length]
    console.log(ease)
    stagger(elements, ease)
    elements.forEach(function(e) {
        e.thickness = 0
    })

    tweenr.to(elements, { thickness: 1, duration: 4, ease: 'quartOut' })
}

function render(ctx, width, height) {
    ctx.clearRect(0,0,width,height)
    
    elements.forEach(function(e) {
        var x = (e.position[0]/2+0.5)*width,
            y = (e.position[1]/2+0.5)*height

        ctx.beginPath()
        ctx.lineWidth = e.thickness
        ctx.arc(x, y, Math.max(0, e.radius), 0, Math.PI*2, false)
        ctx.stroke()
    })
}