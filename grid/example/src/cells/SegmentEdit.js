import React, { useState } from "react";

const SegmentEdit = ({ rowData, airportCodeList }) => {
    const { from, to } = rowData.segment;
    const [fromValue, setFromValue] = useState(from);
    const [toValue, setToValue] = useState(to);

    const updateFromValue = (e) => {
        setFromValue(e.target.value);
    };

    const updateToValue = (e) => {
        setToValue(e.target.value);
    };

    return (
        <div>
            <select id="segment_from" onChange={updateFromValue} key="segment-from" value={fromValue}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
            <select id="segment_to" onChange={updateToValue} key="segment-to" value={toValue}>
                {airportCodeList.map((item, index) => {
                    return (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SegmentEdit;
