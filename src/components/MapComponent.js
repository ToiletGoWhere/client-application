import React from "react";
import { connect } from "dva";
import styled from "styled-components";

import {
  LocationSearching,
  Search,
  Remove,
  AddLocation
} from "@material-ui/icons";

import loadPosition from "../utils/locator";
import load_google_maps from "../utils/googleMap";
import "../routes/IndexPage.css";

const SearchButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding-top: 8px;
  transform: translate(50%, -100%);
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
  bottom: 0;
  left: 0;
  z-index = 1000;
  align-items: center;
  text-align: center;
`;

const ContributeButton = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  padding-top: 8px;
  transform: translate(-50%, -100%);
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
  bottom: 0;
  right: 0;
  z-index = 1000;
  align-items: center;
  text-align: center;
`;

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

let google = null;

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
      type: "toiletData/save",
      payload: {
        currentLocation: returnedLocation
      }
    });
  }

  reloadLocation(map, curMarker) {
    Promise.all([this.getCurrentPosition()]).then(values => {
      map.setCenter(this.state.currentLocation);
      map.setZoom(19);
      curMarker.setPosition(this.state.currentLocation);
      curMarker.setMap(map);
    });
  }

  componentDidMount() {
    let get_google = load_google_maps();
    let get_location = this.getCurrentPosition();

    Promise.all([get_google, get_location]).then(values => {
      google = values[0];

      let currentLocation = this.state.currentLocation;
      console.log(currentLocation.lat, currentLocation.lng);
      this.google = google;
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 19,
        scrollwheel: true,
        center: currentLocation,
        disableDefaultUI: true
      });

      this.map.addListener("click", evt => {
        if (this.props.navigator.toiletContributeShow) {
          if (this.state.markerUpload != null) {
            this.state.markerUpload.setMap(null);
          }
          this.setState({
            markerUpload: new google.maps.Marker({
              position: { lat: evt.latLng.lat(), lng: evt.latLng.lng() },
              map: this.map,
              icon:
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAMAAAAIG46tAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAEdgAABHYBvT2qxwAAAZhQTFRFdHR0MDAwMDAwGhoaJycnMTExHh4eHR0dPT09RUVFICAgJSUl0NDQAAAAU1NTGxsbMzMzSEhIGhoaKCgoaGhoGxsbLi4uPj4+GxsbNjY2S0tLJCQkHBwcUlJSNDQ0Hh4eISEhLCwsNDQ0Nzc3MTExKCgoHh4eSUlJQkJCJycndHR0Kysrtra2WVlZHR0dGhoaTExMwMDAIiIiGxsbY2Njc3NzoaGhf39/mpqaNTU1HBwcenp6WFhYVlZWsbGxKCgoISEhpaWll5eXX19fbGxsHx8feHh4Ozs7iIiIKCgoMzMzcXFx9PT0ra2tKioqOzs7ODg4i4uLYWFhPz8/UVFRXV1dTU1NgYGBjo6OHx8ffX19MDAwXFxcODg4Z2dnysrKGhoaICAgu7u7JycnICAgHBwcg4ODKysrHBwchoaGdHR0JSUlKSkpVFRUJycnIiIiMDAwGhoaV1dXNTU1OTk5GhoaOTk5Pj4+goKCHBwcKioqbW1tNjY2JiYmICAgGhoaHBwcGhoadHR0JycnJiYmHx8fkZGRHh4eV6dwZwAAAIh0Uk5T//v69aOD0NppXcauHwBO731Z+KA+6Ytn63dWseOTfNXBj3t0gqHUWGKl/pUjSNf0VCK97EE4KDMqeeQ1SUskn8AnK0Q8yzVtL55+ORolmGxzLkJlUEVTMi3PNIVGcj4g8sgjpMfgMZbfMDetmk2hu/z2Snhw83FoXuGZO3WqxfHl9/2iqMos09+Mja4AAAFuSURBVHicY2CgF2BkQhdhZmFlg7DYOTi50CS5eXj5+MEsAV5eQSFUSWFeXhFRMEuMl1ecEVVSQlJKGsKSkZWTR5EUUlBUUlZRlWFgUJMUVFcX1NBEGKylrcMLArp6+gZgBq+hEVzS2MTUDChibmFpZW1jAWTZ2tnDJR0cJZ2AQs4aLq5u7m5AlrKHJ9xUL29lH6CQr5KFn6k/SDIgEC5pHBQcArbJPTQsHCIZAZeMjIp2AkvGxJrHsVrHW/AqxXDDJBMSo33AkknJKalqaW4avOkZ+oiAhZjKy+vFwJCamSXO64cUBgnZOW6GubwhefkFmJIMDIVFjrG8xSAWFsmEIscSXkkckqW2jmVwneXokhVAYy3BkmmmHGiS+ra+UDsrPbI4eKtQJBmVczWrwaGS4F9Ty1eHIslQL8rYAInDRqGmBC0GSkEzFLToNUEEmvRaYGIMvDAQLtkKtFSotTgcLoSQ5OVtU25vV25DEgAAxuZRD7jN410AAAAASUVORK5CYII="
            })
          });

          this.state.markerUpload.setMap(this.map);
          this.props.dispatch({
            type: "toiletData/save",
            payload: {
              currentLocationSelected: {
                lat: evt.latLng.lat(),
                lng: evt.latLng.lng()
              }
            }
          });
          console.log(
            "Uploading toilet location",
            evt.latLng.lat(),
            evt.latLng.lng()
          );
        }
      }); // end of map onclick

      let markerList = [];

      for (var i = 0; i < this.props.toiletData.toiletList.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: this.props.toiletData.toiletList[i].location[0],
            lng: this.props.toiletData.toiletList[i].location[1]
          },
          icon: this.props.toiletData.toiletList[i].confirmed
            ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAQAAACVzLYUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAABG4AAARuAdCjsmgAAAAHdElNRQfiCwYJNCE9cabCAAAB8ElEQVQ4y73UT0tUYRTH8c91ZErTSUzpj5KQLUoQSpJQQgikoDZB7YoWlWCrdvUaatNSdBvRG4ja1MI0JAoNDA20ISqIwGRkSs10pkXX8d5xzBDqudwL53fP9znPOc95nkDelkbZ1rB/Dv70YzPwuwE3vYppky47b7AYzcee+5Lo9DWi3QCnLUQ9iyNmLGHWUkTbGX5jvuVF4AXjpvTYE9GuWJZ1NQ4GkX1cNOSFLxbVOOCMJrzWLy2PQKWzLtlenGPObTsiUx4zLutkbD0VHq3PccY9u9WEVqO0PrPeaVcbasclpNdvx5iPTkmE1i5dnvgkcEh1qLWqWktsFcx7rM6y2dBOazRjRCJSg3y0r1fBGU8d9bbwK2vOfg+LOqYE+F5Gs8mI0xttpqXslbdNLSo0FPItVHXOM7cEEbDSgEHTxuzT5BzumJItrmpKm+exszlvQpdmKXllkkg4qGp9VVf0uqtJhQ6c0KfbSjyv0i2XctG8BzIOG9Gq1x9HvMmXQW7jOBuBgYDCu6qJ2SVBJcDf020CBvJy4SatabnQisHx85jUqkyHIS0FrVa3Sp0+OFIcIzoyFtX5rH7t3FkQSPqmOhoz+O8Xcrn+IiWpXUtswpwJL2PX1wajQa/h8DJcMOy6hr9fSb1rRo3qUV/a4RcIE58hVXY4hgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0wNlQwOTo1MjozMy0wNTowMI750/MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMDZUMDk6NTI6MzMtMDU6MDD/pGtPAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAMAAAAIG46tAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAEdgAABHYBvT2qxwAAAZhQTFRFdHR0MDAwMDAwGhoaJycnMTExHh4eHR0dPT09RUVFICAgJSUl0NDQAAAAU1NTGxsbMzMzSEhIGhoaKCgoaGhoGxsbLi4uPj4+GxsbNjY2S0tLJCQkHBwcUlJSNDQ0Hh4eISEhLCwsNDQ0Nzc3MTExKCgoHh4eSUlJQkJCJycndHR0Kysrtra2WVlZHR0dGhoaTExMwMDAIiIiGxsbY2Njc3NzoaGhf39/mpqaNTU1HBwcenp6WFhYVlZWsbGxKCgoISEhpaWll5eXX19fbGxsHx8feHh4Ozs7iIiIKCgoMzMzcXFx9PT0ra2tKioqOzs7ODg4i4uLYWFhPz8/UVFRXV1dTU1NgYGBjo6OHx8ffX19MDAwXFxcODg4Z2dnysrKGhoaICAgu7u7JycnICAgHBwcg4ODKysrHBwchoaGdHR0JSUlKSkpVFRUJycnIiIiMDAwGhoaV1dXNTU1OTk5GhoaOTk5Pj4+goKCHBwcKioqbW1tNjY2JiYmICAgGhoaHBwcGhoadHR0JycnJiYmHx8fkZGRHh4eV6dwZwAAAIh0Uk5T//v69aOD0NppXcauHwBO731Z+KA+6Ytn63dWseOTfNXBj3t0gqHUWGKl/pUjSNf0VCK97EE4KDMqeeQ1SUskn8AnK0Q8yzVtL55+ORolmGxzLkJlUEVTMi3PNIVGcj4g8sgjpMfgMZbfMDetmk2hu/z2Snhw83FoXuGZO3WqxfHl9/2iqMos09+Mja4AAAFuSURBVHicY2CgF2BkQhdhZmFlg7DYOTi50CS5eXj5+MEsAV5eQSFUSWFeXhFRMEuMl1ecEVVSQlJKGsKSkZWTR5EUUlBUUlZRlWFgUJMUVFcX1NBEGKylrcMLArp6+gZgBq+hEVzS2MTUDChibmFpZW1jAWTZ2tnDJR0cJZ2AQs4aLq5u7m5AlrKHJ9xUL29lH6CQr5KFn6k/SDIgEC5pHBQcArbJPTQsHCIZAZeMjIp2AkvGxJrHsVrHW/AqxXDDJBMSo33AkknJKalqaW4avOkZ+oiAhZjKy+vFwJCamSXO64cUBgnZOW6GubwhefkFmJIMDIVFjrG8xSAWFsmEIscSXkkckqW2jmVwneXokhVAYy3BkmmmHGiS+ra+UDsrPbI4eKtQJBmVczWrwaGS4F9Ty1eHIslQL8rYAInDRqGmBC0GSkEzFLToNUEEmvRaYGIMvDAQLtkKtFSotTgcLoSQ5OVtU25vV25DEgAAxuZRD7jN410AAAAASUVORK5CYII=",
          map: this.map,
          title: JSON.stringify(this.props.toiletData.toiletList[i]),
          zIndex: 1000
        });
        marker.setMap(this.map);

        marker.addListener("click", evt => {
          // this.map.setCenter(marker.getPosition());
          console.log(
            "Current Toilet selected: ",
            marker.getPosition().lat(),
            marker.getPosition().lng()
          );
          this.props.dispatch({
            type: "toiletData/save",
            payload: {
              currentToiletSelected: JSON.parse(marker.getTitle())
            }
          });
        });

        markerList.push(marker);
        this.props.dispatch({
          type: "toiletData/save",
          payload: {
            markerList: markerList
          }
        });
      }

      this.curMarker = new google.maps.Marker({
        position: currentLocation,
        map: this.map
      });
    });
  }

  componentWillReceiveProps() {
    if (this.props.toiletData.updatedResults) {
      let markerList = this.props.toiletData.markerList;
      console.log(this.props.toiletData.toiletList);
      for (var i = 0; i < this.props.toiletData.toiletList.length; i++) {
        let marker = new google.maps.Marker({
          position: {
            lat: this.props.toiletData.toiletList[i].location[0],
            lng: this.props.toiletData.toiletList[i].location[1]
          },
          icon: this.props.toiletData.toiletList[i].confirmed
            ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAQAAACVzLYUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAABG4AAARuAdCjsmgAAAAHdElNRQfiCwYJNCE9cabCAAAB8ElEQVQ4y73UT0tUYRTH8c91ZErTSUzpj5KQLUoQSpJQQgikoDZB7YoWlWCrdvUaatNSdBvRG4ja1MI0JAoNDA20ISqIwGRkSs10pkXX8d5xzBDqudwL53fP9znPOc95nkDelkbZ1rB/Dv70YzPwuwE3vYppky47b7AYzcee+5Lo9DWi3QCnLUQ9iyNmLGHWUkTbGX5jvuVF4AXjpvTYE9GuWJZ1NQ4GkX1cNOSFLxbVOOCMJrzWLy2PQKWzLtlenGPObTsiUx4zLutkbD0VHq3PccY9u9WEVqO0PrPeaVcbasclpNdvx5iPTkmE1i5dnvgkcEh1qLWqWktsFcx7rM6y2dBOazRjRCJSg3y0r1fBGU8d9bbwK2vOfg+LOqYE+F5Gs8mI0xttpqXslbdNLSo0FPItVHXOM7cEEbDSgEHTxuzT5BzumJItrmpKm+exszlvQpdmKXllkkg4qGp9VVf0uqtJhQ6c0KfbSjyv0i2XctG8BzIOG9Gq1x9HvMmXQW7jOBuBgYDCu6qJ2SVBJcDf020CBvJy4SatabnQisHx85jUqkyHIS0FrVa3Sp0+OFIcIzoyFtX5rH7t3FkQSPqmOhoz+O8Xcrn+IiWpXUtswpwJL2PX1wajQa/h8DJcMOy6hr9fSb1rRo3qUV/a4RcIE58hVXY4hgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0wNlQwOTo1MjozMy0wNTowMI750/MAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMDZUMDk6NTI6MzMtMDU6MDD/pGtPAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg=="
            : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAeCAMAAAAIG46tAAAAAXNSR0IB2cksfwAAAAlwSFlzAAAEdgAABHYBvT2qxwAAAZhQTFRFdHR0MDAwMDAwGhoaJycnMTExHh4eHR0dPT09RUVFICAgJSUl0NDQAAAAU1NTGxsbMzMzSEhIGhoaKCgoaGhoGxsbLi4uPj4+GxsbNjY2S0tLJCQkHBwcUlJSNDQ0Hh4eISEhLCwsNDQ0Nzc3MTExKCgoHh4eSUlJQkJCJycndHR0Kysrtra2WVlZHR0dGhoaTExMwMDAIiIiGxsbY2Njc3NzoaGhf39/mpqaNTU1HBwcenp6WFhYVlZWsbGxKCgoISEhpaWll5eXX19fbGxsHx8feHh4Ozs7iIiIKCgoMzMzcXFx9PT0ra2tKioqOzs7ODg4i4uLYWFhPz8/UVFRXV1dTU1NgYGBjo6OHx8ffX19MDAwXFxcODg4Z2dnysrKGhoaICAgu7u7JycnICAgHBwcg4ODKysrHBwchoaGdHR0JSUlKSkpVFRUJycnIiIiMDAwGhoaV1dXNTU1OTk5GhoaOTk5Pj4+goKCHBwcKioqbW1tNjY2JiYmICAgGhoaHBwcGhoadHR0JycnJiYmHx8fkZGRHh4eV6dwZwAAAIh0Uk5T//v69aOD0NppXcauHwBO731Z+KA+6Ytn63dWseOTfNXBj3t0gqHUWGKl/pUjSNf0VCK97EE4KDMqeeQ1SUskn8AnK0Q8yzVtL55+ORolmGxzLkJlUEVTMi3PNIVGcj4g8sgjpMfgMZbfMDetmk2hu/z2Snhw83FoXuGZO3WqxfHl9/2iqMos09+Mja4AAAFuSURBVHicY2CgF2BkQhdhZmFlg7DYOTi50CS5eXj5+MEsAV5eQSFUSWFeXhFRMEuMl1ecEVVSQlJKGsKSkZWTR5EUUlBUUlZRlWFgUJMUVFcX1NBEGKylrcMLArp6+gZgBq+hEVzS2MTUDChibmFpZW1jAWTZ2tnDJR0cJZ2AQs4aLq5u7m5AlrKHJ9xUL29lH6CQr5KFn6k/SDIgEC5pHBQcArbJPTQsHCIZAZeMjIp2AkvGxJrHsVrHW/AqxXDDJBMSo33AkknJKalqaW4avOkZ+oiAhZjKy+vFwJCamSXO64cUBgnZOW6GubwhefkFmJIMDIVFjrG8xSAWFsmEIscSXkkckqW2jmVwneXokhVAYy3BkmmmHGiS+ra+UDsrPbI4eKtQJBmVczWrwaGS4F9Ty1eHIslQL8rYAInDRqGmBC0GSkEzFLToNUEEmvRaYGIMvDAQLtkKtFSotTgcLoSQ5OVtU25vV25DEgAAxuZRD7jN410AAAAASUVORK5CYII=",
          map: this.map,
          title: JSON.stringify(this.props.toiletData.toiletList[i]),
          zIndex: 1000
        });
        marker.setMap(this.map);

        marker.addListener("click", evt => {
          // this.map.setCenter(marker.getPosition());
          console.log(
            "Current Toilet selected: ",
            marker.getPosition().lat(),
            marker.getPosition().lng()
          );
          this.props.dispatch({
            type: "toiletData/save",
            payload: {
              currentToiletSelected: JSON.parse(marker.getTitle())
            }
          });
        });
        markerList.push(marker);
      }

      this.props.dispatch({
        type: "toiletData/save",
        payload: {
          markerList: markerList,
          updatedResults: false
        }
      });
    }
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
        <SearchButton>
          <Search
            onClick={() => {
              this.props.dispatch({
                type: "navigator/save",
                payload: {
                  toiletInforShow: true
                }
              });
            }}
          />
        </SearchButton>
        <ContributeButton>
          {this.props.navigator.toiletContributeShow ? (
            <Remove
              onClick={() => {
                this.props.dispatch({
                  type: "navigator/save",
                  payload: {
                    toiletContributeShow: false,
                    currentLocationSelected: {
                      lat: "",
                      lng: ""
                    }
                  }
                });
                if (this.state.markerUpload != null) {
                  this.state.markerUpload.setMap(null);
                }
                console.log("Uploading toilet location reset");
              }}
            />
          ) : (
            <AddLocation
              onClick={e =>
                this.props.dispatch({
                  type: "navigator/save",
                  payload: {
                    toiletContributeShow: true
                  }
                })
              }
            />
          )}
        </ContributeButton>
      </div>
    );
  }
}

MapComponent.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MapComponent);
