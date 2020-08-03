export const removeHiddenInnerCellValues = (originalRowValue, columns) => {
    const updatedRowValue = {};
    if (originalRowValue) {
        columns.forEach((column) => {
            const { id, innerCells, originalInnerCells } = column;
            const columnId = id ? id : column["accessor"];
            if (originalInnerCells && innerCells && innerCells.length != originalInnerCells.length) {
                const columnValue = originalRowValue[columnId];
                if (typeof columnValue === "object") {
                    if (columnValue.length > 0) {
                        const newcolumnValue = columnValue.map((value) => {
                            value = processInnerCells(innerCells, value);
                            return value;
                        });
                        updatedRowValue[columnId] = newcolumnValue;
                    } else {
                        const processedValue = processInnerCells(innerCells, columnValue);
                        updatedRowValue[columnId] = processedValue;
                    }
                }
            } else {
                updatedRowValue[columnId] = originalRowValue[columnId];
            }
        });
        return updatedRowValue;
    }
};

const processInnerCells = (innerCells, value) => {
    let params = {};
    innerCells.forEach((cell) => {
        const cellAccessor = cell.accessor;
        params[cellAccessor] = value[cellAccessor];
    });
    return params;
};
