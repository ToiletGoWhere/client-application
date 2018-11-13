import React from "react";
import { connect } from "dva";
import "antd/dist/antd.css";
import { Rate } from "antd";
import { Divider } from "antd";
//import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./ReviewListItem.css";
import ReviewInputPanel from "./ReviewInputPanel";
import { List, Avatar } from "antd";
import { loadReview } from "../services/webServices";
import { ListItemSecondaryAction } from "@material-ui/core";
import BackButton from "./BackButton";
import styled from "styled-components";
import { routerRedux } from "dva/router";

const ConfirmationButton = styled.div`
    height: 40px;
    width: 300px;
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
    margin-top: -11px;
`;
class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeReviewList: [],
        };
    }

    componentDidMount() {
        this.handleReviewSearch();
    }

    componentWillUnmount() {}

    async handleReviewSearch() {
        const response = await loadReview(
            this.props.toiletData.currentToiletSelected._id,
        );
        this.setState({ activeReviewList: response.data });
        return Promise.resolve();
    }

    render() {
        return (
            <div className={styles.General}>
                <BackButton type="review" />
                <div className={styles.ReviewItemContainer}>
                    <Divider>Reviews</Divider>
                    <List>
                        {this.state.activeReviewList.map((item, i) => {
                            const header = i * 2;
                            const content = i * 2 + 1;
                            return (
                                <div>
                                    <ListItem key={header}>
                                        <Avatar src={item.user.avatar} />
                                        <List.Item.Meta
                                            title={item.user.username}
                                        />
                                        <Rate
                                            className={styles.DisplayRat}
                                            allowHalf
                                            disabled
                                            value={item.rating}
                                        />
                                    </ListItem>
                                    <ListItem key={content}>
                                        <List.Item.Meta
                                            description={item.content}
                                        />
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                </div>
                {this.props.toiletData.login && (
                    <div>
                        <Divider>Add Your Review</Divider>
                        <ReviewInputPanel />
                    </div>
                )}

                {!this.props.toiletData.login && (
                    <div>
                        <span style={{ marginLeft: "10px" }}>
                            You need login to give reviews
                        </span>
                        <ConfirmationButton
                            active
                            onClick={e => {
                                e.stopPropagation();
                                this.props.dispatch(
                                    routerRedux.push({
                                        pathname: "/login",
                                    }),
                                );
                            }}
                        >
                            Login
                        </ConfirmationButton>
                    </div>
                )}
            </div>
        );
    }
}

ReviewListItem.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ReviewListItem);
