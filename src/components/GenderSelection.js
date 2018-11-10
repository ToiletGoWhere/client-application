import React from "react";
import { connect } from "dva";
import { Accessible, Accessibility, PregnantWoman } from "@material-ui/icons";
import styled from "styled-components";
import SelectionButton from "./SelectionButton";
import FemaleIcon from "../assets/icons/FemaleIcon";
import MaleIcon from "../assets/icons/MaleIcon";
import NursingIcon from "../assets/icons/NursingIcon";
const GenderSelectionContainer = styled.div`
    height: 80px;
    padding: 11px;
    color: #4169e1;
    display: flex;
    justify-content: flex-start;
    box-sizing: border-box;
    align-items: center;
`;
class GenderSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGender: "",
        };
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        return (
            <GenderSelectionContainer>
                <div>Select Gender</div>
                <SelectionButton
                    active={this.props.toiletData.gender === "accessible"}
                    onClick={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                gender: "accessible",
                            },
                        })
                    }
                >
                    <Accessible
                        style={
                            this.props.toiletData.gender === "accessible"
                                ? { color: "#FFF" }
                                : { color: "#4169e1" }
                        }
                    />
                </SelectionButton>
                <SelectionButton
                    active={this.props.toiletData.gender === "male"}
                    onClick={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                gender: "male",
                            },
                        })
                    }
                >
                    <MaleIcon
                        active={this.props.toiletData.gender === "male"}
                    />
                </SelectionButton>
                <SelectionButton
                    active={this.props.toiletData.gender === "female"}
                    onClick={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                gender: "female",
                            },
                        })
                    }
                >
                    <FemaleIcon
                        active={this.props.toiletData.gender === "female"}
                    />
                </SelectionButton>
                <SelectionButton
                    active={this.props.toiletData.gender === "nursing"}
                    onClick={() =>
                        this.props.dispatch({
                            type: "toiletData/save",
                            payload: {
                                gender: "nursing",
                            },
                        })
                    }
                >
                    <NursingIcon
                        active={this.props.toiletData.gender === "nursing"}
                    />
                </SelectionButton>
            </GenderSelectionContainer>
        );
    }
}
GenderSelection.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(GenderSelection);
