import React from "react";
import { connect } from "dva";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import { Clear } from "@material-ui/icons";
const CloseButtonContainer = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    z-index: 10000;
`;

function ComponentCloseButton(props) {
    // ping();

    return (
        <CloseButtonContainer>
            <IconButton
                onClick={() => {
                    props.dispatch({ type: "navigator/clear" });
                }}
            >
                <Clear />
            </IconButton>
        </CloseButtonContainer>
    );
}

ComponentCloseButton.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(ComponentCloseButton);
