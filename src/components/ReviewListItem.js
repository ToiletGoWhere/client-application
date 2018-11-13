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
            activeReviewList: [],
        };
    }

    componentDidMount() {
        this.handleReviewSearch().then(res => {
            this.setState({
                activeReviewList: [res.data],
            });
        });
    }

    componentWillUnmount() {}

    async handleReviewSearch() {
        const response = await loadReview(
            this.props.toiletData.currentToiletSelected._id,
        );
        console.log(response);
    }

    render() {
        return (
            <div className={styles.General}>
                <div className={styles.ReviewItemContainer}>
                    <div className={styles.Display}>Feedback List</div>
                    <Divider>Scroll down to see latest review</Divider>
                    <List>
                        {this.state.activeReviewList.map((item, i) => {
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
