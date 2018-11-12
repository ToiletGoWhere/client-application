import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import UpdateProfile from "../components/UpdateProfile";
function UpdateProfile() {
    return (
        <div className={styles.normal}>
            <UpdateProfile />
        </div>
    );
}

UpdateProfile.propTypes = {};

export default connect()(UpdateProfile);