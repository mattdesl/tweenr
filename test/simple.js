require('domready')(function() {
    var canvas = document.body.appendChild(document.createElement('canvas'))
    var context = canvas.getContext('2d')

    var tweenr = require('../')()

    var size = 512
    
    //setup size
    canvas.width = size
    canvas.height = size

    var box = {
        opacity: 0,
        position: [10, 10],
        shape: [25, 25]
    }

    function render() {
        context.clearRect(0, 0, size, size)

        context.globalAlpha = box.opacity
        context.fillRect(box.position[0], box.position[1], box.shape[0], box.shape[1])
    }

    function reset() {
        box.opacity = 0
        box.position = [10, 10]

        tweenr.clear()
        tweenr.to(box, { opacity: 1, duration: 0.5, delay: 0.6 })
        tweenr.to(box, { position: [250, 10], delay: 2, duration: 1, ease: 'expoOut' })
    }

    window.addEventListener('click', function(ev) {
        reset()
    })

    reset()
    tweenr.on('tick', render)
})