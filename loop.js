var engine = require('raf-loop')()
engine.setMaxListeners(Infinity)
engine.start()

module.exports = engine