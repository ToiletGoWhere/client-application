import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { routerRedux } from "dva/router";
import { ArrowBack } from "@material-ui/icons";
const BackButtonContainer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10000;
`;

function ComponentCloseButton(props) {
    // ping();

    return (
        <BackButtonContainer>
            {(props.type === "global" || props.type === undefined) && (
                <IconButton
                    onClick={() => {
                        props.dispatch(routerRedux.push({ pathname: "/" }));
                    }}
                >
                    <ArrowBack />
                </IconButton>
            )}
            {props.type === "profile" && (
                <IconButton
                    onClick={() => {
                        props.dispatch(
                            routerRedux.push({
                                pathname: "/profile",
                            }),
                        );
                    }}
                >
                    <ArrowBack />
                </IconButton>
            )}
            {props.type === "review" && (
                <IconButton
                    onClick={() => {
                        props.dispatch({ type: "navigator/clear" });
                        props.dispatch({
                            type: "navigator/save",
                            payload: { toiletInfoShow: true },
                        });
                    }}
                >
                    <ArrowBack />
                </IconButton>
            )}
        </BackButtonContainer>
    );
}

ComponentCloseButton.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ComponentCloseButton);
