import React, { useContext, Fragment } from "react";
import { CellDisplayAndEditContext } from "../Utilities/TagsContext";

const DisplayTag = (props) => {
    const contextVallues = useContext(CellDisplayAndEditContext);
    const { column, columns } = contextVallues;
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

export default DisplayTag;
