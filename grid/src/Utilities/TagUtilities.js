export const checkInnerCells = (column, cellKey) => {
    if (column) {
        const { innerCells } = column;
        if (innerCells) {
            const innerCellData = innerCells.find((cell) => {
                return cell.accessor === cellKey;
            });
            if (innerCellData) {
                return innerCellData.display === true;
            }
        }
    }
    return false;
};
