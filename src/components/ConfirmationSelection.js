import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import SelectionButton from "./SelectionButton";
import { confirmToiletServer } from "../services/webServices";

const ConfirmationContainer = styled.div`
    height: 100px;
    padding: 11px;
    color: #4169e1;
    box-sizing: border-box;
`;
const ButtonGroup = styled.div`
    margin-top: 20px;
    margin-left: 100px;
    display: flex;
    box-sizing: border-box;
    justify-content: flex-start;
    align-items: center;
`;
const activeChoiceStyle = {
    color: "#FFF",
    marginTop: "3px",
};
const deactivatedFloorStyle = {
    color: "#4169e1",
    marginTop: "3px",
};
const choices = ["YES", "Cancel"];

class ConfirmToilet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChoice: "",
        };
    }
    componentDidMount() {}
    componentWillUnmount() {}
    render() {
        return (
            <ConfirmationContainer>
                <div>Please help us confirm the toilet you just used:)</div>
                <ButtonGroup>
                    {choices.map((item, i) => {
                        return (
                            <SelectionButton
                                key={i}
                                active={this.state.activeChoice === item}
                                onClick={
                                    () => {
                                        //FIXME: What is this?
                                        const payload = {
                                            tolietId: this.props.toiletData
                                                .currentToiletSelected._id,
                                        };
                                        console.log("item:" + item);
                                        if (item === "YES") {
                                            this.setState({
                                                activeChoice: "YES",
                                            });
                                            confirmToiletServer(payload);
                                        } else {
                                            this.setState({
                                                activeChoice: "Cancel",
                                            });
                                        }
                                    }
                                    // this.props.dispatch({
                                    //   type: "toiletData/save",
                                    //   payload: {
                                    //     choice: item
                                    //   }
                                    // })
                                }
                            >
                                <div
                                    style={
                                        this.props.toiletData.choice === item
                                            ? activeChoiceStyle
                                            : deactivatedFloorStyle
                                    }
                                >
                                    {item}
                                </div>
                            </SelectionButton>
                        );
                    })}
                </ButtonGroup>
            </ConfirmationContainer>
        );
    }
}

ConfirmToilet.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ConfirmToilet);
