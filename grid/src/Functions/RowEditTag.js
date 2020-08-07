import React, { useContext, Fragment } from "react";
import { RowEditContext } from "../Utilities/ColumnsContext";

const RowEditTag = (props) => {
    const contextVallues = useContext(RowEditContext);
    const { columns, additionalColumn, isRowExpandEnabled } = contextVallues;
    const { cellKey, columnKey } = props;

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

export default RowEditTag;
