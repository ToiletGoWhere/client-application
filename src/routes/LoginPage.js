import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { loadLogin } from "../services/webServices";
import { setHeader } from "../services/webServices";
import styled from "styled-components";
import { routerRedux } from "dva/router";
import BackButton from "../components/BackButton";
import "antd/dist/antd.css";

const ConfirmationContainer = styled.div`
    height: 80px;
    /* background-color: black; */
`;

const ConfirmationButton = styled.div`
    height: 40px;
    width: 331px;
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
        this.state = { email: "", password: "", showPassword: false };
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

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
        try {
            console.log("login function");

            const payload = {
                email: this.state.email,
                password: this.state.password,
            };
            console.log(payload);

            const response = await loadLogin(payload);
            console.log("response");
            console.log(response);

            if (!response.data.token || response >= 300) {
                console.log("no token");
                alert("Wrong user name or password");
                return false;
            } else {
                console.log("have token");
                localStorage.setItem("token", response.data.token);
                setHeader();
                this.props.dispatch({
                    type: "toiletData/save",
                    payload: {
                        login: true,
                        currentUser: response.data.user,
                    },
                });
                this.props.dispatch(
                    routerRedux.push({
                        pathname: "/",
                    }),
                );
                return true;
            }
        } catch (error) {
            alert("Wrong user name or password");
            console.log(error);
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
                <BackButton />
                <div>
                    <img
                        src="https://i.imgur.com/r8CwlyM.png"
                        alt="Toilet go where"
                        className={styles.Pic}
                    />
                </div>

                <div className={styles.textField}>
                    <TextField
                        autoFocus
                        id="outlined-email-input"
                        label="Email"
                        type="email"
                        name="email"
                        variant="outlined"
                        value={this.state.email}
                        fullWidth
                        onChange={this.handleUserChange}
                    />
                </div>
                <div className={styles.textField}>
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Password"
                        type={this.state.showPassword ? "text" : "password"}
                        variant="outlined"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div
                    style={{ color: "#4169e1" }}
                    onClick={() => {
                        this.props.dispatch(
                            routerRedux.push({
                                pathname: "/register",
                            }),
                        );
                    }}
                >
                    Not Registered Yet? Click to register.
                </div>
                <ConfirmationContainer>
                    <ConfirmationButton onClick={() => this.login()}>
                        Login
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
