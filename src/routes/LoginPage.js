import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import ToiletOptions from "../components/ToiletOptions";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            greeting: "Hello World",
        };
    }
    componentDidMount() {}
    componentWillUnmount() {}

    render() {
        return <div className={styles.base}>{this.state.greeting}</div>;
    }
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(LoginPage);
