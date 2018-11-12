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

const ToiletOptionsContainer = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    height: 350px;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 999;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4);
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
    // confirmationButton: {
    //   height: '40px',
    //   width: '353px',
    //   borderRadius: '5px',
    //   paddingTop: '8px',
    //   left: '50%',
    //   transform: 'translate(-50%, 50%)',
    //   cursor: 'pointer',
    //   // marginTop: '10px',
    //   // marginLeft: '285px',
    //   // background: 'rgba(0, 0, 0,0.15)',
    //   // coloe: 'white'
    //   textAlign: 'center',
    //   color: '#fff',
    //   fontSize: '18px',
    //   fontWeight: '500',
    //   boxSizing: 'border-box',
    //   position: 'absolute'
    // }
    fileInput: {
        // border: " bottom: 4px solid lightgray",
        // border: "right: 4px solid lightgray",
        // border: "top: 1px solid black",
        // border: "left: 1px solid black",
        // padding: " 10px",
        // margin: "5px",
        cursor: " pointer",
    },
});

const ConfirmationButton = styled.div`
    height: 40px;
    width: 353px;
    border-radius: 5px;
    margin-top: 10px;
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

    handleSubmit = event => {
        // console.log("handleSubmit function called");
        // console.log(this.state["category"]);
        // console.log(this.state["multiline"]);
        const reportIssue = async () => {
            const formData = this.state["formData"];
            formData.append("tId", "5be12c031dcb7e2ad6921d39");
            formData.append("content", this.state["multiline"]);
            formData.append("reportType", this.state["category"]);
            const response = await reportIssueServer(formData);
            console.log(response);
        };
        reportIssue();
    };
    render() {
        const { classes } = this.props;
        const handleImageUpload = async e => {
            try {
                /** For upload multiple pictures
                const formData = this.state["formData"]
                    ? this.state["formData"]
                    : new FormData();
                    */
                const formData = new FormData();
                formData.append("pic", e.target.files);
                this.setState({ formData: formData });
                // const response = await reportIssueServer(formData);
            } catch (error) {}
        };
        return (
            <ToiletOptionsContainer>
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
                        {/* {children} */}
                        {/* upload photo */}
                        <input
                            id="imageUpload"
                            type="file"
                            accept="image/*"
                            className={classes.fileInput}
                            style={{
                                // visibility: "hidden",
                                position: "absolute",
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
            </ToiletOptionsContainer>
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
