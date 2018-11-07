import React from "react";
import { connect } from "dva";
import 'antd/dist/antd.css';
import { List, Avatar } from 'antd';
import { Rate } from 'antd';
import ReviewInputPanel from './ReviewInputPanel';


class ReviewListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRating: this.props.toiletData.currentRating,
      activeReview: this.props.toiletData.currentReview,
      activeReviewList: this.props.toiletData.reviewList
    };
  }
  componentDidMount() {
    this.generateReviewList.bind(this)(this.state.activeReviewList)
  }

  componentWillUnmount() {}

  async generateReviewList() {
    var rating = this.state.activeRating
    var review = this.state.activeReview

    this.setState({ activeReviewList: [...this.state.activeReviewList, rating, review] })

    this.props.dispatch({
      type: "toiletData/save",
      payload:{
        reviewList: this.state.activeReviewList
      }
    })
    console.log(`Review List: ${this.props.toiletData.reviewList}`)
  }

  //fixing display
  render() {
    return (
      <List itemLayout="horizontal"
            dataSource={this.state.activeReviewList}
            renderItem={item => (
        <List.Item>
          <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title="Display username"
          description={item.review}
          />
          <Rate disabled allowHalf defaultValue={2.5} value={item.rating}/>
        </List.Item>
      )}
    />
    );
  }
}

ReviewListItem.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReviewListItem);
