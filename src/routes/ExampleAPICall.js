import React from "react";
import { connect } from "dva";

import { pingServer } from "../services/webServices";
const ping = async () => {
    const response = await pingServer();
    console.log(response);
};
function ExampleAPICall() {
    ping();
    return <div>Inspect and Go To Networks and find the ping</div>;
}

ExampleAPICall.propTypes = {};

export default connect()(ExampleAPICall);
