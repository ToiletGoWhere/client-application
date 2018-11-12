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
import { loadReview } from "../services/webServices";
import ComponentCloseButton from "../components/ComponentCloseButton";
import { routerRedux } from "dva/router";

const ConfirmationButton = styled.div`
    height: 40px;
    width: 300px;
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

class ToiletInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewList: [],
        };
    }

    confirm() {
        if (this.props.toiletData.currentToiletSelected.confirmed === false) {
            return (
                <div className={styles.DisplayConfirm}>
                    This toilet is contributed by other users, result may not be
                    accurate.
                </div>
            );
        } else {
            return;
        }
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
                <ComponentCloseButton />
                {this.confirm()}
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
                <div className={styles.DisplayOutRat}>
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
                <div className={styles.Display}>
                    <ConfirmationButton
                        active
                        onClick={() =>
                            this.props.dispatch(
                                routerRedux.push({
                                    pathname: "/",
                                }),
                            )
                        }
                    >
                        TODO: View all reviews
                    </ConfirmationButton>
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
