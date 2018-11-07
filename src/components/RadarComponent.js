import React from "react";
import { connect } from "dva";
import Radar from "react-radar-screen";
class RadarComponent extends React.Component {
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

Radar.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(RadarComponent);
