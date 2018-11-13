import React from "react";
import { connect } from "dva";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const SnackBarCustomized = withStyles({
    anchorOriginBottomCenter: {},
})(Snackbar);

class InformationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}
    componentDidUpdate() {
        if (this.props.navigator.infoBarMessage !== "") {
            setTimeout(() => {
                this.props.dispatch({
                    type: "navigator/save",
                    payload: {
                        infoBarMessage: "",
                    },
                });
            }, 3000);
        }
    }
    handleClose() {}
    componentWillUnmount() {}

    render() {
        return (
            <div>
                <SnackBarCustomized
                    open={this.props.navigator.infoBarMessage !== ""}
                    onClose={() => this.handleClose()}
                    message={
                        <span id="message-id">
                            {this.props.navigator.infoBarMessage}
                        </span>
                    }
                    // anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    ContentProps={{ "aria-describedby": "message-id" }}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            // className={classes.close}
                            onClick={() => {}}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}

InformationBar.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(InformationBar);

// this.props.dispatch({
//     type: "navigator/save",
//     payload: {
//         infoBarMessage: "HI",
//     },
// });
