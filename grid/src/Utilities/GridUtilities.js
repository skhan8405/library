export const findSelectedRows = (rows, selectedRowIds) => {
    const rowsSelectedByUser = [];
    if (rows && rows.length > 0 && selectedRowIds) {
        Object.entries(selectedRowIds).forEach((objEntry) => {
            if (objEntry && objEntry.length > 0) {
                const rowId = objEntry[0];
                const isSelected = objEntry[1];
                if (isSelected) {
                    const selectedRow = rows.find((flatRow) => {
                        return flatRow.id === rowId;
                    });
                    if (selectedRow) {
                        const { original } = selectedRow;
                        if (original) {
                            rowsSelectedByUser.push(original);
                        }
                    }
                }
            }
        });
    }
    return rowsSelectedByUser;
};

export const findSelectedRowIdAttributes = (selectedRows, idAttribute) => {
    const rowIdentifiers = [];
    if (selectedRows && selectedRows.length > 0) {
        selectedRows.forEach((row) => {
            rowIdentifiers.push(row[idAttribute]);
        });
    }
    return rowIdentifiers;
};

export const convertToIndividualColumns = (originalColumns) => {
    let modifiedColumns = [];
    originalColumns.forEach((item) => {
        const { columns } = item;
        if (columns && columns.length > 0) {
            modifiedColumns = [...modifiedColumns, ...columns];
        } else {
            modifiedColumns.push(item);
        }
    });
    return modifiedColumns;
};

export const convertColumnsWithInnerCells = (originalColumns) => {
    const modifiedColumns = originalColumns.map((originalCol) => {
        if (originalCol) {
            const { columns } = originalCol;
            const updatedCol = originalCol;
            if (columns && columns.length > 0) {
                const newInnerCells = [];
                const newOriginalInnerCells = [];
                columns.forEach((col) => {
                    const {
                        innerCells,
                        originalInnerCells,
                        columnId,
                        Header
                    } = col;
                    if (innerCells && innerCells.length > 0) {
                        innerCells.forEach((cell) => {
                            const newCell = cell;
                            newCell.idOfColumn = columnId;
                            newCell.headerOfColumn = Header;
                            newInnerCells.push(newCell);
                        });
                    }
                    if (originalInnerCells && originalInnerCells.length > 0) {
                        originalInnerCells.forEach((cell) => {
                            const newCell = cell;
                            newCell.idOfColumn = columnId;
                            newCell.headerOfColumn = Header;
                            newOriginalInnerCells.push(newCell);
                        });
                    }
                });
                if (newInnerCells && newInnerCells.length > 0) {
                    updatedCol.innerCells = newInnerCells;
                }
                if (newOriginalInnerCells && newOriginalInnerCells.length > 0) {
                    updatedCol.originalInnerCells = newOriginalInnerCells;
                }
            }
            return updatedCol;
        }
        return originalCol;
    });
    return modifiedColumns;
};

export const updateColumnsBasedOnInnerCells = (originalColumns) => {
    const modifiedColumns = originalColumns.map((originalCol) => {
        if (originalCol) {
            const { innerCells, originalInnerCells, columns } = originalCol;
            const updatedCol = originalCol;
            if (columns && columns.length > 0) {
                const newColumns = columns.map((col) => {
                    const { columnId } = col;
                    const updatedColItem = col;
                    if (innerCells && innerCells.length > 0) {
                        const updatedInnerCells = innerCells.filter((cell) => {
                            return cell.idOfColumn === columnId;
                        });
                        updatedColItem.innerCells = updatedInnerCells;
                    }

                    if (originalInnerCells && originalInnerCells.length > 0) {
                        const updatedOriginalInnerCells = originalInnerCells.filter(
                            (cell) => {
                                return cell.idOfColumn === columnId;
                            }
                        );
                        updatedColItem.originalInnerCells = updatedOriginalInnerCells;
                    }
                    return updatedColItem;
                });
                updatedCol.columns = newColumns;
            }
            return updatedCol;
        }
        return originalCol;
    });
    return modifiedColumns;
};
