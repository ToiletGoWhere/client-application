import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import UpdateProfile from "../components/UpdateProfile";
import BackButton from "../components/BackButton";
import InformationBar from "../components/InformationBar";
function UpdateProfilePage() {
    return (
        <div className={styles.normal}>
            <InformationBar />
            <BackButton type="profile" />
            <UpdateProfile />
        </div>
    );
}

UpdateProfilePage.propTypes = {};

export default connect()(UpdateProfilePage);
