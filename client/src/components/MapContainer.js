import React from "react";
import { Marker, GoogleApiWrapper } from "google-maps-react";
import GoogleMap from "google-maps-react";
import { DEFAULT_LOCATION } from "../Constants";

const MapContainer = ({
  location,
  draggable,
  google,
  dragMarkerDisable,
  onMarkerDragEnd,
}) => {
  const handleMarkerDragEnd = (coord) => {
    if (!dragMarkerDisable) {
      onMarkerDragEnd(coord);
    }
  };

  return (
    <div style={{ position: "relative", overflow: "hidden", height: "200px" }}>
      <div id="mapcontainer">
        <GoogleMap
          google={google}
          initialCenter={DEFAULT_LOCATION}
          center={DEFAULT_LOCATION}
          style={{
            width: "100%",
            height: "100%",
          }}
          zoom={3}
        >
          <Marker
            position={location}
            draggable={draggable}
            onDragend={(t, map, coord) => handleMarkerDragEnd(coord)}
            name={"Marker 1"}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_API_KEY,
})(MapContainer);
