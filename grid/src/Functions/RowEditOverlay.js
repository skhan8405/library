import React, { memo, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const RowEditOverLay = memo(({ row, getRowEditOverlay, closeRowEditOverlay, updateRowInGrid }) => {
    const [editedRowValue, setEditedRowValue] = useState(null);

    const getUpdatedRowValue = (value) => {
        if (value) {
            setEditedRowValue(value);
        }
    };

    const saveRowEdit = () => {
        if (editedRowValue) {
            updateRowInGrid(row, editedRowValue);
        }
        closeRowEditOverlay();
    };

    const rowEditContent = getRowEditOverlay(row, getUpdatedRowValue);
    return (
        <ClickAwayListener onClickAway={closeRowEditOverlay}>
            <div className="row-option-action-overlay">
                {rowEditContent}
                <div className="cancel-save-buttons">
                    <button className="save-Button" onClick={saveRowEdit}>
                        Save
                    </button>
                    <button className="cancel-Button" onClick={closeRowEditOverlay}>
                        Cancel
                    </button>
                </div>
            </div>
        </ClickAwayListener>
    );
});

export default RowEditOverLay;
