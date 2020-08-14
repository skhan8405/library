import React, { useState } from "react";
import { getValueOfDate } from "../utils/DateUtility";

const RowEdit = ({
    rowData,
    DisplayTag,
    airportCodeList,
    rowUpdateCallBack
}) => {
    const [updatedRowData, setUpdatedRowData] = useState(rowData);

    const updateRowData = (
        updatedFlightData,
        updatedSegmentData,
        updatedWeightData,
        updatedSrData,
        updatedRemarksData
    ) => {
        const updatedRow = {
            ...updatedRowData
        };
        if (updatedFlightData) {
            updatedRow.flight = updatedFlightData;
        }
        if (updatedSegmentData) {
            updatedRow.segment = updatedSegmentData;
        }
        if (updatedWeightData) {
            updatedRow.weight = updatedWeightData;
        }
        if (updatedSrData) {
            updatedRow.sr = updatedSrData;
        }
        if (updatedRemarksData) {
            updatedRow.remarks = updatedRemarksData;
        }
        setUpdatedRowData(updatedRow);
        rowUpdateCallBack(updatedRow);
    };

    const updateFlightnoValue = (e) => {
        const updatedFlightData = {
            ...flight,
            flightno: e.target.value
        };
        updateRowData(updatedFlightData);
    };

    const updateDateValue = (e) => {
        const updatedFlightData = {
            ...flight,
            date: getValueOfDate(e.target.value, "cell")
        };
        updateRowData(updatedFlightData);
    };

    const updateFromValue = (e) => {
        const updatedSegmentData = {
            ...segment,
            from: e.target.value
        };
        updateRowData(null, updatedSegmentData);
    };

    const updateToValue = (e) => {
        const updatedSegmentData = {
            ...segment,
            to: e.target.value
        };
        updateRowData(null, updatedSegmentData);
    };

    const updateWeightPercentage = (e) => {
        const updatedWeightData = {
            ...weight,
            percentage: e.target.value
        };
        updateRowData(null, null, updatedWeightData);
    };

    const updateWeightValue = (e) => {
        const updatedWeightData = {
            ...weight,
            value: e.target.value
        };
        updateRowData(null, null, updatedWeightData);
    };

    const updateSrValue = (e) => {
        updateRowData(null, null, null, e.target.value);
    };

    const updateRemarksValue = (e) => {
        updateRowData(null, null, null, null, e.target.value);
    };

    const { flight, segment, weight, sr, remarks } = updatedRowData;

    return (
        <>
            <div className="row-edit">
                <div className="edit-flight">
                    <DisplayTag columnKey="flight" cellKey="flightno">
                        <div className="edit-flight-no">
                            <label>FlightNo</label>
                            <input
                                type="text"
                                value={flight.flightno}
                                onChange={updateFlightnoValue}
                            />
                        </div>
                    </DisplayTag>
                    <DisplayTag columnKey="flight" cellKey="date">
                        <div className="edit-flight-date">
                            <label>Date</label>
                            <input
                                type="date"
                                value={getValueOfDate(flight.date, "calendar")}
                                onChange={updateDateValue}
                            />
                        </div>
                    </DisplayTag>
                </div>
            </div>
        </>
    );
};

export default RowEdit;
