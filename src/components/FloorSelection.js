import React from "react";
import { connect } from "dva";
import styles from "./FloorSelection.css";
class FloorSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    return <div className={styles.base}>Hello World</div>;
  }
}

FloorSelection.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(FloorSelection);
