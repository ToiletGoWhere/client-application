import React from "react";
import { connect } from "dva";
import { Accessible, Accessibility, PregnantWoman } from "@material-ui/icons";
import styled from "styled-components";
import SelectionButton from "./SelectionButton";
const GenderSelectionContainer = styled.div`
  height: 80px;
  padding: 11px;
  color: #4169e1;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  align-items: center;
`;
class GenderSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGender: ""
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <GenderSelectionContainer>
        <div>Select Gender</div>
        <SelectionButton
          active={this.props.toiletData.gender === "handicap"}
          onClick={() =>
            this.props.dispatch({
              type: "toiletData/save",
              payload: {
                gender: "handicap"
              }
            })
          }
        >
          <Accessible
            style={
              this.props.toiletData.gender === "handicap"
                ? { color: "#FFF" }
                : { color: "#4169e1" }
            }
          />
        </SelectionButton>
        <SelectionButton
          active={this.props.toiletData.gender === "male"}
          onClick={() =>
            this.props.dispatch({
              type: "toiletData/save",
              payload: {
                gender: "male"
              }
            })
          }
        >
          <Accessibility
            style={
              this.props.toiletData.gender === "male"
                ? { color: "#FFF" }
                : { color: "#4169e1" }
            }
          />
        </SelectionButton>
        <SelectionButton
          active={this.props.toiletData.gender === "female"}
          onClick={() =>
            this.props.dispatch({
              type: "toiletData/save",
              payload: {
                gender: "female"
              }
            })
          }
        >
          <PregnantWoman
            style={
              this.props.toiletData.gender === "female"
                ? { color: "#FFF" }
                : { color: "#4169e1" }
            }
          />
        </SelectionButton>
      </GenderSelectionContainer>
    );
  }
}
GenderSelection.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(GenderSelection);
