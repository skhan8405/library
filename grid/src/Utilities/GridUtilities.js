export const updatedActionsHeaderClass = () => {
    const tableContainerList = document.getElementsByClassName(
        "tableContainer__List"
    );
    if (tableContainerList && tableContainerList.length > 0) {
        const tableContainer = tableContainerList[0];
        const columnHeadings = document.getElementsByClassName(
            "column-heading"
        );
        if (columnHeadings && columnHeadings.length > 0) {
            const lastColumnHeading = columnHeadings[columnHeadings.length - 1];
            if (tableContainer.offsetHeight < tableContainer.scrollHeight) {
                if (!lastColumnHeading.classList.contains("withScroll")) {
                    lastColumnHeading.classList.add("withScroll");
                }
            } else {
                lastColumnHeading.classList.remove("withScroll");
            }
        }
    }
};

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
    if (selectedRows && selectedRows.length > 0 && idAttribute) {
        selectedRows.forEach((row) => {
            rowIdentifiers.push(row[idAttribute]);
        });
    }
    return rowIdentifiers;
};
