import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import GenderSelection from "./GenderSelection";
import FloorSelection from "./FloorSelection";
const ToiletOptionsContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 300px;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
`;
const LocationErrorContainer = styled.div`
  height: 40px;
  color: #4169e1;
  padding: 11px;
  box-sizing: border-box;
  cursor: pointer;
`;
const FloorSelectionContainer = styled.div`
  height: 100px;
  background-color: red;
`;
const ConfirmationContainer = styled.div`
  height: 80px;
  /* background-color: black; */
`;
const ConfirmationButton = styled.div`
  height: 40px;
  width: 353px;
  border-radius: 5px;
  padding-top: 8px;
  left: 50%;
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
  text-align: center;
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  box-sizing: border-box;
  position: absolute;
`;

class ToiletOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  componentWillUnmount() { }
  submitToiletOptions() {
    console.log(`Gender Selected: ${this.props.toiletData.gender}`);
    console.log(`Floor Selected: ${this.props.toiletData.floor}`);

  }
  render() {
    return (
      <ToiletOptionsContainer>
        <GenderSelection />
        <FloorSelection />
        <ConfirmationContainer>
          <ConfirmationButton 
            onClick={() =>
              this.props.dispatch({
                type: "toiletData/save",
                payload: {
                  floor: "",
                  gender: ""
                }
              })
            }>
            CONFIRM
          </ConfirmationButton>
        </ConfirmationContainer>
      </ToiletOptionsContainer>
    );
  }
}

ToiletOptions.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ToiletOptions);
