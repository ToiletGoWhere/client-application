import React from "react";
import { connect } from "dva";
import stylescss from "./UpdateProfile.css";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";
import { updateProfileServer } from "../services/webServices";
import { uploadAvatar } from "../services/webServices";

const ToiletOptionsContainer = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    height: 740px;
    left: 0;
    bottom: 0;
    position: fixed;
`;

const categories = [
    {
        value: "female",
        label: "Female",
    },
    {
        value: "male",
        label: "Male",
    },
    {
        value: "nursing",
        label: "Nursing",
    },
    {
        value: "accesible",
        label: "Accessible",
    },
];
const styles = theme => ({
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    row: {
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
    },
    avatar: {
        marginTop: "50px",
        marginBottom: "10px",
    },
    bigAvatar: {
        width: 80,
        height: 80,
    },
    imageUpload: {
        display: "flex",
        justifyContent: "center",
    },
});

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

class UpdateProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "hai",
            labelWidth: 0,
            category: this.props.toiletData.currentUser.toiletType,
            username: this.props.toiletData.currentUser.username,
        };
    }
    componentDidMount() {}
    componentWillUnmount() {}

    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    handleSubmit = event => {
        console.log("handleSubmit function called");
        console.log(this.state["category"]);
        console.log(this.state["username"]);
        const updateProfile = async () => {
            const payload = {
                username: this.state["username"],
                toiletType: this.state["category"],
            };
            const response = await updateProfileServer(payload);
            this.props.dispatch({
                type: "navigator/save",
                payload: {
                    infoBarMessage: "Profile Updated",
                },
            });
            console.log(response);
        };
        updateProfile();
    };
    render() {
        const { classes } = this.props;
        const handleImageUpload = async e => {
            try {
                const formData = new FormData();
                formData.append("pic", e.target.files[0]);
                const response = await uploadAvatar(formData);
                console.log("response.data", response.data);
                let user = this.props.toiletData.currentUser;
                user.avatar = response.data;
                this.props.dispatch({
                    type: "toiletData/save",
                    payload: {
                        currentUser: user,
                    },
                });
            } catch (error) {}
        };
        return (
            <ToiletOptionsContainer>
                <div className={classes.row}>
                    <Avatar
                        src={
                            this.props.toiletData.currentUser.avatar ||
                            "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg"
                        }
                        className={classNames(
                            classes.avatar,
                            classes.bigAvatar,
                        )}
                    />
                </div>

                <label htmlFor="imageUpload" className={classes.imageUpload}>
                    {/* {children} */}
                    {/* upload photo */}
                    Change Picture
                    <input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        style={{
                            visibility: "hidden",
                            position: "absolute",
                        }}
                        onChange={handleImageUpload}
                    />
                </label>

                <form autoComplete="off">
                    <div className={stylescss.textField}>
                        <TextField
                            id="outlined-helperText"
                            label="Username"
                            value={this.state.username}
                            className={classes.textField}
                            onChange={this.handleChangeText("username")}
                            margin="normal"
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <p />
                    <div className={stylescss.textField}>
                        <TextField
                            id="outlined-select-category"
                            select
                            label="Preferred Toilet Type"
                            className={classes.textField}
                            value={this.state.category}
                            onChange={this.handleChangeText("category")}
                            fullWidth
                            SelectProps={{
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}
                            margin="normal"
                            variant="outlined"
                        >
                            {categories.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <ConfirmationButton
                        onClick={() => this.handleSubmit()}
                        type="primary"
                        htmlType="submit"
                    >
                        Confirm
                    </ConfirmationButton>
                </form>
            </ToiletOptionsContainer>
        );
    }
}

UpdateProfile.propTypes = {};

function mapStateToProps(state) {
    return state;
}

UpdateProfile = withStyles(styles, { withTheme: true })(UpdateProfile);
export default connect(mapStateToProps)(UpdateProfile);
