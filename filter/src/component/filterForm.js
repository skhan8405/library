import React, { useEffect, useState, Suspense } from "react";
import { ISelect } from "@neo-ui/select";
import { IToggle } from "@neo-ui/toggle";
import PropTypes from "prop-types";
import { IconTimes, IconCondition } from "../utilities/svgUtilities";
import components from "../dynamicImport/dynamicImportProcessor";

const FilterForm = (props) => {
    const [filterArray, setFilterArray] = useState([]);
    const { filters } = props;
    useEffect(() => {
        if (filters) {
            setFilterArray(filters);
        }
    }, [filters]);

    const componentDiv = filterArray.map((filter, index) => {
        const Component = components[filter.dataType];
        return (
            <div className="form-group" key={`${filter.label}`}>
                <div className="title">
                    <h4>{filter.labelName}</h4>
                    <div className="controls">
                        {filter.condition && filter.condition.length > 0 && (
                            <div className="control__condition__wrap">
                                <IToggle
                                    name={`${filter.label}>check`}
                                    onChange={() => {
                                        props.conditionHandler(filter);
                                    }}
                                />
                                <div className="control__condition">
                                    <IconCondition />
                                </div>
                            </div>
                        )}
                        <div
                            role="presentation"
                            data-testid="closeField"
                            className="control__close"
                            onClick={() => {
                                props.closeField(filter);
                            }}
                        >
                            <IconTimes />
                        </div>
                    </div>
                </div>
                <div className="form-inputs">
                    <div
                        disabled={filter.disabled}
                        style={{
                            display: filter.display
                        }}
                    >
                        <label>Condition</label>
                        <ISelect
                            name={`${filter.label}.condition`}
                            options={filter.condition}
                        />
                        <br />
                    </div>
                    <Suspense key={index} fallback={<div> Loading...</div>}>
                        <Component {...filter.props} />
                    </Suspense>
                </div>
            </div>
        );
    });
    return <div>{componentDiv}</div>;
};

FilterForm.propTypes = {
    conditionHandler: PropTypes.any,
    closeField: PropTypes.any,
    filters: PropTypes.any
};

export default FilterForm;
