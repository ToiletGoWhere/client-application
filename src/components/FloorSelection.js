import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import SelectionButton from "./SelectionButton";
const FloorSelectionContainer = styled.div`
  height: 100px;
  padding: 11px;
  color: #4169e1;
  display: flex;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
`;
const activeFloorStyle = {
  color: "#FFF",
  marginTop: "3px"
};
const deactivatedFloorStyle = {
  color: "#4169e1",
  marginTop: "3px"
};
const floors = ["B1", "1", "2", "3", "4"];
class FloorSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFloor: ""
    };
  }
  componentDidMount() {}
  componentWillUnmount() {}
  render() {
    return (
      <FloorSelectionContainer>
        <div>Select Floor</div>
        {floors.map((item, i) => {
          return (
            <SelectionButton
              key={i}
              active={this.props.toiletData.floor === item}
              onClick={() =>
                this.props.dispatch({
                  type: "toiletData/save",
                  payload: {
                    floor: item
                  }
                })
              }
            >
              <div
                style={
                  this.props.toiletData.floor === item
                    ? activeFloorStyle
                    : deactivatedFloorStyle
                }
              >
                {item}
              </div>
            </SelectionButton>
          );
        })}
      </FloorSelectionContainer>
    );
  }
}
FloorSelection.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FloorSelection);
