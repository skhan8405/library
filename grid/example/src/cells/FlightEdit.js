import React, { useState } from "react";
import getDateValue from "../utils/DateUtility";

const FlightEdit = ({ rowData }) => {
    const { flightno, date } = rowData.flight;
    const [flightnoValue, setFlightnoValue] = useState(flightno);
    const [dateValue, setDateValue] = useState(getDateValue(date, "calendar"));

    const updateFlightnoValue = (e) => {
        setFlightnoValue(e.target.value);
    };

    const updateDateValue = (e) => {
        setDateValue(e.target.value);
    };

    return (
        <div>
            <input id="flight_flightno" type="text" value={flightnoValue} onChange={updateFlightnoValue} />
            <input id="flight_date" type="date" value={dateValue} onChange={updateDateValue} />
        </div>
    );
};
export default FlightEdit;
