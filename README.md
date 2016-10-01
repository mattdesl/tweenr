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
- small, focused and modular design; e.g. [tween-ticker](https://www.npmjs.org/package/tween-ticker) is a good fit for [modular components](https://github.com/mattdesl/tweenr/tree/master/test/fancy-box/index.js)
- interpolates numbers and arrays (i.e. vectors, colors)
- can tween multiple elements at once
- tweens are cancellable
- triggers complete, start, update, cancelling events
- extensible and optimizable tween types: [tween-array](https://www.npmjs.org/package/tween-array), [tween-chain](https://www.npmjs.org/package/tween-chain), etc

## Usage

[![NPM](https://nodei.co/npm/tweenr.png)](https://nodei.co/npm/tweenr/)

#### `tweenr = require('tweenr')([opt])`

Creates a new instanceof Tweenr and attaches itself to an application-wide render loop (to minimize animation frame requests). By default, this includes a [common set of eases](https://www.npmjs.org/package/eases). Options:

- `eases` can be specified to provide a new set of easing functions, defaults to [the eases module](https://www.npmjs.org/package/eases)
- `defaultEase` the default easing function, or a string to use as a lookup into the `eases` object. defaults to a linear function

#### `tween = tweenr.to(tween)`

If only one argument is given, this method pushes a new tween onto the stack, returning that tween for chaining. Same as `tweenr.push(tween)`. 

#### `tween = tweenr.to(element, opt)`

A convenience version of `to()` which handles the most common case: object tweening. If the second argument, `opt` is truthy and an object, this method creates a new [object tween](https://www.npmjs.org/package/tween-objects) and pushes it onto the stack.

The tween modifies `element`, which can be an array of objects, or a single object. `opt` can be the following:

- `delay` in time units, default 0
- `duration` in time units, default 0
- `ease` is a string (lookup for the `eases` passed at constructor) or an [ease function](https://www.npmjs.org/package/eases), defaults to `tweenr.defaultEase`

Any other properties to `opt` will be tweened if *they are consistent with `element`* and also if they are a `number` or [an array](https://www.npmjs.org/package/an-array).

```js
var elements = [
    { x: 25, shape: [10, 5] },
    { x: 15, opacity: 0 }
]

var tween = tweenr.to(elements, { 
    opacity: 1,
    shape: [5, 0],
    duration: 3,
    delay: 0.25
})

/*
    after tween is finished, element will equal:
    [
        { x: 25, shape: [5, 0] },
        { x: 15, opacity: 1 }
    ]
*/
```

#### `tween = tweenr.to()`

If no arguments are given, this method creates an "empty" or dummy tween that can be cancelled. This is similar to the way `noop` functions are used to avoid conditionals in functional programming. 

#### `tweenr.push(tween)`

Pushes a generic tween object onto the stack. Like `tweenr.to(tween)` but more explicit.

```js
var array = require('tween-array')
tweenr.push(array(start, end, { duration: 5 }))
    .on('complete', doSomething)
```

#### `tweenr.dispose()`

Disposes this instance, removing it from the application-wide frame loop. 

#### `tweenr.on('tick', fn)`

Attaches a function to this tweenr's tick. The event is triggered by the application-wide frame loop with a `delta` parameter in seconds.

This event will stop after `tweenr.dispose()`. 

#### `tweenr.cancel()`

Clears and cancels all tweens stored in this tweenr instance. Returns this for chaining.

#### `tweenr.timeScale`

A value (default 1.0) which scales the delta time per frame, allowing you to slow down or speed up an instance of tweenr.

--

The return value of `tweenr.to()` is a tween with the following:

#### `tween.cancel()`

Cancels the tween, removing it from the queue on the next tick without applying any further interpolation. 

#### `tween.on(event, func)`

The returned tween is an event emitter with the following events:

- `start` triggered when the tween is first started
- `cancelling` triggered before the tween completes, initiating from a call to `cancel()`
- `complete` triggered when the tween is completed
- `update` triggered after the tween updates its values

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/tweenr/blob/master/LICENSE.md) for details.
