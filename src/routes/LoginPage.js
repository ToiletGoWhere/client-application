import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import ToiletOptions from "../components/ToiletOptions";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
class LoginPage extends React.Component() {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }
    render() {
        return (
            <div className={styles.normal}>
                <div />
                Login Page
            </div>
        );
    }
}

LoginPage.propTypes = {};

export default connect()(LoginPage);
