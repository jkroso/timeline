
var Animation = require('animation')

/**
 * create a timeline
 *
 * @param {Array} anims
 * @return {Timeline}
 */

module.exports = function(anims){
  var line = new Timeline
  if (anims) for (var i = 0; i < anims.length;) {
    line.add.apply(line, anims[i++])
  }
  return line
}

function Timeline(){
  this.animations = []
}

/**
 * inherit from Animation
 */

Animation.extend(Timeline)

/**
 * add an animation to the timeline
 *
 * @param {Number} start
 * @param {Number} end
 * @param {Animation} anim
 * @return {this}
 */

Timeline.prototype.add = function(start, end, anim){
  if (arguments.length == 1) {
    anim = start
    start = 0
    end = 1
  }
  this.animations.push([anim, start, end])
  return this
}

/**
 * render all animations at point `n` on the timeline
 *
 * @param {Number} n
 * @return {this}
 */

Timeline.prototype.render = function(n){
  n = this._ease(n)
  var anims = this.animations
  var i = anims.length
  while (i--) {
    var anim = anims[i]
    var from = anim[1]
    var to = anim[2]
    if (from > n) anim[0].render(0)
    else if (to < n) anim[0].render(1)
    else anim[0].render((n - from) / (to - from))
  }
  return this
}

/**
 * create a new timeline which will start when this
 * one complete
 *
 * @param {Animation|Function} [anim]
 * @return {Timeline}
 */

Timeline.prototype.then = function(anim){
  if (anim != null) {
    var fn = typeof anim != 'function'
      ? function(){ anim.run() }
      : anim
    this.on('end', fn)
    this.running || this.parent || this.run()
    return this
  }
  anim = new Timeline
  anim.parent = this
  this.then(anim)
  return anim
}
