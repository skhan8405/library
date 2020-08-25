/* eslint-disable react/destructuring-assignment */

import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import AutoComplete from "../types/AutoCompleteComponent";
import FieldComponent from "../types/DateTimeComponent";
import TextComponents from "../types/TextComponents";
import { ReactComponent as SaveLogo } from "../images/save-icon.svg";

const RightDrawer = (props) => {
    const [showSavePopup, setShowSavePopup] = useState("none");
    const [saveFilterName, setSaveFilterName] = useState("");
    const [saveFilterWarning, setSaveFilterWarning] = useState("");
    const [warningLabel, setWarningLabel] = useState("");
    const [applyFilterWarning, setApplyFilterWarning] = useState("");
    const [
        applyfilterWarningClassName,
        setApplyFilterWariningClassname
    ] = useState("");
    const [recentFilterShow, setRecentFilterShow] = useState("none");
    const [filterShow, setFilterShow] = useState("");
    useEffect(() => {
        setApplyFilterWarning(props.emptyFilterWarning);
        setApplyFilterWariningClassname(props.emptyFilterClassName);
    }, [props.emptyFilterWarning, props.emptyFilterClassName]);
    useEffect(() => {
        setWarningLabel(props.saveWarningClassName);
        setSaveFilterWarning(props.saveWarningLabel);
        setShowSavePopup(props.showSavePopUp);
    }, [
        props.saveWarningClassName,
        props.saveWarningLabel,
        props.showSavePopUp
    ]);
    useEffect(() => {
        setRecentFilterShow(props.recentFilterShow);
        setFilterShow(props.filterShow);
    }, [props.recentFilterShow, props.filterShow]);
    /**
     * Method To pass the required name of the filter required to be saved
     * @param {*} e is event triggered when typing on the to-save filter name field
     */
    const registersaveFilterName = (e) => {
        setSaveFilterName(e.target.value);
    };

    /**
     * Method To close the save popup on clicking cancel button
     */
    const cancelSavePopup = () => {
        setShowSavePopup("none");
        setSaveFilterWarning("");
        setWarningLabel("");
    };
    let savedFilters = localStorage.getItem("savedFilters");
    savedFilters = savedFilters ? JSON.parse(savedFilters) : [];
    if (savedFilters.length > 2) {
        savedFilters = savedFilters.slice(
            savedFilters.length - 2,
            savedFilters.length
        );
    }
    const recent = savedFilters.map((filterArray) => {
        return (
            <div
                role="presentation"
                className="recentFilters"
                data-testid="recentFilters-div"
                key={Object.keys(filterArray)[0]}
                onClick={() => {
                    props.addSavedFilters(filterArray);
                }}
            >
                {Object.keys(filterArray)[0]}
            </div>
        );
    });
    return (
        <div>
            <div
                style={{ display: recentFilterShow }}
                className="filter__content"
            >
                <div>Recent Filters</div>
                {recent}
            </div>

            <div style={{ display: filterShow }}>
                <div className="filter__title">
                    Selected Filters
                    <span className="filter-count">{props.filterCount}</span>
                </div>
                <div className="filter__content">
                    <AutoComplete
                        name={props.name}
                        type={props.type}
                        enabled={props.enabled}
                        dataType={props.dataType}
                        options={props.options}
                        autoCompleteArray={props.autoCompleteArray}
                        deleteAutoCompleteElement={
                            props.deleteAutoCompleteElement
                        }
                        handleAutoCompleteEnabled={
                            props.handleAutoCompleteEnabled
                        }
                        createAutoCompleteArray={props.createAutoCompleteArray}
                    />
                    <FieldComponent
                        dateTimesArray={props.dateTimesArray}
                        deleteDateTimeElement={props.deleteDateTimeElement}
                        handleDateTimeEnabled={props.handleDateTimeEnabled}
                        createDateTimeArray={props.createDateTimeArray}
                        addToday={props.addToday}
                        addTomorrow={props.addTomorrow}
                        addThisMonth={props.addThisMonth}
                        addForteenDays={props.addForteenDays}
                        addSevenDays={props.addSevenDays}
                        addThisWeek={props.addThisWeek}
                        addThirtyDays={props.addThirtyDays}
                        lastDayChange={props.lastDayChange}
                        nextDayChange={props.nextDayChange}
                    />
                    <TextComponents
                        textComponentsArray={props.textComponentsArray}
                        deleteTextComponentElement={
                            props.deleteTextComponentElement
                        }
                        createTextComponentsArray={
                            props.createTextComponentsArray
                        }
                        handleTextComponentEnabled={
                            props.handleTextComponentEnabled
                        }
                    />
                </div>
                <div className="filter__btn">
                    <div className="filter__save">
                        <Button
                            className="button-save"
                            variant=""
                            onClick={props.openShowSavePopUp}
                        >
                            <SaveLogo />
                            <span>SAVE</span>
                        </Button>
                    </div>
                    <div className="btn-wrap">
                        <span className={applyfilterWarningClassName}>
                            {applyFilterWarning}
                        </span>
                        <Button
                            variant=""
                            className="reset"
                            onClick={props.resetDrawer}
                        >
                            Reset
                        </Button>
                        <Button
                            variant=""
                            className="applyFilter"
                            data-testid="applyFilter-button"
                            onClick={() => {
                                props.applyFilter();
                                props.deleteAutoCompleteElement({});
                                props.deleteDateTimeElement({});
                                props.deleteTextComponentElement({});
                            }}
                        >
                            Apply Filter
                        </Button>
                    </div>
                    <div
                        style={{ display: showSavePopup }}
                        className="popup--save"
                    >
                        <h5>Save the Filter</h5>
                        <span className={warningLabel}>
                            {saveFilterWarning}
                        </span>
                        <label htmlFor="saveFilterName">
                            Save Filter Name
                            <input
                                id="saveFilterName"
                                className="txt"
                                value={saveFilterName}
                                data-testid="registersaveFilterName-input"
                                onChange={(e) => registersaveFilterName(e)}
                            />
                        </label>
                        <div className="btn-wrap">
                            <button
                                type="button"
                                className="button"
                                data-testid="cancelSavePopup-button"
                                onClick={() => {
                                    cancelSavePopup();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="button"
                                data-testid="saveFilter-button"
                                onClick={() => {
                                    props.saveFilter(saveFilterName);
                                    // setSaveFilterName("");
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RightDrawer.propTypes = {
    emptyFilterWarning: PropTypes.any,
    emptyFilterClassName: PropTypes.any,
    saveWarningClassName: PropTypes.any,
    saveWarningLabel: PropTypes.any,
    showSavePopUp: PropTypes.any,
    recentFilterShow: PropTypes.any,
    filterShow: PropTypes.any,
    addSavedFilters: PropTypes.any,
    filterCount: PropTypes.any,
    name: PropTypes.any,
    type: PropTypes.any,
    enabled: PropTypes.any,
    dataType: PropTypes.any,
    options: PropTypes.any,
    autoCompleteArray: PropTypes.any,
    deleteAutoCompleteElement: PropTypes.any,
    handleAutoCompleteEnabled: PropTypes.any,
    createAutoCompleteArray: PropTypes.any,
    dateTimesArray: PropTypes.any,
    deleteDateTimeElement: PropTypes.any,
    handleDateTimeEnabled: PropTypes.any,
    createDateTimeArray: PropTypes.any,
    addToday: PropTypes.any,
    addTomorrow: PropTypes.any,
    addThisMonth: PropTypes.any,
    addForteenDays: PropTypes.any,
    addSevenDays: PropTypes.any,
    addThisWeek: PropTypes.any,
    lastDayChange: PropTypes.any,
    nextDayChange: PropTypes.any,
    textComponentsArray: PropTypes.any,
    deleteTextComponentElement: PropTypes.any,
    createTextComponentsArray: PropTypes.any,
    handleTextComponentEnabled: PropTypes.any,
    openShowSavePopUp: PropTypes.any,
    resetDrawer: PropTypes.any,
    applyFilter: PropTypes.any,
    saveFilter: PropTypes.any,
    addThirtyDays: PropTypes.any
};

export default RightDrawer;
