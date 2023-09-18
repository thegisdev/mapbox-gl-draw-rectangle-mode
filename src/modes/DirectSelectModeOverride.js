import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as Constants from "@mapbox/mapbox-gl-draw/src/constants";
import createSupplementaryPoints from "@mapbox/mapbox-gl-draw/src/lib/create_supplementary_points";
import constrainFeatureMovement from "@mapbox/mapbox-gl-draw/src/lib/constrain_feature_movement";

const DirectSelectModeOverride = MapboxDraw.modes.direct_select;

DirectSelectModeOverride.dragVertex = function (state, e, delta) {
  const selectedCoords = state.selectedCoordPaths.map((coord_path) =>
    state.feature.getCoordinate(coord_path)
  );

  // We want to keep the rectangle shape, so we need to update the other coordinates
  // when one of the corners is dragged.

  if (state.selectedCoordPaths == "0.0") {
    state.feature.updateCoordinate(
      "0.1",
      state.feature.getCoordinate("0.1")[0],
      selectedCoords[0][1]
    );
    state.feature.updateCoordinate(
      "0.3",
      selectedCoords[0][0],
      state.feature.getCoordinate("0.3")[1]
    );
  } else if (state.selectedCoordPaths == "0.1") {
    state.feature.updateCoordinate(
      "0.0",
      state.feature.getCoordinate("0.0")[0],
      selectedCoords[0][1]
    );
    state.feature.updateCoordinate(
      "0.2",
      selectedCoords[0][0],
      state.feature.getCoordinate("0.2")[1]
    );
  } else if (state.selectedCoordPaths == "0.2") {
    state.feature.updateCoordinate(
      "0.3",
      state.feature.getCoordinate("0.3")[0],
      selectedCoords[0][1]
    );
    state.feature.updateCoordinate(
      "0.1",
      selectedCoords[0][0],
      state.feature.getCoordinate("0.1")[1]
    );
  } else if (state.selectedCoordPaths == "0.3") {
    state.feature.updateCoordinate(
      "0.2",
      state.feature.getCoordinate("0.2")[0],
      selectedCoords[0][1]
    );
    state.feature.updateCoordinate(
      "0.0",
      selectedCoords[0][0],
      state.feature.getCoordinate("0.0")[1]
    );
  }

  const selectedCoordPoints = selectedCoords.map((coords) => ({
    type: Constants.geojsonTypes.FEATURE,
    properties: {},
    geometry: {
      type: Constants.geojsonTypes.POINT,
      coordinates: coords,
    },
  }));

  const constrainedDelta = constrainFeatureMovement(selectedCoordPoints, delta);
  for (let i = 0; i < selectedCoords.length; i++) {
    const coord = selectedCoords[i];
    state.feature.updateCoordinate(
      state.selectedCoordPaths[i],
      coord[0] + constrainedDelta.lng,
      coord[1] + constrainedDelta.lat
    );
  }
};

DirectSelectModeOverride.toDisplayFeatures = function (state, geojson, push) {
  if (state.featureId === geojson.properties.id) {
    geojson.properties.active = Constants.activeStates.ACTIVE;
    const isRectangle = geojson?.properties?.user_isRectangle;
    push(geojson);
    createSupplementaryPoints(geojson, {
      map: this.map,
      midpoints: !isRectangle, // We don't wanna show midpoints for rectangles
      selectedPaths: state.selectedCoordPaths,
    }).forEach(push);
  } else {
    geojson.properties.active = Constants.activeStates.INACTIVE;
    push(geojson);
  }
  this.fireActionable(state);
};

export default DirectSelectModeOverride;
