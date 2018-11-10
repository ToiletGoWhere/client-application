import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import ConfirmationSelection from "./ConfirmationSelection";

const ToiletOptionsContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 120px;
  left: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
`;

class ConfirmToilet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() { }
  componentWillUnmount() { }
  render() {
    
    return (
      <ToiletOptionsContainer>
        <ConfirmationSelection />
      </ToiletOptionsContainer>
    );
  }
}

ConfirmToilet.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ConfirmToilet);
