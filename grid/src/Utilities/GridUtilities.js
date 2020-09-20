export const findSelectedRows = (rows, selectedRowIds) => {
    const rowsSelectedByUser = [];
    if (selectedRowIds) {
        Object.entries(selectedRowIds).forEach((objEntry) => {
            if (objEntry && objEntry.length > 0) {
                const rowId = objEntry[0];
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
        });
    }
    return rowsSelectedByUser;
};
