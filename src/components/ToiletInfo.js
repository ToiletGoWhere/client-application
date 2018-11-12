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
import FemaleIcon from "../assets/icons/FemaleIcon";
import MaleIcon from "../assets/icons/MaleIcon";
import NursingIcon from "../assets/icons/NursingIcon";
import axios from "axios";
import { loadReview } from "../services/webServices";

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
        maxHeight: 300,
    },
    listSection: {
        backgroundColor: "inherit",
    },
    ul: {
        backgroundColor: "inherit",
        padding: 0,
    },
});

class ToiletInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: [],
        };
    }

    async load() {
        console.log(this.props.toiletData.currentToiletSelected._id);
        console.log(this.props.toiletData.currentToiletSelected.toiletType);
        const response = await loadReview(
            this.props.toiletData.currentToiletSelected._id,
        );
        console.log(response);
        this.setState({
            reviewList: response.data,
        });
    }

    componentDidMount() {
        this.load();
    }

    componentWillUnmount() {}

    render() {
        return (
            <div className={styles.General}>
                <div className={styles.gender__container}>
                    <div className={styles.Display}>Gender:</div>
                    {this.props.toiletData.currentToiletSelected.toiletType ===
                        "accessible" && (
                        <SelectionButton
                            active
                            onChange={() =>
                                this.props.dispatch({
                                    type: "toiletData/save",
                                    payload: {
                                        toiletType: "accessible",
                                    },
                                })
                            }
                        >
                            <Accessible style={{ color: "#FFF" }} />
                        </SelectionButton>
                    )}

                    {this.props.toiletData.currentToiletSelected.toiletType ===
                        "male" && (
                        <SelectionButton
                            active
                            onChange={() =>
                                this.props.dispatch({
                                    type: "toiletData/save",
                                    payload: {
                                        toiletType: "male",
                                    },
                                })
                            }
                        >
                            <MaleIcon active />
                        </SelectionButton>
                    )}

                    {this.props.toiletData.currentToiletSelected.toiletType ===
                        "female" && (
                        <SelectionButton
                            active
                            onChange={() =>
                                this.props.dispatch({
                                    type: "toiletData/save",
                                    payload: {
                                        toiletType: "female",
                                    },
                                })
                            }
                        >
                            <FemaleIcon active />
                        </SelectionButton>
                    )}

                    {this.props.toiletData.currentToiletSelected.toiletType ===
                        "nursing" && (
                        <SelectionButton
                            active
                            onChange={() =>
                                this.props.dispatch({
                                    type: "toiletData/save",
                                    payload: {
                                        toiletType: "nursing",
                                    },
                                })
                            }
                        >
                            <NursingIcon active />
                        </SelectionButton>
                    )}
                </div>

                <div className={styles.DisplayOut}>
                    Rating:
                    <Rate
                        className={styles.DisplayRat}
                        disabled
                        allowHalf
                        value={
                            this.props.toiletData.currentToiletSelected.rating
                        }
                    />
                </div>

                <div className={styles.Display}>
                    Persons give review :
                    {this.props.toiletData.currentToiletSelected.numFeedback}
                </div>

                <div className={styles.Display}>Review:</div>
                <div className={styles.Root}>
                    {this.state.reviewList.map((item, i) => {
                        return (
                            <List>
                                <li>
                                    <ul className={styles.Ul}>
                                        <ListItem key={i}>
                                            <ListItemText
                                                primary={item.content}
                                            />
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
