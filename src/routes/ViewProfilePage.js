import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import ViewProfile from "../components/ViewProfile";
function ViewProfilePage() {
    return (
        <div className={styles.normal}>
            <ViewProfile />
        </div>
    );
}

ViewProfilePage.propTypes = {};

export default connect()(ViewProfilePage);