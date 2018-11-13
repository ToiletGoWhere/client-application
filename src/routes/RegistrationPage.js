import React from "react";
import { connect } from "dva";
import styles from "./RegistrationPage.css";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { register } from "../services/webServices";
import styled from "styled-components";
import "antd/dist/antd.css";
import { routerRedux } from "dva/router";
import BackButton from "../components/BackButton";

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

class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            showPassword: false,
        };
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
    handleConfirmPassChange = e => {
        this.setState({ confirmPassword: e.target.value });
    };

    test() {
        console.log(this.state.email);
        console.log(this.state.password);
        alert("good");
    }

    async register() {
        try {
            console.log(this.state.email);
            console.log(this.state.password);
            console.log(this.state.confirmPassword);
            if (this.state.password !== this.state.confirmPassword) {
                alert("Password not match");
                return;
            } else {
                const payload = {
                    email: this.state.email,
                    password: this.state.password,
                };

                console.log(payload);
                const response = await register(payload);
                console.log(response);

                this.props.dispatch(
                    routerRedux.push({
                        pathname: "/login",
                    }),
                );

                return;
            }
        } catch (error) {
            alert("Password not match");
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
                <div className={styles.textField}>
                    <TextField
                        fullWidth
                        error={
                            this.state.confirmPassword !== this.state.password
                        }
                        id="outlined-password-input2"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        value={this.state.confirmPassword}
                        onChange={this.handleConfirmPassChange}
                    />
                </div>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        color: "#4169e1",
                    }}
                    onClick={() => {
                        this.props.dispatch(
                            routerRedux.push({
                                pathname: "/login",
                            }),
                        );
                    }}
                >
                    Already have an account? Click to login
                </div>
                <ConfirmationContainer>
                    <ConfirmationButton onClick={() => this.register()}>
                        Register
                    </ConfirmationButton>
                </ConfirmationContainer>
            </div>
        );
    }
}

RegistrationPage.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(RegistrationPage);
