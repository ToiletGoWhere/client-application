import React from "react";
import { connect } from "dva";
import "antd/dist/antd.css";
import { Rate } from "antd";
import { Form } from "antd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styles from "./ReviewListItem.css";

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
        this.generateReviewList.bind(this)(this.state.activeReviewList);
    }

    componentWillUnmount() {}

    async generateReviewList() {
        let rating = this.props.toiletData.currentRating;
        let review = this.props.toiletData.currentReview;
        this.setState({
            activeReviewList: [...this.state.activeReviewList, rating, review],
        });

        this.props.dispatch({
            type: "toiletData/save",
            payload: {
                reviewList: this.state.activeReviewList,
            },
        });
    }

    //fixing display
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
            </div>
            /*<List
      //className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={activeReviewList}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="insert username"
            description={item.rating}
          />
          <div>Rating</div>
          <Rate disabled allowHalf defaultValue={2.5} value={item.review}/>
        </List.Item>
      )}
    />*/
        );
    }
}

ReviewListItem.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ReviewListItem);
