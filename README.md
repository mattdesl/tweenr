# tweenr

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Minimal tweening engine which operates on numbers and arrays.

```js
var tweenr = require('tweenr')()

var data = { opacity: 0, position: [15, 25] }
tweenr.to(data, { 
    opacity: 1, 
    position: [20, 50], 
    ease: 'expoOut', 
    duration: 1, //in seconds 
    delay: 0.25
})
```

## motivations

I love the simplicity of GreenSock's animation tools, but I don't agree with some of their practices (i.e. polluting tweened objects with variables) and find myself only using a tiny fraction of their entire codebase.

Some features of `tweenr`:

- common set of eases
- works in node and the browser
- small, focused and modular design; e.g. [tween-ticker](https://www.npmjs.org/package/tween-ticker) can be used on its own
- interpolates numbers and arrays (i.e. vectors, colors)
- can tween multiple elements at once
- tweens are cancellable
- triggers onComplete, onStart, onUpdate events

## future thoughts

Some ideas I may choose to explore:

- returning promises, like in [gsap-promise](https://www.npmjs.org/package/gsap-promise)
- modular Tween types, e.g. `tween-array` (garbage free) or `tween-css` 

## Usage

[![NPM](https://nodei.co/npm/tweenr.png)](https://nodei.co/npm/tweenr/)

#### `tweenr = require('tweenr')([opt])`

Creates a new instanceof Tweenr and attaches itself to an application-wide render loop (to minimize animation frame requests). By default, this includes a [common set of eases](https://www.npmjs.org/package/eases). Options:

- `eases` can be specified to provide a new set of easing functions
- `defaultEase` the default easing function, or a string to use as a lookup into the `eases` object

#### `tween = tweenr.to(element, opt)`

Tweens the `element`, which can be an array of objects, or a single object. `opt` can be the following:

- `delay` in seconds, default 0
- `duration` in seconds, default 0
- `ease` the easing function, [see here](https://www.npmjs.org/package/eases) -- defaults to `tweenr.defaultEase` or linear
- `onComplete` called when the tween is complete, with event parameter `{ target }`
- `onStart` called when the tween is started, with event parameter `{ target }`
- `onUpdate` called when the tween is updated, with event parameter `{ target }`

Any other properties to `opt` will be tweened if *they are consistent with `element`* and also if they are a `number` or [an array](https://www.npmjs.org/package/an-array).

```js
var elements = [
    { x: 25, shape: [10, 5] },
    { x: 15, opacity: 0 }
]

tweenr.to(elements, { 
    opacity: 1,
    shape: [5, 0],
    duration: 3,
    delay: 0.25, 
    onComplete: function(ev) {
        console.log(ev.target[0].shape)
    }
})

/*
    after tween is finished, element will equal:
    [
        { x: 25, shape: [5, 0] },
        { x: 15, opacity: 1 }
    ]
*/
```

#### `tweenr.clear()`

Clears all tweens stored in this ticker instance, cancelling them and completing them if they were active.

#### `tweenr.dispose()`

Disposes this instance, removing it from the application-wide frame loop. 

#### `tweenr.on('tick', fn)`

Attaches a function to this tweenr's tick. The event is triggered by the application-wide frame loop with a `delta` parameter in seconds.

This event will stop after `tweenr.dispose()`. 

--

The return value of `tweenr.to()` is a tween with the following:

#### `tween.cancel()`

Cancels the tween, removing it from the queue on the next tick without applying any further interpolation.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/tweenr/blob/master/LICENSE.md) for details.
