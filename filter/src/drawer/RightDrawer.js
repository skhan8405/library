import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withFormik, useFormikContext } from "formik";
import { IButton } from "@neo/button";
import { SaveLogo } from "../utilities/svgUtilities";
import "react-datepicker/dist/react-datepicker.css";
import FilterForm from "../component/filterForm";

const RightDrawer = (props) => {
    const { values, handleSubmit } = props;
    const { setFieldValue } = useFormikContext();
    const [applyFilterWarning, setApplyFilterWarning] = useState("");
    const [
        applyfilterWarningClassName,
        setApplyFilterWariningClassname
    ] = useState("");
    const [recentFilterShow, setRecentFilterShow] = useState("none");
    const [filterShow, setFilterShow] = useState("");
    const {
        emptyFilterWarning,
        emptyFilterClassName,
        filterShowProp,
        recentFilterShowProp,
        filterCount,
        filters,
        closeField,
        conditionHandler,
        applyValidator,
        resetDrawer,
        applyFilter
    } = props;
    useEffect(() => {
        setApplyFilterWarning(emptyFilterWarning);
        setApplyFilterWariningClassname(emptyFilterClassName);
    }, [emptyFilterWarning, emptyFilterClassName]);

    useEffect(() => {
        setRecentFilterShow(recentFilterShowProp);
        setFilterShow(filterShowProp);
    }, [recentFilterShowProp, filterShowProp]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div
                    style={{
                        display: recentFilterShow
                    }}
                    className="filter__content"
                >
                    <div className="filter__recentFilterTitle">
                        Recent Filters
                    </div>
                </div>

                <div
                    style={{
                        display: filterShow
                    }}
                >
                    <div className="filter__title">
                        Selected Filters
                        <span className="filter-count">{filterCount}</span>
                    </div>
                    <div className="filter__content">
                        <FilterForm
                            filters={filters}
                            closeField={closeField}
                            conditionHandler={conditionHandler}
                        />
                        <div className="filter__warning">
                            <span
                                id="fieldWarning"
                                className="text-danger"
                                style={{ display: applyValidator }}
                            >
                                No filter selected!
                            </span>
                        </div>
                    </div>
                    <div className="filter__btn">
                        <div className="filter__save">
                            <IButton type="button" className="button-save">
                                <SaveLogo />
                                <span>SAVE</span>
                            </IButton>
                        </div>
                        <div className="btn-wrap">
                            <span className={applyfilterWarningClassName}>
                                {applyFilterWarning}
                            </span>
                            <IButton
                                type="button"
                                data-testid="resetClick"
                                className="reset"
                                onClick={() => {
                                    resetDrawer(setFieldValue);
                                }}
                            >
                                Reset
                            </IButton>
                            <IButton
                                color="info"
                                type="submit"
                                className="applyFilter"
                                data-testid="applyFilter-button"
                                onClick={() => {
                                    applyFilter(values);
                                }}
                            >
                                Apply Filter
                            </IButton>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

RightDrawer.propTypes = {
    emptyFilterWarning: PropTypes.any,
    emptyFilterClassName: PropTypes.any,
    recentFilterShowProp: PropTypes.any,
    filterShowProp: PropTypes.any,
    filterCount: PropTypes.any,
    resetDrawer: PropTypes.any,
    applyFilter: PropTypes.any,
    filters: PropTypes.any,
    closeField: PropTypes.any,
    conditionHandler: PropTypes.any,
    values: PropTypes.any,
    handleSubmit: PropTypes.any,
    applyValidator: PropTypes.any
};

export default withFormik({
    displayName: "BasicForm",
    mapPropsToValues: (props) => props.initialValuesObject,
    validateOnBlur: false,
    validateOnChange: false
})(RightDrawer);
