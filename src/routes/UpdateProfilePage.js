import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import UpdateProfile from "../components/UpdateProfile";
import BackButton from "../components/BackButton";
function UpdateProfilePage() {
    return (
        <div className={styles.normal}>
            <BackButton type="profile" />
            <UpdateProfile />
        </div>
    );
}

UpdateProfilePage.propTypes = {};

export default connect()(UpdateProfilePage);
