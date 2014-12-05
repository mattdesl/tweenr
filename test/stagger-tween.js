require('canvas-testbed')(render)

var tweenr = require('../')({ defaultEase: 'expoOut' })
// var stagger = require('./stagger')

var array = require('array-range')

var elements = array(25).map(function() {
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

function stagger(elements, ease, tweenIn) {
    elements.forEach(function(e, i, list) {
        var a = (i/(list.length-1))*2-1

        e.position = [a, tweenIn ? 0.5 : -0.5]
        e.radius = 0
        e.thickness = 1
        tweenr.to(e, { 
            position: [a, 0],
            duration: 1, 
            delay: i*0.02,
            ease: ease
        })
        tweenr.to(e, { radius: 5, duration: 0.5, delay: i*0.02 })
        tweenr.to(e, { thickness: 0, duration: 1, delay: 0.8 + i*0.04 })
    })

}

function reset() {
    var ease = eases[next++ % eases.length]
    console.log(ease)
    
    //clear any outstanding tweens    
    tweenr.clear()

    //reset elements
    elements.forEach(function(e) {
        e.thickness = 0
        e.radius = 0
    })

    var tweenIn = ease.indexOf('In') !== -1
    stagger(elements, ease, tweenIn)
    tweenr.to(elements, { radius: 0, duration: 1, delay: 1.7 })
}

function render(ctx, width, height) {
    ctx.clearRect(0,0,width,height)
    
    elements.forEach(function(e) {
        var x = (e.position[0]/2+0.5)*width,
            y = (e.position[1]/2+0.5)*height

        ctx.lineWidth = Math.max(0.0001, e.thickness)
        ctx.beginPath()

        ctx.arc(x, y, Math.max(0, e.radius)*1.5, 0, Math.PI*2, false)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(x, y, Math.max(0, e.radius), 0, Math.PI*2, false)
        ctx.fill()
    })
}