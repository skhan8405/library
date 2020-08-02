import React, { memo, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const CellDisplayAndEdit = memo(({ row, updateRowInGrid }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedRowValue, setEditedRowValue] = useState(null);

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const getUpdatedRowValue = (value) => {
        setEditedRowValue(value);
    };

    const saveEdit = () => {
        updateRowInGrid(row.row.original, editedRowValue);
    };

    const { column } = row;
    if (column && row.row) {
        const originalRowValue = { ...row.row.original };
        const { id, innerCells, originalInnerCells } = column;

        //Remove inncer cell data from row value if it is hidden from column chooser overlay.
        if (
            originalRowValue &&
            originalInnerCells &&
            originalInnerCells.length &&
            innerCells &&
            innerCells.length &&
            innerCells.length < originalInnerCells.length
        ) {
            const columnValue = originalRowValue[id];
            if (typeof columnValue === "object") {
                if (columnValue.length > 0) {
                    const newcolumnValue = columnValue.map((value) => {
                        let params = {};
                        innerCells.forEach((cell) => {
                            const cellAccessor = cell.accessor;
                            params[cellAccessor] = value[cellAccessor];
                        });
                        value = params;
                        return value;
                    });
                    originalRowValue[id] = newcolumnValue;
                } else {
                    let params = {};
                    innerCells.forEach((cell) => {
                        const cellAccessor = cell.accessor;
                        params[cellAccessor] = row.value[cellAccessor];
                    });
                    originalRowValue[id] = params;
                }
            }
        }

        const cellDisplayContent = column.displayCell(originalRowValue);
        const cellEditContent = column.editCell ? column.editCell(originalRowValue, getUpdatedRowValue) : null;
        return (
            <ClickAwayListener onClickAway={closeEdit}>
                <div className={`table-cell--content table-cell--content__${id}`}>
                    {cellEditContent ? (
                        <div className="cell-edit" onClick={openEdit}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                        </div>
                    ) : null}
                    {cellDisplayContent}
                    {isEditOpen ? (
                        <div className="table-cell--content-edit">
                            {cellEditContent}
                            <button className="ok" onClick={saveEdit} />
                            <button className="cancel" onClick={closeEdit} />
                        </div>
                    ) : null}
                </div>
            </ClickAwayListener>
        );
    }
});

export default CellDisplayAndEdit;
