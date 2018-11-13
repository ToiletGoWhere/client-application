import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";
import MapComponent from "../components/MapComponent";
import SideBar from "../components/SideBar";
import ToiletOptions from "../components/ToiletOptions";
import ToiletInfo from "../components/ToiletInfo";
import ConfirmToilet from "../components/ConfirmToilet";
import ReviewInputPanel from "../components/ReviewInputPanel";
import ContributeNewToilet from "../components/ContributeNewToilet";
import ReviewListItem from "../components/ReviewListItem";
import InformationBar from "../components/InformationBar";
function IndexPage(props) {
    return (
        <div className={styles.normal}>
            <InformationBar />
            <SideBar />
            <MapComponent />
            {props.navigator.toiletOptionsShow && <ToiletOptions />}
            {props.navigator.toiletInfoShow && <ToiletInfo />}
            {props.navigator.confirmToiletShow && <ConfirmToilet />}
            {props.navigator.toiletContributeShow && <ContributeNewToilet />}
            {props.navigator.reviewInputItemShow && <ReviewInputPanel />}
            {props.navigator.showReviewList && <ReviewListItem />}
        </div>
    );
}

IndexPage.propTypes = {};

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(IndexPage);
