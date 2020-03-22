import React from 'react';
import {Marker,GoogleApiWrapper} from 'google-maps-react';
import GoogleMap from 'google-maps-react';

class MapContainer extends React.Component {
  
    onMarkerDragEnd = (coord) => {
      if(!this.props.dragMarkerDisable){
      this.props.onMarkerDragEnd(coord)
      }
    };
  
    render() {
     const lat = 22.0127399;
     const lng = 71.4523598;
     const {location} = this.props
      return (
        <div style={{position:"relative",overflow:"hidden",height:"200px"}}>
        <div id="mapcontainer" >
        <GoogleMap 
                google={this.props.google}
                initialCenter = {{lat,lng} }
                center = {{lat,lng}}
                style={{
                width: "100%",
                height: "100%",
                }}
                zoom={5}
            >
            <Marker
              position={location}
              draggable={true}
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
    apiKey: 'AIzaSyCW5oLWMlu_ZeqE10XtrpyuFutbvkduEwA'
  }) (MapContainer);  