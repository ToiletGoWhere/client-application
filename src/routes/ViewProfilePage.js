import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import ViewProfile from "../components/ViewProfile";
import BackButton from "../components/BackButton";
function ViewProfilePage() {
    return (
        <div className={styles.normal}>
            <BackButton />
            <ViewProfile />
        </div>
    );
}

ViewProfilePage.propTypes = {};

export default connect()(ViewProfilePage);
