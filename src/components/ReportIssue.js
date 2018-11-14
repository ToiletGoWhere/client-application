import React from "react";
import axios from "axios";
import { connect } from "dva";
// import styles from "./ReportIssue.css";
import styled from "styled-components";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { reportIssueServer } from "../services/webServices";
import { routerRedux } from "dva/router";
import InformationBar from "../components/InformationBar";

const ReportIssuesContainer = styled.div`
    color: #4169e1;
    background-color: #f2f2f2;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 999;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4);
    padding: 44px 11px 11px 11px;
    box-sizing: border-box;
`;

const categories = [
    {
        value: "1",
        label: "Running out of toilet paper",
    },
    {
        value: "2",
        label: "Damaged facilities",
    },
    {
        value: "3",
        label: "Cleanness",
    },
];
const styles = theme => ({
    textFieldCategory: {
        width: "90%",
        marginLeft: "10px",
        marginRight: "auto",
        color: "white",
        paddingBottom: 0,
        fontWeight: 500,
    },
    categoryLabel: {
        marginTop: "10px",
        marginLeft: "10px",
        paddingBottom: 0,
        fontWeight: 500,
    },
    textFieldIssue: {
        width: "95%",
        marginLeft: "10px",
        marginRight: "10px",
        paddingBottom: 0,
        fontWeight: 500,
    },
    issueLabel: {
        marginLeft: "10px",
        paddingBottom: 0,
        fontWeight: 500,
    },

    fileInput: {
        cursor: " pointer",
    },
});

const ConfirmationButton = styled.div`
    height: 40px;
    width: 331px;
    border-radius: 5px;
    margin-top: 42px;
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

class ReportIssue extends React.Component {
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //   };
    // }
    componentDidMount() {}
    componentWillUnmount() {}
    state = {
        name: "hai",
        labelWidth: 0,
        category: "1",
        multiline: "",
        formData: null,
    };

    handleChangeText = name => event => {
        this.setState({
            [name]: event.target.value,
        });
        // console.log(this.state['category']);
        // console.log(this.state['multiline']);
    };

    handleSubmit = e => {
        // console.log("handleSubmit function called");
        // console.log(this.state["category"]);
        // console.log(this.state["multiline"]);
        const reportIssue = async () => {
            if (
                !this.state["formData"] ||
                !this.state["multiline"] ||
                !this.state["category"]
            ) {
                console.log("Report is not compeleted.");
                this.props.dispatch({
                    type: "navigator/save",
                    payload: {
                        infoBarMessage:
                            "Please provide the detail and a picture.",
                    },
                });
                return;
            }
            const formData = this.state["formData"];
            formData.append(
                "tId",
                this.props.toiletData.currentToiletSelected._id,
            );
            formData.append("content", this.state["multiline"]);
            formData.append("reportType", this.state["category"]);
            const response = await reportIssueServer(formData);
            this.props.dispatch({
                type: "navigator/save",
                payload: {
                    infoBarMessage: "Issue Reported",
                },
            });
            this.props.dispatch(routerRedux.push({ pathname: "/" }));
            console.log(response);
        };
        reportIssue();
    };
    render() {
        const { classes } = this.props;
        const handleImageUpload = async e => {
            try {
                const formData = new FormData();
                formData.append("pic", e.target.files[0]);
                this.setState({ formData: formData });
            } catch (error) {}
        };
        return (
            <ReportIssuesContainer>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className={classes.categoryLabel}>
                        Please select reporting problem category:
                    </div>
                    <br />
                    <TextField
                        id="standard-select-category"
                        select
                        value={this.state.category}
                        onChange={this.handleChangeText("category")}
                        className={classes.textFieldCategory}
                    >
                        {categories.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <p />
                    <div className={classes.issueLabel}>
                        Please explain the issue:
                    </div>
                    <br />
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows="3"
                        value={this.state.multiline}
                        onChange={this.handleChangeText("multiline")}
                        variant="outlined"
                        className={classes.textFieldIssue}
                    />
                    <label htmlFor="imageUpload">
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            className={classes.fileInput}
                            style={{
                                // visibility: "hidden",
                                position: "absolute",
                                marginTop: 22,
                            }}
                            onChange={handleImageUpload}
                        />
                    </label>

                    <ConfirmationButton
                        onClick={() => this.handleSubmit()}
                        type="primary"
                        htmlType="submit"
                        // className={classes.confirmationButton}
                    >
                        Submit
                    </ConfirmationButton>
                </form>
                <InformationBar />
            </ReportIssuesContainer>
        );
    }
}
ReportIssue.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return state;
}

ReportIssue = withStyles(styles, { withTheme: true })(ReportIssue);
export default connect(mapStateToProps)(ReportIssue);
