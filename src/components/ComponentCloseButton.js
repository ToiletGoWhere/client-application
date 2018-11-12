import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { HighlightOff } from "@material-ui/icons";
const CloseButtonContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
`;

function ComponentCloseButton(props) {
    // ping();

    return (
        <CloseButtonContainer>
            <IconButton
                onClick={() => {
                    props.dispatch({
                        type: "navigator/clear",
                    });
                }}
            >
                <HighlightOff />
            </IconButton>
        </CloseButtonContainer>
    );
}

ComponentCloseButton.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ComponentCloseButton);
