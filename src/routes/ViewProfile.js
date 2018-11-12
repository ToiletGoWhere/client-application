import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import ViewProfile from "../components/ViewProfile";
function ViewProfile() {
    return (
        <div className={styles.normal}>
            <ViewProfile />
        </div>
    );
}

ViewProfile.propTypes = {};

export default connect()(ViewProfile);