# tweenr

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Minimal tweening engine.

```js
var tweenr = require('tweenr')()

var data = { x: 5, position: [15, 25] }
tweenr.to()
```

## motivations

This project takes a module-first approach, so its components can be taken apart and reassembled how you see fit. It brings together a [ticker](https://www.npmjs.org/package/tween-ticker), [easing equations](https://www.npmjs.org/package/eases), and a [render loop](https://www.npmjs.org/package/raf-loop).

For a more fully-featured and battle-tested framework, you may be interested in [TweenMax](https://www.npmjs.org/package/gsap) or [tween.js](https://github.com/sole/tween.js).

## Usage

[![NPM](https://nodei.co/npm/tweenr.png)](https://nodei.co/npm/tweenr/)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/tweenr/blob/master/LICENSE.md) for details.
