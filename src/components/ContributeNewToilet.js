import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import GenderSelection from "./GenderSelection";
import FloorSelection from "./FloorSelection";
import { contributeNewToiletServer } from "../services/webServices";
import ComponentCloseButton from "../components/ComponentCloseButton";
const ToiletOptionsContainer = styled.div`
    background-color: #f2f2f2;
    width: 100%;
    height: 300px;
    left: 0;
    bottom: 0;
    position: fixed;
    z-index: 999;
    box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.4);
`;
const ConfirmationContainer = styled.div`
    height: 80px;

    /* background-color: black; */
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

const MessageContainer = styled.div`
    height: 40px;
    color: #4169e1;
    padding: 11px;
    box-sizing: border-box;
    cursor: pointer;
`;

class ContributeNewToilet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentWillUnmount() {}

    handleSubmit() {
        console.log("handleSubmit function called");
        const contributeNewToilet = async () => {
            const payload = {
                lat: this.props.toiletData.currentLocationSelected.lat,
                lng: this.props.toiletData.currentLocationSelected.lng,
                lvl: this.props.toiletData.floor,
                type: this.props.toiletData.gender,
            };
            const response = await contributeNewToiletServer(payload);
            this.props.dispatch({
                type: "navigator/save",
                payload: {
                    infoBarMessage: "New Toilet Contributed",
                    toiletInfoShow: true,
                },
            });
            console.log(response);
        };
        contributeNewToilet();
    }

    render() {
        return (
            <ToiletOptionsContainer>
                <ComponentCloseButton />
                <MessageContainer>
                    Contribute a new toilet location
                </MessageContainer>
                <GenderSelection />
                <FloorSelection />
                <ConfirmationContainer>
                    <ConfirmationButton onClick={() => this.handleSubmit()}>
                        CONFIRM
                    </ConfirmationButton>
                </ConfirmationContainer>
            </ToiletOptionsContainer>
        );
    }
}

ContributeNewToilet.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ContributeNewToilet);
