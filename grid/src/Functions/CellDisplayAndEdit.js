import React, { memo, useState, Fragment } from "react";
import ClickAwayListener from "react-click-away-listener";

const CellDisplayAndEdit = memo(({ row, columns, updateRowInGrid }) => {
    const { column } = row;
    if (column && row.row) {
        const [isEditOpen, setIsEditOpen] = useState(false);
        const [editedRowValue, setEditedRowValue] = useState(null);

        const { id } = column;

        const closeEdit = () => {
            setIsEditOpen(false);
        };

        const openEdit = () => {
            setIsEditOpen(true);
        };

        const getUpdatedRowValue = (value) => {
            if (value) {
                setEditedRowValue(value);
            }
        };

        const saveEdit = () => {
            if (editedRowValue) {
                updateRowInGrid(row.row.original, editedRowValue);
            }
            closeEdit();
        };

        const DisplayTag = (props) => {
            const { cellKey, columnKey } = props;
            if (columns && columnKey) {
                const selectedColumn = columns.find((col) => col.accessor === columnKey);
                if (checkInnerCells(selectedColumn, cellKey)) {
                    return <Fragment> {props.children}</Fragment>;
                }
            } else if (cellKey) {
                if (checkInnerCells(column, cellKey)) {
                    return <Fragment> {props.children}</Fragment>;
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

        const originalRowValue = { ...row.row.original };
        const cellDisplayContent = column.displayCell(originalRowValue, DisplayTag);
        const cellEditContent = column.editCell ? column.editCell(originalRowValue, DisplayTag, getUpdatedRowValue) : null;
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
