import React from "react";
import { connect } from "dva";
import styles from "./LoginPage.css";
import ToiletOptions from "../components/ToiletOptions";
function LoginPage() {
    return (
        <div className={styles.normal}>
            <ToiletOptions />
        </div>
    );
}

LoginPage.propTypes = {};

export default connect()(LoginPage);
