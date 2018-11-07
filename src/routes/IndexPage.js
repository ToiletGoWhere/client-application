import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import Example from "../components/Example";
import ReviewListItem from "../components/ReviewListItem";
function IndexPage() {
  return (
    <div className={styles.normal}>
      <ReviewListItem />
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);
