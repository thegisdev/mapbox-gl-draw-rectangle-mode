## Mapbox GL Draw Rectangle Mode

This is a custom mode for Mapbox GL Draw  that adds the functionality to draw rectangles

### Install

`yarn add mapbox-gl-draw-rectangle-mode`

### Usage

```js
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode';

const modes = MapboxDraw.modes;
modes.draw_rectangle = DrawRectangle;

const draw = new MapboxDraw({
  modes: modes
});

draw.changeMode('draw_rectangle');
```

Once a rectangle is created, 1 events is fired:
- `draw.create` with the created rectangle

### Build

`yarn build` will do it.

### License

MIT
