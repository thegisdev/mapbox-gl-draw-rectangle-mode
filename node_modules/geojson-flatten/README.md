# geojson-flatten

Flatten MultiPoint, MultiPolygon, MultiLineString, and GeometryCollection
geometries in [GeoJSON](http://geojson.org/) files into simple non-complex
geometries.

If a FeatureCollection is passed in, a FeatureCollection is returned. If a single Feature is passed in, an array of Features is returned.

## install

```
npm install --save geojson-flatten
```

Or download `geojson-flatten.js` for non-[browserify](http://browserify.org/) usage.

## example

```js
let flatten = require('geojson-flatten');

flattened = flatten(geojsonObject);
```
