import React from 'react';
import { connect } from 'dva';
import styled from 'styled-components';

import { LocationSearching } from '@material-ui/icons';

import loadPosition from '../utils/locator';
import load_google_maps from '../utils/googleMap';
import '../routes/IndexPage.css';

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
      markerUpload: null
    };
  }
  async getCurrentPosition() {
    const returnedLocation = await loadPosition();
    this.setState({ currentLocation: returnedLocation });
    console.log(this.state.currentLocation);

    this.props.dispatch({
      type: 'toiletData/save',
      payload: {
        currentLocation: returnedLocation
      }
    });
  }

  reloadLocation(map, curMarker) {
    Promise.all([this.getCurrentPosition()]).then(values => {
      map.setCenter(this.state.currentLocation);
      curMarker.setPosition(this.state.currentLocation);
      curMarker.setMap(map);
    });
  }

  componentDidMount() {
    let get_google = load_google_maps();
    let get_location = this.getCurrentPosition();

    Promise.all([get_google, get_location]).then(values => {
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

      this.map.addListener('click', evt => {
        if (this.state.markerUpload != null) {
          this.state.markerUpload.setMap(null);
        }
        this.state.markerUpload = new google.maps.Marker({
          position: { lat: evt.latLng.lat(), lng: evt.latLng.lng() },
          map: this.map,
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAQAAACVzLYUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAABG4AAARuAdCjsmgAAAAHdElNRQfiCwYJNCE9cabCAAAB8ElEQVQ4y73UT0tUYRTH8c91ZErTSUzpj5KQLUoQSpJQQgikoDZB7YoWlWCrdvUaatNSdBvRG4ja1MI0JAoNDA20ISqIwGRkSs10pkXX8d5xzBDqudwL53fP9znPOc95nkDelkbZ1rB/Dv70YzPwuwE3vYppky47b7AYzcee+5Lo9DWi3QCnLUQ9iyNmLGHWUkTbGX5jvuVF4AXjpvTYE9GuWJZ1NQ4GkX1cNOSFLxbVOOCMJrzWLy2PQKWzLtlenGPObTsiUx4zLutkbD0VHq3PccY9u9WEVqO0PrPeaVcbasclpNdvx5iPTkmE1i5dnvgkcEh1qLWqWktsFcx7rM6y2dBOazRjRCJSg3y0r1fBGU8d9bbwK2vOfg+LOqYE+F5Gs8mI0xttpqXslbdNLSo0FPItVHXOM7cEEbDSgEHTxuzT5BzumJItrmpKm+exszlvQpdmKXllkkg4qGp9VVf0uqtJhQ6c0KfbSjyv0i2XctG8BzIOG9Gq1x9HvMmXQW7jOBuBgYDCu6qJ2SVBJcDf020CBvJy4SatabnQisHx85jUqkyHIS0FrVa3Sp0+OFIcIzoyFtX5rH7t3FkQSPqmOhoz+O8Xcrn+IiWpXUtswpwJL2PX1wajQa/h8DJcMOy6hr9fSb1rRo3qUV/a4RcIE58hVXY4hgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0wNlQwOTo1MjozMy0wNTowMI750/MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMDZUMDk6NTI6MzMtMDU6MDD/pGtPAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=='
        });
        this.state.markerUpload.setMap(this.map);
        this.props.dispatch({
          type: 'toiletData/save',
          payload: {
            currentLocationSelected: {
              lat: evt.latLng.lat(),
              lng: evt.latLng.lng()
            }
          }
        });
        console.log(
          'Uploading toilet location',
          evt.latLng.lat(),
          evt.latLng.lng()
        );
      });

      var toilets = this.props.toiletData.toiletList;
      console.log(toilets);

      for (var i = 0; i < toilets.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: toilets[i].location[0],
            lng: toilets[i].location[1]
          },
          icon:
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAQAAACVzLYUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAABG4AAARuAdCjsmgAAAAHdElNRQfiCwYJNCE9cabCAAAB8ElEQVQ4y73UT0tUYRTH8c91ZErTSUzpj5KQLUoQSpJQQgikoDZB7YoWlWCrdvUaatNSdBvRG4ja1MI0JAoNDA20ISqIwGRkSs10pkXX8d5xzBDqudwL53fP9znPOc95nkDelkbZ1rB/Dv70YzPwuwE3vYppky47b7AYzcee+5Lo9DWi3QCnLUQ9iyNmLGHWUkTbGX5jvuVF4AXjpvTYE9GuWJZ1NQ4GkX1cNOSFLxbVOOCMJrzWLy2PQKWzLtlenGPObTsiUx4zLutkbD0VHq3PccY9u9WEVqO0PrPeaVcbasclpNdvx5iPTkmE1i5dnvgkcEh1qLWqWktsFcx7rM6y2dBOazRjRCJSg3y0r1fBGU8d9bbwK2vOfg+LOqYE+F5Gs8mI0xttpqXslbdNLSo0FPItVHXOM7cEEbDSgEHTxuzT5BzumJItrmpKm+exszlvQpdmKXllkkg4qGp9VVf0uqtJhQ6c0KfbSjyv0i2XctG8BzIOG9Gq1x9HvMmXQW7jOBuBgYDCu6qJ2SVBJcDf020CBvJy4SatabnQisHx85jUqkyHIS0FrVa3Sp0+OFIcIzoyFtX5rH7t3FkQSPqmOhoz+O8Xcrn+IiWpXUtswpwJL2PX1wajQa/h8DJcMOy6hr9fSb1rRo3qUV/a4RcIE58hVXY4hgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0wNlQwOTo1MjozMy0wNTowMI750/MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMDZUMDk6NTI6MzMtMDU6MDD/pGtPAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==',
          map: this.map,
          title: JSON.stringify(toilets[i])
        });
        marker.setMap(this.map);

        marker.addListener('click', evt => {
          this.map.setCenter(marker.getPosition());
          console.log(
            'Current Toilet selected: ',
            marker.getPosition().lat(),
            marker.getPosition().lng()
          );
          this.props.dispatch({
            type: 'toiletData/save',
            payload: {
              currentToiletSelected: JSON.parse(marker.getTitle())
            }
          });
        });
      }

      this.curMarker = new google.maps.Marker({
        position: currentLocation,
        map: this.map
      });
    });
  }
  render() {
    return (
      <div>
        <div id="map" />
        <ReloadLocationButton
          onClick={() => this.reloadLocation(this.map, this.curMarker)}
        >
          <LocationSearching />
        </ReloadLocationButton>
      </div>
    );
  }
}

MapComponent.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MapComponent);
