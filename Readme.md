
# timeline

  orchestrate a group of animations

## Installation

With your favorite package manager:

- [packin](//github.com/jkroso/packin): `packin add jkroso/timeline`
- [component](//github.com/component/component#installing-packages): `component install jkroso/timeline`
- [npm](//npmjs.org/doc/cli/npm-install.html): `npm install timeline`

then in your app:

<!--js window = global -->

```js
var timeline = require('timeline')
```

## API

### timeline([animations])

  create a timeline with an option Array of initial animations

### Timeline.add(start, end, animation)

  add an animation to the timeline

### Timeline.render(n)

  render point `n` on the timeline

### Timeline.then([anim]:Animation|Function)

  create a new timeline which will start when this
  one completes
