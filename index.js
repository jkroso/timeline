import Animation from '@jkroso/animation'

/**
 * create a timeline
 *
 * @param {Array} anims
 * @return {Timeline}
 */

const timeline = anims => {
  const timeline = new Timeline([])
  if (anims) for (var i = 0; i < anims.length;) {
    timeline.add(...anims[i++])
  }
  return timeline
}

export default timeline

export class Timeline extends Animation {
  constructor(animations) {
    super()
    this.animations = animations
  }

  /**
  * add an animation to the timeline
  *
  * @param {Number} start
  * @param {Number} end
  * @param {Animation} anim
  * @return {this}
  */

  add(start, end, anim) {
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

  render(n) {
    n = this._ease(n)
    const anims = this.animations
    for (let i = 0, len = anims.length; i < len; i++) {
      const [anim, from, to] = anims[i]
      if (n < from || n > to) continue
      anim.render((n - from) / (to - from))
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

  then(anim) {
    if (anim != null) {
      this.on('end', typeof anim != 'function' ? () => anim.run() : anim)
      this.running || this.parent || this.run()
      return this
    }
    anim = new Timeline([])
    anim.parent = this
    this.then(anim)
    return anim
  }
}
