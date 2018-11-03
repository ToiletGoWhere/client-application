import React from "react";
import { connect } from "dva";
import styles from "./ReviewInputPanel.css";
class ReviewInputPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return <div>Hello World</div>;
  }
}

ReviewInputPanel.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReviewInputPanel);
