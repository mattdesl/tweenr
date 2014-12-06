var test = require('tape')

var tweenr = require('../')()
var array = require('tween-array')
var objects = require('tween-objects')

var EventEmitter = require('events').EventEmitter
var xtend = require('xtend')

function cancel(tweens) {
    return function() {
        return tweens.forEach(function(t) {
            t.cancel()
        })
    }
}

function group(tweens) {
    var emitter = new EventEmitter()
    emitter.target = tweens
    emitter.cancel = cancel(tweens)

    var count = tweens.length
    tweens.forEach(function(t) {
        t.once('complete', function() {
            count--
            if (count===0)
                emitter.emit('complete', emitter)
        })
    })

    return emitter
}

test('should chain tweens', function(t) {
    var obj = { x: 0, y: 1 }
    var start = [25, 10], end = [0, 0]
    

    // tweenr.to(array(start, end, 0.1))
    //     .on('complete', function(ev) {
    //         t.equal(ev.target, start, 'complete')
    //     })


    var tween = group([
        tweenr.to(array(start, end, 0.1))
            .on('complete', function() {
                t.deepEqual(start, [0, 0], 'first tween')
            }),
        tweenr.to(obj, { x: 1, duration: 0.1, delay: 0.5 })
            .on('complete', function() {
                t.deepEqual(obj.x, 1, 'second tween')
            })
    ]).on('complete', function() {
        t.ok(true, 'all done')
    })
})


var timeline = require('tween-keyframes')
timeline.add()