import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import ToiletOptions from "../components/ToiletOptions";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { loadLogin } from "../services/webServices";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Input } from "antd";
import axios from "axios";

const ConfirmationContainer = styled.div`
    height: 80px;
    /* background-color: black; */
`;

const ConfirmationButton = styled.div`
    height: 40px;
    width: 353px;
    border-radius: 5px;
    padding-top: 8px;
    left: 50%;
    transform: translate(-50%, 50%);
    cursor: pointer;
    background: linear-gradient(
        -45deg,
        #4169e1,
        #7363d6,
        #925dc8,
        #a858ba,
        #b855ab,
        #c3549c
    );
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    position: absolute;
`;

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleUserChange = e => {
        this.setState({
            email: e.target.value,
        });
    };

    handlePassChange = e => {
        this.setState({
            password: e.target.value,
        });
    };

    test() {
        console.log(this.state.email);
        console.log(this.state.password);
        alert("good");
    }

    async login() {
        console.log("login function");

        const payload = {
            email: this.state.email,
            password: this.state.password,
        };
        console.log(payload);

        const response = await loadLogin(payload);
        console.log("response");
        console.log(response);

        if (!response.data.token) {
            console.log("no token");
            alert("Wrong user name or password");
            return false;
        } else {
            console.log("have token");
            localStorage.setItem("token", response.data.token);
            console.log(localStorage);
            axios.defaults.headers.common = {
                Authorization: "Bearer ".concat(localStorage.getItem("token")),
            };
            this.props.dispatch({
                type: "toiletData/save",
                payload: {
                    login: "true",
                },
            });
            return true;
        }
    }

    componentDidMount() {}
    componentWillUnmount() {}

    handleSubmit() {
        console.log("handleSubmit function called");
        this.login();
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className={styles.Root}>
                <div className={styles.Topic}>Toilet go where</div>

                <TextField
                    id="outlined-email-input"
                    label="Email"
                    className={styles.textField}
                    type="email"
                    name="email"
                    variant="outlined"
                    value={this.state.email}
                    onChange={this.handleUserChange}
                    onPressEnter={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                email: this.state.email,
                            },
                        })
                    }
                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={styles.textField}
                    type="password"
                    variant="outlined"
                    value={this.state.password}
                    onChange={this.handlePassChange}
                    onPressEnter={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                password: this.state.password,
                            },
                        })
                    }
                />

                <ConfirmationContainer>
                    <ConfirmationButton onClick={() => this.login()}>
                        CONFIRM
                    </ConfirmationButton>
                </ConfirmationContainer>
            </div>
        );
    }
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(LoginPage);
