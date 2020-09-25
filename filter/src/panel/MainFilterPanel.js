import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IButton } from "@neo/button";
import { IconLeftAlign } from "../utilities/svgUtilities";

let chips;
let chipCount;
const MainFilterPanel = (props) => {
    const [listFilter, setListFilter] = useState(false);
    const [chipArray, setChipArray] = useState({});
    const [countShow, setCountShow] = useState("none");
    const { applyFilterChip, showDrawer, CustomPanel } = props;
    useEffect(() => {
        setChipArray(applyFilterChip);
        if (Object.keys(applyFilterChip).length > 0) {
            setCountShow("");
        } else {
            setCountShow("none");
        }
    }, [applyFilterChip]);

    /**
     * Method to display and not display saved filters list
     */
    const handleListFilter = () => {
        setListFilter(!listFilter);
    };

    if (chipArray) {
        chipCount = 0;

        chips = Object.entries(chipArray).map(([key, values]) => {
            if (
                values.value &&
                (values.value.length > 0 ||
                    Object.keys(values.value).length > 0)
            ) {
                chipCount += 1;
                return (
                    <div
                        role="presentation"
                        className="listContent"
                        data-testid={`${values.value},${key}`}
                        key={`${values.value},${key}`}
                        onClick={() => {
                            props.showDrawer();
                        }}
                    >
                        <span key={key}>{key}</span>
                        {values.condition && values.condition.length > 0 && (
                            <div key={values.condition}>
                                {values.condition}
                                &nbsp;&nbsp;
                            </div>
                        )}
                        {values.value &&
                            values.value.length > 0 &&
                            !Array.isArray(values.value) && (
                                <div key={values.value}>{values.value}</div>
                            )}
                        {values.value &&
                            values.value.length > 0 &&
                            Array.isArray(values.value) &&
                            values.value.map((item) => {
                                return (
                                    <div key={item}>
                                        &nbsp;&nbsp;
                                        {item}
                                        &nbsp;&nbsp;
                                    </div>
                                );
                            })}
                        {values.value &&
                            Object.keys(values.value).length > 0 &&
                            !values.value.length > 0 &&
                            Object.keys(values.value).map((item) => {
                                return (
                                    <div key={item}>
                                        &nbsp;&nbsp;
                                        {item}:{values.value[item]}
                                        &nbsp;&nbsp;
                                    </div>
                                );
                            })}
                    </div>
                );
            }
            return <div />;
        });
    }

    return (
        <div className="neo-header">
            <div className="header__filter">
                <div className="displayFlex">
                    <div className="alignLeft">
                        <div
                            style={{
                                cursor: "pointer"
                            }}
                            role="presentation"
                            className="iconLeft"
                            data-testid="handleListFilterCheck"
                            onClick={handleListFilter}
                        >
                            <IconLeftAlign />
                        </div>
                        <div className="leftSpace">All flights</div>
                    </div>
                    <div className="header__custompanel">
                        <CustomPanel />
                    </div>
                </div>
                <div className="secondList">
                    <div className="displayFlex">
                        <div className="filter__tags">
                            {chipCount > 0 && (
                                <span
                                    style={{
                                        display: countShow
                                    }}
                                    className="listContent"
                                >
                                    count:
                                    {chipCount}
                                </span>
                            )}
                            {chips}
                        </div>
                        <div>
                            <IButton
                                color="link"
                                size="sm"
                                style={{
                                    cursor: "pointer"
                                }}
                                role="presentation"
                                data-testid="showDrawer-check"
                                onClick={() => {
                                    showDrawer();
                                }}
                                className="addFilter"
                            >
                                + Add Filter
                            </IButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MainFilterPanel.propTypes = {
    applyFilterChip: PropTypes.any,
    showDrawer: PropTypes.any,
    CustomPanel: PropTypes.any
};

export default MainFilterPanel;
