import React, { useState } from "react";
import { getValueOfDate } from "../utils/DateUtility";

const FlightEdit = ({ rowData, getUpdatedData }) => {
    const [updatedRowData, setUpdatedRowData] = useState(rowData);
    const { flight } = updatedRowData;

    const updateRowData = (updatedFlightData) => {
        const updatedRow = {
            ...updatedRowData,
            flight: updatedFlightData
        };
        setUpdatedRowData(updatedRow);
        getUpdatedData(updatedRow);
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

    return (
        <div>
            <input type="text" value={flight.flightno} onChange={updateFlightnoValue} />
            <input type="date" value={getValueOfDate(flight.date, "calendar")} onChange={updateDateValue} />
        </div>
    );
};
export default FlightEdit;
