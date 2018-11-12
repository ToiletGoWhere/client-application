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

class ReviewListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //activeRating: this.props.toiletData.currentRating,
            //activeReview: this.props.toiletData.currentReview,
            activeReviewList: this.props.toiletData.reviewList,
        };
    }
    componentDidMount() {
        //TODO:
    }

    componentWillUnmount() {}

    async handleReviewSearch(toiletId) {
        const response = await loadReview(toiletId);
        console.log(response);

        this.props.dispatch({
            type: "toiletData/save",
            payload: {
                reviewList: response.data,
            },
        });

        this.props.dispatch({
            type: "toiletData/save",
            payload: {
                updatedResults: true,
            },
        });
    }

    //Display ok
    //update to fetch username
    render() {
        // let { activeReviewList } = this.state.activeReviewList;
        // this.handleReviewSearch(toiletId);

        return (
            <div className={styles.General}>
                <div className={styles.ReviewItemContainer}>
                    <div className={styles.Display}>Feedback List</div>
                    <Divider>Scroll down to see latest review</Divider>
                    <List>
                        {this.props.toiletData.reviewList.map((item, i) => {
                            return (
                                <ListItem key={i}>
                                    <List.Item.Meta
                                        avatar={item.user.avatar}
                                        title={item.user.username}
                                        description={item.content}
                                    />

                                    <Rate
                                        className={styles.DisplayRat}
                                        allowHalf
                                        disabled
                                        value={item.rating}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </div>
                <Divider>Add Your Review</Divider>
                <ReviewInputPanel />
            </div>
        );
    }
}

ReviewListItem.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ReviewListItem);
