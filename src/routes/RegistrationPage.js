import React from "react";
import { connect } from "dva";
import styles from "./RegistrationPage.css";
import ToiletOptions from "../components/ToiletOptions";
function RegistrationPage() {
    return (
        <div className={styles.normal}>
            <ToiletOptions />
        </div>
    );
}

RegistrationPage.propTypes = {};

export default connect()(RegistrationPage);
