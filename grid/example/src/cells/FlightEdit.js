import React, { memo, useState, useEffect } from "react";
import ClickAwayListener from "react-click-away-listener";
import getDateValue from "../utils/DateUtility";

const FlightEdit = memo(({ index, columnId, innerCells, columnValue, updateCellData }) => {
    const [value, setValue] = useState(columnValue);
    const [oldValue] = useState(columnValue);
    const [isEdit, setEdit] = useState(false);

    const onFlightChange = (e) => {
        setValue({
            ...value,
            flightno: e.target.value
        });
    };

    const onDateChange = (e) => {
        setValue({
            ...value,
            date: getDateValue(e.target.value)
        });
    };

    const openEdit = (e) => {
        setEdit(true);
    };

    const saveEdit = () => {
        setEdit(false);
        if (updateCellData) {
            updateCellData(index, columnId, value);
        }
    };
    const clearEdit = () => {
        setValue(oldValue);
        setEdit(false);
    };

    useEffect(() => {
        setValue(columnValue);
    }, [columnValue]);

    const isInnerCellShown = (value) => {
        if (innerCells && innerCells.length > 0) {
            const innerCellItem = innerCells.filter((cell) => {
                return cell.accessor === value;
            });
            return innerCellItem && innerCellItem.length > 0;
        }
        return false;
    };

    const isInnerCellsNotEmpty = () => {
        return innerCells && innerCells.length > 0;
    };

    return (
        <ClickAwayListener onClickAway={clearEdit}>
            <div className="flight-details content">
                {isInnerCellsNotEmpty() ? (
                    <div className="cell-edit" onClick={openEdit}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </div>
                ) : null}
                <div>
                    {isInnerCellShown("flightno") ? <strong>{value.flightno}</strong> : null}
                    {isInnerCellShown("date") ? <span>{value.date}</span> : null}
                </div>
                <div className={`content-edit ${isEdit ? "open" : "close"}`}>
                    {isInnerCellShown("flightno") ? <input type="text" value={value.flightno} onChange={onFlightChange} /> : null}
                    {isInnerCellShown("date") ? (
                        <input type="date" value={getDateValue(value.date, "calendar")} onChange={onDateChange} />
                    ) : null}
                    <button className="ok" onClick={saveEdit} />
                    <button className="cancel" onClick={clearEdit} />
                </div>
            </div>
        </ClickAwayListener>
    );
});

export default FlightEdit;
