import React, { memo, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

const CellDisplayAndEdit = memo(({ cellDisplayContent, cellEditContent, rowValue, columnId, columns, updateRow }) => {
    const [isEditOpen, setIsEditOpen] = useState(false);

    const closeEdit = () => {
        setIsEditOpen(false);
    };

    const openEdit = () => {
        setIsEditOpen(true);
    };

    const getInnerCellsOfColumn = (columnId) => {
        const selectedColumn = columns.find((col) => {
            return col.id === columnId;
        });
        if (selectedColumn) {
            const { innerCells } = selectedColumn;
            return innerCells && innerCells.length > 0 ? innerCells : [];
        }
        return [];
    };

    const updateCellValue = (columnId, updatedRowValue) => {
        const columnValue = updatedRowValue[columnId];
        if (typeof columnValue === "object") {
            let params = Object.assign({}, columnValue);
            const innerCellsOfColumn = getInnerCellsOfColumn(columnId);
            innerCellsOfColumn.forEach((cell) => {
                const cellAccessor = cell.accessor;
                const updatedElement = document.getElementById(columnId + "_" + cellAccessor);
                if (updatedElement) {
                    const updatedValue = updatedElement.value;
                    params[cellAccessor] = updatedValue;
                }
            });
            updatedRowValue[columnId] = params;
        } else {
            const updatedElement = document.getElementById(columnId);
            if (updatedElement) {
                const updatedValue = updatedElement.value;
                updatedRowValue[columnId] = updatedValue;
            }
        }
    };

    let editableCells = [];
    if (
        cellEditContent &&
        cellEditContent.props &&
        cellEditContent.props.editedOtherCells &&
        cellEditContent.props.editedOtherCells.length
    ) {
        editableCells = cellEditContent.props.editedOtherCells;
    }

    const saveEdit = () => {
        const updatedRowValue = Object.assign({}, rowValue);
        if (columnId) {
            editableCells.push(columnId);
        }
        editableCells.forEach((cell) => {
            updateCellValue(cell, updatedRowValue);
        });
        updateRow(rowValue, updatedRowValue);
    };

    const clearEdit = () => {
        closeEdit();
    };

    return (
        <ClickAwayListener onClickAway={closeEdit}>
            <div className={`table-cell--content table-cell--content__${columnId}`}>
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
                        <button className="cancel" onClick={clearEdit} />
                    </div>
                ) : null}
            </div>
        </ClickAwayListener>
    );
});

export default CellDisplayAndEdit;
