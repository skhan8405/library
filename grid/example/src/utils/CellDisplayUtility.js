export const isInnerCellShown = (innerCells, value) => {
    if (innerCells && innerCells.length > 0) {
        const innerCellItem = innerCells.filter((cell) => {
            return cell.accessor === value;
        });
        return innerCellItem && innerCellItem.length > 0;
    }
    return false;
};

export const isInnerCellsNotEmpty = (innerCells) => {
    return innerCells && innerCells.length > 0;
};
