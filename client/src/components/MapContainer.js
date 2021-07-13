import React from "react";
import { Marker, GoogleApiWrapper } from "google-maps-react";
import GoogleMap from "google-maps-react";
import { DEFAULT_LOCATION } from "../Constants";

class MapContainer extends React.Component {
  onMarkerDragEnd = (coord) => {
    if (!this.props.dragMarkerDisable) {
      this.props.onMarkerDragEnd(coord);
    }
  };

  render() {
    const { location, draggable, google } = this.props;
    return (
      <div
        style={{ position: "relative", overflow: "hidden", height: "200px" }}
      >
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
              onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
              name={"Marker 1"}
            />
          </GoogleMap>
        </div>
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCW5oLWMlu_ZeqE10XtrpyuFutbvkduEwA",
})(MapContainer);
