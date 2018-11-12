import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import UpdateProfile from "../components/UpdateProfile";
function UpdateProfilePage() {
    return (
        <div className={styles.normal}>
            <UpdateProfile />
        </div>
    );
}

UpdateProfilePage.propTypes = {};

export default connect()(UpdateProfilePage);