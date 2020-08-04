import React, { memo, useState, Fragment } from "react";
import ClickAwayListener from "react-click-away-listener";

const RowEditOverLay = memo(
    ({ row, columns, isRowExpandEnabled, additionalColumn, getRowEditOverlay, closeRowEditOverlay, updateRowInGrid }) => {
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

        const DisplayTag = (props) => {
            const { cellKey, columnKey } = props;
            if (columns && columnKey) {
                const selectedColumn = columns.find((col) => col.accessor === columnKey);
                if (selectedColumn && cellKey) {
                    if (checkInnerCells(selectedColumn, cellKey)) {
                        return <Fragment> {props.children}</Fragment>;
                    }
                } else if (!selectedColumn && isRowExpandEnabled && additionalColumn) {
                    if (checkInnerCells(additionalColumn, columnKey)) {
                        return <Fragment> {props.children}</Fragment>;
                    }
                }
            }
            return null;
        };

        const checkInnerCells = (column, cellKey) => {
            if (column) {
                const { innerCells } = column;
                if (innerCells) {
                    const innerCellData = innerCells.find((cell) => {
                        return cell.accessor === cellKey;
                    });
                    if (innerCellData) {
                        return true;
                    }
                }
            }
            return false;
        };

        const originalRowValue = { ...row };
        const rowEditContent = getRowEditOverlay(originalRowValue, DisplayTag, getUpdatedRowValue);
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
    }
);

export default RowEditOverLay;
