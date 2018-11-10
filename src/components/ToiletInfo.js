import React from "react";
import { connect } from "dva";
import { Rate } from "antd";
import "antd/dist/antd.css";
import { Accessible, Accessibility, PregnantWoman } from "@material-ui/icons";
import styled from "styled-components";
import SelectionButton from "./SelectionButton";
import styles from "./ToiletInfo.css";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const RatingContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const cardStyles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300
  },
  listSection: {
    backgroundColor: "inherit"
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0
  }
});

class ToiletInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentWillUnmount() {
    this.props.dispatch(loadData(this.props.userId));
  }

  render() {
    //this.captureData();

    return (
      <div className={styles.General}>
        <div className={styles.gender__container}>
          <div className={styles.Display}>Gender:</div>
          {this.props.toiletData.gender === "handicap" && (
            <SelectionButton
              active
              onChange={() =>
                this.props.dispatch({
                  type: "toiletData/save",
                  payload: {
                    gender: "handicap"
                  }
                })
              }
            >
              <Accessible style={{ color: "#FFF" }} />
            </SelectionButton>
          )}

          {this.props.toiletData.gender === "male" && (
            <SelectionButton
              active
              onChange={() =>
                this.props.dispatch({
                  type: "toiletData/save",
                  payload: {
                    gender: "male"
                  }
                })
              }
            >
              <Accessibility style={{ color: "#FFF" }} />
            </SelectionButton>
          )}

          {this.props.toiletData.gender === "female" && (
            <SelectionButton
              active
              onChange={() =>
                this.props.dispatch({
                  type: "toiletData/save",
                  payload: {
                    gender: "female"
                  }
                })
              }
            >
              <PregnantWoman style={{ color: "#FFF" }} />
            </SelectionButton>
          )}
        </div>

        <div className={styles.DisplayOut}>
          Rating:
          <Rate
            className={styles.DisplayRat}
            disabled
            allowHalf
            value={this.props.currentToiletSelected.rating}
          />
        </div>

        <div className={styles.Display}>Review:</div>
        <div className={styles.Root}>
          {this.fetch(
            "api/feedbacks/{this.props.currentToiletSelected._Id}}"
          ).map((item, i) => {
            return (
              <List>
                <li>
                  <ul className={styles.Ul}>
                    <ListItem key={i}>
                      <ListItemText primary={item} />
                    </ListItem>
                  </ul>
                </li>
                <Divider className={styles.Divi} />
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}

ToiletInfo.propTypes = {};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ToiletInfo);
