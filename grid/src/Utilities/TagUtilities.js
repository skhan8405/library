export const findSelectedColumn = (columnsToSearch, columnKey) => {
    let selectedColumn = null;
    columnsToSearch.forEach((col) => {
        const { isGroupHeader, display, id, accessor, columns } = col;
        if (
            isGroupHeader === false &&
            display === true &&
            (id === columnKey || accessor === columnKey)
        ) {
            selectedColumn = col;
        } else if (columns && columns.length > 0) {
            const selectedGroupedColumn = columns.find((groupedCol) => {
                return (
                    groupedCol.id === columnKey && groupedCol.display === true
                );
            });
            selectedColumn = selectedGroupedColumn;
        }
    });
    return selectedColumn;
};
export const checkInnerCells = (column, cellKey) => {
    if (column) {
        const { innerCells } = column;
        if (innerCells && innerCells.length > 0) {
            const innerCellData = innerCells.find((cell) => {
                return cell.accessor === cellKey && cell.display === true;
            });
            if (innerCellData) {
                return true;
            }
        }
    }
    return false;
};
