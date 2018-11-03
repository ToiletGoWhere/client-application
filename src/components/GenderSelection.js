import React from "react";
import { connect } from "dva";
import styles from "./GenderSelection.css";
class GenderSelection extends React.Component {
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

GenderSelection.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(GenderSelection);
