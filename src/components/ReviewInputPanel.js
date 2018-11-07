import React from "react";
import { connect } from "dva";
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import styled from "styled-components";
import { Input } from 'antd';

const { TextArea } = Input;

const RatingContainer = styled.div`
    width: 100%;
    text-align: center;
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
      activeReviewList: []
    };
  }

  handleChange = (value) => {
    this.setState({ 
      activeRating: value });
  }

  handleActiveReviewChange = (e) => {
    this.setState({
      activeReview: e.target.value
    })
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {

    return (
        <RatingContainer>
          <span>
          <Rate 
          allowHalf
          value={this.state.activeRating}
          onChange={this.handleChange}
          onHoverChange={() => this.props.dispatch({
            type: "toiletData/save",
            payload: {
              currentRating: this.state.activeRating
            }
          })}
          />
          </span>
          
          <TextArea 
          type="text"
          placeholder="Write your review. Press enter to commit your review." 
          value={this.state.activeReview}
          onChange={this.handleActiveReviewChange}
          onPressEnter={()=>    
            this.props.dispatch({
              type: "toiletData/save",
              payload: {
                currentReview: this.state.activeReview
              }
            })}
          autosize={{ minRows: 2, maxRows: 6 }}
          />
          <ConfirmationButton onClick={() => this.submitReview()}>
            CONFIRM
          </ConfirmationButton>
        </RatingContainer>
      );
    }

    //debugging posting part
  submitReview() {
    //this.setState({ activeReviewList: [...this.state.activeReviewList, this.state.activeRating, this.state.activeReview] });
    /*this.props.dispatch({
      type: "toiletData/save",
      payload: {
        currentRating: this.state.activeRating,
        currentReview: this.state.activeReview,
        reviewList: this.state.activeReviewList
      }
    })*/
    console.log(`Rating: ${this.props.toiletData.currentRating}`);
    console.log(`Review: ${this.props.toiletData.currentReview}`);
    //console.log(`Review List: ${this.props.toiletData.reviewList}`);
  }
}

ReviewInputPanel.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ReviewInputPanel);

