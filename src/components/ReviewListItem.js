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

    /*async generateReviewList() {
        //let rating = this.props.toiletData.currentRating;
        //let review = this.props.toiletData.currentReview;
        this.setState({
            activeReviewList: [...this.state.activeReviewList, rating, review],
        });

        this.props.dispatch({
            type: "toiletData/save",
            payload: {
                reviewList: this.state.activeReviewList,
            },
        });
    }*/

    //Display ok
    //TODO: Fetch username and avatar from backend
    //remove avatar & title from list item meta??
    render() {
        //let { activeReviewList } = this.state.activeReviewList;
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
                                        /*avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }*/
                                        title={item.email}
                                        description={item.review}
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
