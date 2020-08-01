import React, { useState } from "react";
import getDateValue from "../utils/DateUtility";

const FlightEdit = ({ rowData }) => {
    const { flight } = rowData;
    const [flightValue, setFlightValue] = useState(flight);

    const updateFlightnoValue = (e) => {
        setFlightValue({
            ...flightValue,
            flightno: e.target.value
        });
    };

    const updateDateValue = (e) => {
        setFlightValue({
            ...flightValue,
            date: getDateValue(e.target.value, "cell")
        });
    };

    return (
        <div>
            <input id="flight_flightno" type="text" value={flightValue.flightno} onChange={updateFlightnoValue} />
            <input id="flight_date" type="date" value={getDateValue(flightValue.date, "calendar")} onChange={updateDateValue} />
        </div>
    );
};
export default FlightEdit;
