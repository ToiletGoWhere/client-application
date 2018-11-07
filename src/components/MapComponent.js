import React from "react";
import { connect } from "dva";
import styled from "styled-components";

import { LocationSearching } from "@material-ui/icons";


import loadPosition from '../utils/locator';
import load_google_maps from '../utils/googleMap';
import "../routes/IndexPage.css"

const ReloadLocationButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding-top: 8px;
  transform: translate(-50%, 50%);
  cursor: pointer;
  background: linear-gradient(
    -45deg,
    #4169e1,
    #7363d6,
    #925dc8,
    #a858ba,
    #b855ab,
    #c3549c
  );
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  z-index = 1000;
  align-items: center;
  text-align: center;
`;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: { lat: 1.294285, lng: 103.774492 },

    };
  }
  async getCurrentPosition() {
    const returnedLocation = await loadPosition();
    this.setState({ currentLocation: returnedLocation })
    console.log(this.state.currentLocation)
  }

  reloadLocation(map, curMarker) {
    this.getCurrentPosition;
    map.setCenter(this.state.currentLocation);
    curMarker.setPosition(this.state.currentLocation)
    curMarker.setMap(map);
  }

  componentDidMount() {
    let get_google = load_google_maps();
    let get_location = this.getCurrentPosition();

    Promise.all([
      get_google,
      get_location
    ]).then(values => {
      let google = values[0];

      let currentLocation = this.state.currentLocation;
      console.log(currentLocation.lat, currentLocation.lng);
      this.google = google;
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 19,
        scrollwheel: true,
        center: currentLocation,
        disableDefaultUI: true
      });

      this.curMarker = new google.maps.Marker({
        position: currentLocation,
        map: this.map
      });


    });
  }
  render() {
    return (
      <div>
        <div id="map">
        </div>
        <ReloadLocationButton onClick={() => this.reloadLocation(this.map, this.curMarker)}>
          <LocationSearching></LocationSearching>
        </ ReloadLocationButton>
      </div>

    );
  }
}

MapComponent.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MapComponent);
