import React, { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const CellDisplayAndEdit = ({ cellDisplayContent, cellEditContent, rowValue, columnId, innerCells, updateRow }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const saveEdit = () => {
        const updatedRowValue = Object.assign({}, rowValue);
        const columnValue = updatedRowValue[columnId];
        if (typeof columnValue === "object") {
            let params = {};
            innerCells.forEach((cell) => {
                const cellAccessor = cell.accessor;
                const updatedValue = document.getElementById(columnId + "_" + cellAccessor).value;
                params[cellAccessor] = updatedValue;
            });
            updatedRowValue[columnId] = params;
        }
        updateRow(rowValue, updatedRowValue);
    };

    const clearEdit = () => {
        closeEdit();
    };

    return (
        <ClickAwayListener onClickAway={closeEdit}>
            <div className="flight-details content">
                <div className="cell-edit" onClick={openEdit}>
                    <i className="fa fa-pencil" aria-hidden="true"></i>
                </div>
                {cellDisplayContent}
                {isEditOpen ? (
                    <div className="content-edit">
                        {cellEditContent}
                        <button className="ok" onClick={saveEdit} />
                        <button className="cancel" onClick={clearEdit} />
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
};

export default CellDisplayAndEdit;
