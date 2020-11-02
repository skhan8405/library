import React from "react";

const RowDelete = ({ rowData, onRowDelete, unbindRowDeleteOverlay }) => {
    const deleteRow = () => {
        onRowDelete(rowData);
        unbindRowDeleteOverlay();
    };
    const closeRowDeleteOverlay = () => {
        unbindRowDeleteOverlay();
    };
    return (
        <div className="row-option-action-overlay  delete">
            <div className="btn-wrap">
                <button
                    type="button"
                    className="neo-btn neo-btn-primary btn btn-secondary"
                    data-testid="rowDeleteOverlay-Delete"
                    onClick={deleteRow}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="neo-btn neo-btn-default btn btn-secondary"
                    data-testid="rowDeleteOverlay-cancel"
                    onClick={closeRowDeleteOverlay}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default RowDelete;
