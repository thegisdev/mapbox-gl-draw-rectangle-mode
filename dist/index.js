"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DrawRectangle = {
  // When the mode starts this function will be called.
  onSetup: function onSetup(opts) {
    var rectangle = undefined.newFeature({
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [[[], [], [], [], []]]
      }
    });
    undefined.addFeature(rectangle);
    undefined.clearSelectedFeatures();
    undefined.updateUIClasses({ mouse: "add" });
    undefined.setActionableState({
      trash: true
    });
    return {
      rectangle: rectangle
    };
  },
  // Whenever a user clicks on the map, Draw will call `onClick`
  onClick: function onClick(state, e) {
    // if state.startPoint exist, means its second click
    //change to  simple_select mode
    if (state.startPoint && state.startPoint[0] !== e.lngLat.lng && state.startPoint[1] !== e.lngLat.lat) {
      undefined.updateUIClasses({ mouse: "pointer" });
      undefined.changeMode("simple_select");
      delete state["startPoint"];
    }
    // on first click, save clicked point coords as starting for  rectangle
    var startPoint = [e.lngLat.lng, e.lngLat.lat];
    state.startPoint = startPoint;
  },
  onMouseMove: function onMouseMove(state, e) {
    // if startPoint, update the feature coords, using the bounding box concept
    // we are simply using the startingPoint coordinates and the current Mouse Position
    // coordinates to calculate the bounding box on the fly, which will be our rectangle
    if (state.startPoint) {
      state.rectangle.updateCoordinate("0.0", state.startPoint[0], state.startPoint[1]); //minX, minY - the starting point
      state.rectangle.updateCoordinate("0.1", e.lngLat.lng, state.startPoint[1]); // maxX, minY
      state.rectangle.updateCoordinate("0.2", e.lngLat.lng, e.lngLat.lat); // maxX, maxY
      state.rectangle.updateCoordinate("0.3", state.startPoint[0], e.lngLat.lat); // minX,maxY
      state.rectangle.updateCoordinate("0.4", state.startPoint[0], state.startPoint[1]); //minX,minY - ending point (equals to starting point)
    }
  },
  // Whenever a user clicks on a key while focused on the map, it will be sent here
  onKeyUp: function onKeyUp(state, e) {
    if (e.keyCode === 27) return undefined.changeMode("simple_select");
  },
  onStop: function onStop(state) {
    undefined.updateUIClasses({ mouse: "none" });
    undefined.activateUIButton();

    // check to see if we've deleted this feature
    if (undefined.getFeature(state.rectangle.id) === undefined) return;

    //remove last added coordinate
    state.rectangle.removeCoordinate("0.4");
    if (state.rectangle.isValid()) {
      undefined.map.fire("draw.create", {
        features: [state.rectangle.toGeoJSON()]
      });
    } else {
      undefined.deleteFeature([state.rectangle.id], { silent: true });
      undefined.changeMode("simple_select", {}, { silent: true });
    }
  },
  toDisplayFeatures: function toDisplayFeatures(state, geojson, display) {
    display(geojson);
  },
  onTrash: function onTrash(state) {
    undefined.deleteFeature([state.rectangle.id], { silent: true });
    undefined.changeMode("simple_select");
  }
};

exports.default = DrawRectangle;