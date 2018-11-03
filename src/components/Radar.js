import React from "react";
import { connect } from "dva";
class Radar extends React.Component {
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

Radar.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Radar);
