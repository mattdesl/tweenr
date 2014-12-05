/*
    'fancy-box' is a module with no ties to the larger 
    application or its frame loop. 
 */

require('canvas-testbed')(render)

var box = require('./fancy-box')({ 
    color: [127, 200, 180],
    position: [10, 10],
    shape: [80, 75]
})

box.show({ delay: 0.25 })

function render(ctx, width, height, dt) {
    ctx.clearRect(0, 0, width, height)

    box.update(dt) 
    box.draw(ctx)

    //this text should be black since box.draw uses save()/restore() :) 
    ctx.fillText("click to hide", 10, 150)
}

window.addEventListener('click', function(ev) {
    box.hide()
})