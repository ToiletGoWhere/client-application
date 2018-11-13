import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import classNames from "classnames";
import { routerRedux } from "dva/router";

const ToiletOptionsContainer = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    height: 740px;
    left: 0;
    bottom: 0;
    position: fixed;
`;

const styles = theme => ({
    labelStyle: {
        marginTop: "10px",
        marginLeft: "10px",
        display: "flex",
        justifyContent: "flex-start",
        paddingBottom: 0,
        fontWeight: 500,
        fontSize: "20px",
    },
    preloadValue: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: 0,
        fontWeight: 500,
        fontSize: "15px",
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
        this.state = {};
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        const { classes } = this.props;
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
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className={classes.labelStyle}>
                        Username:&nbsp;
                        <span>
                            {this.props.toiletData.currentUser.username}
                        </span>
                    </div>
                    <p />
                    <div className={classes.labelStyle}>
                        Preferred Toilet Type:&nbsp;
                        <span>
                            {this.props.toiletData.currentUser.toiletType}
                        </span>
                    </div>
                    <ConfirmationButton
                        onClick={e => {
                            e.stopPropagation();
                            this.props.dispatch(
                                routerRedux.push({
                                    pathname: "/update",
                                }),
                            );
                        }}
                        type="primary"
                        htmlType="submit"
                        className={classes.confirmationButton}
                    >
                        Update
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
