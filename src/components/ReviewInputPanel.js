import React from "react";
import { connect } from "dva";
import { Rate } from "antd";
import "antd/dist/antd.css";
import styled from "styled-components";
import { Input } from "antd";
import generateReviewList from "./ReviewListItem";
import styles from "./ReviewListItem.css";
import { Alert } from "antd";
import { postReview } from "../services/webServices";
import { loadReview } from "../services/webServices";

const { TextArea } = Input;

const RatingContainer = styled.div`
    height: 200px;
    width: 100%;
    text-align: center;
    color: #4169e1;
    box-sizing: border-box;
    justify-content: flex-start;
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

class ReviewInputPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeRating: 5,
            activeReview: "",
            activeReviewList: [],
        };
    }

    handleChange = value => {
        this.setState({
            activeRating: value,
        });
    };

    handleActiveReviewChange = e => {
        this.setState({
            activeReview: e.target.value,
        });
    };

    componentDidMount() {
        this.load();
    }

    componentWillUnmount() {}

    loggedIn() {
        this.state.props.toiletData === true;
    }

    async load() {
        console.log(this.props.toiletData.currentToiletSelected._id);
        console.log(this.props.toiletData.currentUser.username);
        //console.log(this.props.toiletData.currentToiletSelected.toiletType);
        const response = await loadReview(
            this.props.toiletData.currentToiletSelected._id,
        );
        console.log(response);
        /*this.setState({
            activeReviewList: response.data,
        });*/
    }

    //OK:
    render() {
        return (
            <RatingContainer>
                <span>
                    <Rate
                        //className={"rating"}
                        allowHalf
                        onChange={this.handleChange}
                    />
                </span>
                <div className={styles.Display}>Write a review.</div>
                <TextArea
                    type="text"
                    //className={"review"}
                    placeholder="Review goes here..."
                    onChange={this.handleActiveReviewChange}
                    autosize={{ minRows: 2, maxRows: 6 }}
                />
                <ConfirmationButton
                    onClick={e => {
                        e.stopPropagation();
                        this.generateReviewList();
                    }}
                >
                    CONFIRM
                </ConfirmationButton>
            </RatingContainer>
        );
    }

    //debugging posting part
    /*submitReview() {
        this.generateReviewList();
    }*/

    async generateReviewList() {
        // const submitReview = async () => {
        const payload = {
            tId:
                this.props.toiletData.currentToiletSelected._id ||
                "fkanan123124",
            // user: this.props.toiletData.currentUser,
            content: this.state.activeReview,
            rating: this.state.activeRating,
        };
        const response = await postReview(payload);
        console.log(response);
        // };
        // submitReview();
    }
    /*generateReviewList() {
        let reviewItem = {
            email: this.props.toiletData.currentUser.email,
            rating: this.state.activeRating,
            review: this.state.activeReview,
        };

        this.setState(
            {
                activeReviewList: [...this.state.activeReviewList, reviewItem],
            },
            () => {
                this.props.dispatch({
                    type: "toiletData/save",
                    payload: {
                        currentRating: this.state.activeRating,
                        currentReview: this.state.activeReview,
                        reviewList: this.state.activeReviewList,
                    },
                });
            },
        );
        console.log(`Review List: ${this.props.toiletData.reviewList}`);
    } */

    /*logInfo() {
        //console.log(`Rating: ${this.props.toiletData.currentRating}`);
        //console.log(`Review: ${this.props.toiletData.currentReview}`);
        console.log(`Review List: ${this.props.toiletData.reviewList}`);
    }*/
}

ReviewInputPanel.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ReviewInputPanel);
