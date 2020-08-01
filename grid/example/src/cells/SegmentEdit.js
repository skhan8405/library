import React, { useState } from "react";

const SegmentEdit = ({ rowData, airportCodeList }) => {
    const { segment, weight } = rowData;
    const [segmentValue, setSegmentValue] = useState(segment);
    const [weightValue, setWeightValue] = useState(weight);

    const updateFromValue = (e) => {
        setSegmentValue({
            ...segmentValue,
            from: e.target.value
        });
    };

    const updateToValue = (e) => {
        setSegmentValue({
            ...segmentValue,
            to: e.target.value
        });
    };

    const updateWeightPercentage = (e) => {
        setWeightValue({
            ...weightValue,
            percentage: e.target.value
        });
    };

    const updateWeightValue = (e) => {
        setWeightValue({
            ...weightValue,
            value: e.target.value
        });
    };

    return (
        <div>
            <select id="segment_from" onChange={updateFromValue} key="segment-from" value={segmentValue.from}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <select id="segment_to" onChange={updateToValue} key="segment-to" value={segmentValue.to}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <input id="weight_percentage" type="text" value={weightValue.percentage} onChange={updateWeightPercentage} />
            <input id="weight_value" type="text" value={weightValue.value} onChange={updateWeightValue} />
        </div>
    );
};

export default SegmentEdit;
