import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RightDrawer from "./drawer/rightDrawer";
import LeftDrawer from "./drawer/leftDrawer";
import MainFilterPanel from "./panel/mainFilterPanel";
import ClickAwayListener from "./utilities/clickAwayListener";
// eslint-disable-next-line import/no-unresolved
import "!style-loader!css-loader!sass-loader!./styles/main.scss";

export default function Filter(props) {
    const [showApplyFilter, setApplyFilter] = useState(false);
    const [applyFilterChip, setApplyFilterChip] = useState({});
    const [filterCount, setFilterCount] = useState(0);
    const [filterData, setFilterData] = useState({});
    const [emptyFilterWarning, setEmptyFilterWarning] = useState("");
    const [emptyFilterClassName, setEmptyFilterClassName] = useState("");
    const [recentFilterShow, setRecentFilterShow] = useState("none");
    const [filterShow, setFilterShow] = useState("");
    const [initialValuesObject, setInitialValuesObject] = useState({
        masterSelect: { value: [] }
    });
    const [applyValidator, setApplyFilterValidator] = useState("none");
    const [filters, setFilters] = useState([]);
    const { filterDataProp, appliedFiltersProp, CustomPanel } = props;
    useEffect(() => {
        setFilterData(filterDataProp);
    }, [filterDataProp]);
    useEffect(() => {
        let count = 0;
        count = filters.length;
        setFilterCount(count);

        if (count > 0) {
            setApplyFilterValidator("none");
        }
    }, [filters]);

    /**
     * Method set the state which shows the drawer when on true condition
     */
    const showDrawer = () => {
        setApplyFilter(true);
    };

    /**
     * Method set the state which closes the drawer when the state is in false condition
     */
    const closeDrawer = () => {
        setApplyFilter(false);
    };

    /**
     * Method to check whether atleast a filter is being selected
     */

    const applyFilterValidation = () => {
        if (filterCount === 0) {
            setApplyFilterValidator("");
            setApplyFilter(true);
        } else {
            closeDrawer();
        }
    };

    /**
     * Method which creates the array which contains the elements to be shown in the applied filter chips
     * @param {*} appliedFilters is the filter changes to be applied
     */

    const applyFilter = (appliedFilters) => {
        applyFilterValidation();
        setApplyFilterChip(appliedFilters);

        const initialValueObject = {
            ...initialValuesObject
        };
        Object.entries(appliedFilters).forEach(([key, value]) => {
            initialValueObject[key] = value;
        });
        setInitialValuesObject(initialValueObject);
        const applied = {};
        Object.entries(appliedFilters).forEach(([key, values]) => {
            if (
                (values.value &&
                    (values.value.length > 0 ||
                        Object.keys(values.value).length > 0)) ||
                (values.condition && values.condition.length > 0)
            ) {
                applied[key] = values;
            }
        });
        if (Object.keys(applied).length > 0) {
            appliedFiltersProp(applied);
        }
    };

    /**
     * Method To reset the right drawer
     * @param {*} setFieldValue is the formik method to change the field values
     */
    const resetDrawer = (setFieldValue) => {
        setApplyFilterChip({});
        setRecentFilterShow("");
        setFilterShow("none");
        const filterDatas = {
            ...filterData
        };
        filterDatas.filter.forEach((filte) => {
            const weigh = filte;
            weigh.weight = 400;
            if (filte.isSubFilters) {
                filte.types.forEach((item) => {
                    const fontweigh = item;
                    fontweigh.weight = 400;
                });
            }
        });
        setFilterData(filterDatas);
        setFilters([]);
        Object.keys(initialValuesObject).forEach((item) => {
            setFieldValue(item, "");
        });
    };

    /**
     * Method To create the filter field arrays for Port type filter element
     * @param {*} name is the name of the filter field
     * @param {*} isSubFilters is a boolean check for whether the subFilters are there or not
     * @param {*} type is the name of the filter field
     * @param {*} dataType is the dataType of the filter field
     * @param {*} condition is the condition array of the filter field if present
     * @param {*} required is the required of the filter field
     * @param {*} label is the label of the filter field
     *  @param {*} prop is the prop of the filter field
     */
    const accordionFromLeftToRight = (
        name,
        isSubFilters,
        type,
        dataType,
        condition,
        required,
        label,
        prop
    ) => {
        setRecentFilterShow("none");
        setFilterShow("");
        setEmptyFilterClassName("");
        setEmptyFilterWarning("");
        const filter = [...filters];

        let value = {};
        value = {
            name,
            type,
            dataType,
            condition,
            required
        };
        filterData.filter.forEach((item) => {
            const itemParam = item;
            if (item.name === value.name) {
                itemParam.weight = 700;
                item.types.forEach((tip) => {
                    const tipParam = tip;
                    if (tip.name === value.type) {
                        tipParam.weight = 600;
                    }
                });
            }
        });
        if (filter.length > 0) {
            const index = filter.findIndex(
                (x) => x.name === value.name && x.type === value.type
            );
            if (index === -1) {
                filter.unshift({
                    labelName: `${name} > ${type}`,
                    name,
                    label,
                    isSubFilters,
                    type,
                    dataType,
                    condition,
                    required,
                    display: "none",
                    disabled: true,
                    validationDisplay: "none",
                    props: prop
                });
            }
        } else {
            filter.unshift({
                labelName: `${name} > ${type}`,
                name,
                label,
                isSubFilters,
                type,
                dataType,
                condition,
                required,
                display: "none",
                disabled: true,
                validationDisplay: "none",
                props: prop
            });
        }
        setFilters(filter);
    };

    /**
     * Method To create the filter field arrays for each specific type based on datatype
     * @param {*} name is the name of the filter field
     * @param {*} isSubFilters is a boolean check for whether the subFilters are there or not
     * @param {*} dataType is the dataType of the filter field
     * @param {*} condition is the condition array of the filter field if present
     * @param {*} required is the required of the filter field
     * @param {*} label is the label of the filter field
     * @param {*} prop is the props of the filter field
     */
    const fromLeftToRight = (
        name,
        isSubFilters,
        dataType,
        condition,
        required,
        label,
        prop
    ) => {
        setRecentFilterShow("none");
        setFilterShow("");
        setEmptyFilterClassName("");
        setEmptyFilterWarning("");
        const value = {
            name,
            isSubFilters,
            dataType,
            condition,
            required,
            label
        };
        filterData.filter.forEach((item) => {
            const itemParam = item;
            if (item.name === value.name) {
                itemParam.weight = 700;
            }
        });
        const filter = [...filters];
        if (filter.length > 0) {
            const index = filter.findIndex(
                (x) => x.name === value.name && x.dataType === value.dataType
            );
            if (index === -1) {
                filter.unshift({
                    labelName: `${name}`,
                    name,
                    label,
                    isSubFilters,
                    dataType,
                    condition,
                    required,
                    display: "none",
                    disabled: true,
                    validationDisplay: "none",
                    props: prop
                });
            }
        } else {
            filter.unshift({
                labelName: `${name}`,
                name,
                label,
                isSubFilters,
                dataType,
                condition,
                required,
                display: "none",
                disabled: true,
                validationDisplay: "none",
                props: prop
            });
        }
        setFilters(filter);
    };
    /**
     * Method To close the filter element from rightDrawer
     * @param {*} item is the specific filter element object
     */
    const closeField = (item) => {
        const index = filters.findIndex((it) => it.label === item.label);
        if (index !== -1) {
            filterData.filter.forEach((it) => {
                const itParam = it;
                if (it.name === item.name) itParam.weight = 400;
            });
            if (item.isSubFilters) {
                filterData.filter.forEach((its) => {
                    if (its.name === item.name) {
                        its.types.forEach((ite) => {
                            const iteParam = ite;
                            if (ite.name === item.type) {
                                iteParam.weight = 400;
                            }
                        });
                    }
                });
            }
            const filter = [...filters];
            filter.splice(index, 1);
            setFilters(filter);
        }
    };
    /**
     * Method To handle filter conditional field in rightDrawer
     * @param {*} item is the specific filter element object
     */
    const conditionHandler = (item) => {
        const filter = [...filters];
        filter.forEach((it) => {
            const itParam = it;
            if (it.label === item.label) {
                if (it.disabled === false) {
                    itParam.disabled = true;
                } else {
                    itParam.disabled = false;
                }
                if (it.display === "none") {
                    itParam.display = "";
                } else {
                    itParam.display = "none";
                }
            }
        });
        setFilters(filter);
    };

    /**
     * Method To set initialValues for groupFilters in rightDrawer
     * @param {*} label is the specific filter element labelName
     * @param {*} dataType is the specific filter element type
     */
    const setInitialValueFilterGroup = (label, dataType) => {
        const initialValueObject = {
            ...initialValuesObject
        };
        if (dataType !== "IAirport") {
            if (
                !Object.prototype.hasOwnProperty.call(
                    initialValueObject,
                    `${label}.condition`
                ) &&
                !Object.prototype.hasOwnProperty.call(
                    initialValueObject,
                    `${label}.value`
                )
            ) {
                initialValueObject[`${label}.condition`] = "";
                initialValueObject[`${label}.value`] = "";
            }
        } else if (
            !Object.prototype.hasOwnProperty.call(
                initialValueObject,
                `${label}.value`
            )
        ) {
            initialValueObject[`${label}.value`] = "";
        }
        setInitialValuesObject(initialValueObject);
    };
    /**
     * Method To set initialValues for simple fields in rightDrawer
     * @param {*} item is the specific filter element object
     */
    const setInitialValueIndividualFields = (item) => {
        const initialValueObject = {
            ...initialValuesObject
        };
        if (item.condition && item.condition.length > 0) {
            if (
                !Object.prototype.hasOwnProperty.call(
                    initialValueObject,
                    `${item.label}.condition`
                ) &&
                !Object.prototype.hasOwnProperty.call(
                    initialValueObject,
                    `${item.label}.value`
                )
            ) {
                if (item.dataType !== "MasterSelect") {
                    if (item.dataType === "IFlightNumber") {
                        initialValueObject[`${item.label}.value`] = [];
                        initialValueObject[`${item.label}.condition`] = "";
                    } else {
                        initialValueObject[`${item.label}.condition`] = "";
                        initialValueObject[`${item.label}.value`] = "";
                    }
                } else {
                    initialValueObject.masterSelect = {
                        condition: ""
                    };
                }
            }
        } else {
            initialValueObject[`${item.name}.value`] = "";
        }

        setInitialValuesObject(initialValueObject);
    };

    return (
        <ClickAwayListener onClickAway={closeDrawer}>
            {showApplyFilter && (
                <div className="neo-filter filter--grid iCargo__custom">
                    <div className="filter__wrap">
                        <div className="filter__list">
                            <LeftDrawer
                                filterData={filterData}
                                fromLeftToRight={fromLeftToRight}
                                accordionFromLeftToRight={
                                    accordionFromLeftToRight
                                }
                                setInitialValueFilterGroup={
                                    setInitialValueFilterGroup
                                }
                                setInitialValueIndividualFields={
                                    setInitialValueIndividualFields
                                }
                            />
                        </div>
                        <div className="filter__inputwrap">
                            <RightDrawer
                                filters={filters}
                                applyFilter={applyFilter}
                                closeDrawer={closeDrawer}
                                resetDrawer={resetDrawer}
                                filterCount={filterCount}
                                emptyFilterClassName={emptyFilterClassName}
                                emptyFilterWarning={emptyFilterWarning}
                                recentFilterShowProp={recentFilterShow}
                                filterShowProp={filterShow}
                                initialValuesObject={initialValuesObject}
                                applyFilterValidation={applyFilterValidation}
                                applyValidator={applyValidator}
                                closeField={closeField}
                                conditionHandler={conditionHandler}
                            />
                        </div>
                    </div>
                </div>
            )}
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={applyFilterChip}
                CustomPanel={CustomPanel}
            />
        </ClickAwayListener>
    );
}

Filter.propTypes = {
    filterDataProp: PropTypes.any,
    appliedFiltersProp: PropTypes.any,
    CustomPanel: PropTypes.any
};
