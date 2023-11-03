## Mapbox GL Draw Rectangle Mode

A custom mode for MapboxGL Draw to draw rectangles that adds the functionality of keeping the rectangle's shape when adjusting a corner of the drawn rectangles.
This mode is compatible with @mapbox/mapbox-gl-draw@1.4.0 and above.
Original inspiration comes from this package, which hasn't been mantained for the last 4 years:
https://github.com/thegisdev/mapbox-gl-draw-rectangle-mode

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

Once a rectangle is created, 1 event is fired:
- `draw.create` with the created rectangle

### Build

`yarn build` will do it.

### License
MIT
