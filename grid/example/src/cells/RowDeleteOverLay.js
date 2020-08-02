import React, { memo } from "react";
import ClickAwayListener from "react-click-away-listener";

const RowDeleteOverLay = memo(({ deleteRow, closeDeleteOverlay }) => {
    return (
        <ClickAwayListener onClickAway={closeDeleteOverlay}>
            <div className="row-option-action-overlay delete">
                <div className="cancel-save-buttons-delete">
                    <button className="delete-Button" onClick={deleteRow}>
                        Delete
                    </button>
                    <button className="cancel-Button" onClick={closeDeleteOverlay}>
                        Cancel
                    </button>
                </div>
            </div>
        </ClickAwayListener>
    );
});

export default RowDeleteOverLay;
