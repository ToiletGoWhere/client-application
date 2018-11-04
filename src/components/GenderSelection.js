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
  justify-content: space-around;
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
          active={this.state.activeGender === "handicap"}
          onClick={() => this.setState({ activeGender: "handicap" })}
        >
          <Accessible
            style={
              this.state.activeGender === "handicap"
                ? { color: "#FFF" }
                : { color: "#4169e1" }
            }
          />
        </SelectionButton>
        <SelectionButton
          active={this.state.activeGender === "male"}
          onClick={() => this.setState({ activeGender: "male" })}
        >
          <Accessibility
            style={
              this.state.activeGender === "male"
                ? { color: "#FFF" }
                : { color: "#4169e1" }
            }
          />
        </SelectionButton>
        <SelectionButton
          active={this.state.activeGender === "female"}
          onClick={() => this.setState({ activeGender: "female" })}
        >
          <PregnantWoman
            style={
              this.state.activeGender === "female"
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
