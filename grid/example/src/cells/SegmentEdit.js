import React, { useState } from "react";

const SegmentEdit = ({ rowData, airportCodeList, getUpdatedData }) => {
    const [updatedRowData, setUpdatedRowData] = useState(rowData);
    const { segment, weight } = updatedRowData;

    const updateRowData = (updatedSegmentData, updatedWeightData) => {
        const updatedRow = {
            ...updatedRowData
        };
        if (updatedSegmentData) {
            updatedRow.segment = updatedSegmentData;
        }
        if (updatedWeightData) {
            updatedRow.weight = updatedWeightData;
        }
        setUpdatedRowData(updatedRow);
        getUpdatedData(updatedRow);
    };

    const updateFromValue = (e) => {
        const updatedSegmentData = {
            ...segment,
            from: e.target.value
        };
        updateRowData(updatedSegmentData, null);
    };

    const updateToValue = (e) => {
        const updatedSegmentData = {
            ...segment,
            to: e.target.value
        };
        updateRowData(updatedSegmentData, null);
    };

    const updateWeightPercentage = (e) => {
        const updatedWeightData = {
            ...weight,
            percentage: e.target.value
        };
        updateRowData(null, updatedWeightData);
    };

    const updateWeightValue = (e) => {
        const updatedWeightData = {
            ...weight,
            value: e.target.value
        };
        updateRowData(null, updatedWeightData);
    };

    return (
        <div>
            <select onChange={updateFromValue} value={segment.from}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <select onChange={updateToValue} value={segment.to}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <input type="text" value={weight.percentage} onChange={updateWeightPercentage} />
            <input type="text" value={weight.value} onChange={updateWeightValue} />
        </div>
    );
};

export default SegmentEdit;
