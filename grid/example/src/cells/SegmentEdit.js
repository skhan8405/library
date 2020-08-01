import React, { useState } from "react";

const SegmentEdit = ({ rowData, airportCodeList }) => {
    const { segment } = rowData;
    const [segmentValue, setSegmentValue] = useState(segment);

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
        </div>
    );
};

export default SegmentEdit;
