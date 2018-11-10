import React from "react";
import { connect } from "dva";
import "antd/dist/antd.css";
import { Rate } from "antd";
import { Divider } from "antd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./ReviewListItem.css";
import ReviewInputPanel from "./ReviewInputPanel";

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
    render() {
        //let { activeReviewList } = this.state.activeReviewList;
        return (
            <div className={styles.General}>
                <div className={styles.Display}>Feedback List</div>
                <List>
                    {this.props.toiletData.reviewList.map((item, i) => {
                        return (
                            <ListItem key={i}>
                                <ListItemText primary={item.review} />
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
