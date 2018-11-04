import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
// import Example from "../components/Example";
import ToiletOptions from "../components/ToiletOptions";
function IndexPage() {
  return (
    <div className={styles.normal}>
      <ToiletOptions />
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
