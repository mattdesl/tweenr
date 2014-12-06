require('canvas-testbed')(render)

var ticker = require('../')()
var Tween = require('tween-chain')
var element = { alpha: 0, radius: 0, position: [150, 150] }

var current

function start() {
    //for each loop, create a series of new tweens
    var animateIn = Tween()
            .chain(element, { alpha: 1, duration: 1, delay: 0.2 })
            .chain(element, { radius: 40, duration: 1, delay: 0.25, ease: 'expoOut' })

    var animateOut = Tween()
            .chain(element, { alpha: 0, duration: 1, delay: 0.25 })
            .chain(element, { radius: 0, duration: 1, delay: 0.1, ease: 'expoIn' })

    var move = Tween()
            .chain(element, { position: [50+Math.random()*200, 150], duration: 1, ease: 'expoOut' })

    //another chain to bring them together
    var chain = Tween()
            .then(animateIn)
            .then(move)
            .then(animateOut)
            .on('complete', start) //causes an endless loop
    
    //run the tween
    current = ticker.to(chain)
}

//start the loop
start()

function render(ctx, width, height) {
    ctx.clearRect(0, 0, width, height)

    ctx.beginPath()
    ctx.arc(element.position[0], element.position[1], element.radius, 0, Math.PI*2)
    ctx.globalAlpha = element.alpha
    ctx.fill()
}