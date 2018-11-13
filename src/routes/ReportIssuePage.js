import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import ReportIssue from "../components/ReportIssue";
import BackButton from "../components/BackButton";
function ReportIssuePage() {
    return (
        <div className={styles.normal}>
            <BackButton />
            <ReportIssue />
        </div>
    );
}

ReportIssuePage.propTypes = {};

export default connect()(ReportIssuePage);
