import React, { forwardRef, useImperativeHandle, useMemo, useState, useEffect } from "react";
import Customgrid from "./Customgrid";

const Grid = forwardRef((props, ref) => {
    const {
        title,
        gridHeight,
        gridWidth,
        columns,
        additionalColumn,
        fetchData,
        rowEditOverlay,
        rowEditData,
        updateRowData,
        deletePopUpOverLay,
        deleteRowData,
        selectBulkData,
        calculateRowHeight
    } = props;

    //Set state value for variable to check if there is anext page available
    const [hasNextPage, setHasNextPage] = useState(true);
    //Set state value for variable to check if the loading process is going on
    const [isNextPageLoading, setIsNextPageLoading] = useState(false);
    //Local state value for checking if data is being loaded from API
    const [isLoading, setIsLoading] = useState(false);
    //Set state value for variable to hold grid data
    const [items, setItems] = useState([]);
    //Local state for group sort options
    const [groupSortOptions, setGroupSortOptions] = useState([]);

    let processedColumns = [];
    columns.forEach((column, index) => {
        const { innerCells, accessor, sortValue } = column;
        const isInnerCellsPresent = innerCells && innerCells.length > 0;

        //Add duplicate copy of inner cells to be used for data chooser
        if (isInnerCellsPresent) {
            column.originalInnerCells = [...innerCells];
        }

        //Add column Id
        column.columnId = `column_${index}`;

        //Add logic to sort column if sort is not disabled
        if (!column.disableSortBy) {
            if (isInnerCellsPresent) {
                //If there are inner cells and a sort value specified, do sort on that value
                if (sortValue) {
                    column.sortType = (rowA, rowB) => {
                        return rowA.original[accessor][sortValue] > rowB.original[accessor][sortValue] ? -1 : 1;
                    };
                } else {
                    column.disableSortBy = true;
                }
            } else if (!innerCells) {
                //If no inner cells are there, just do sort on column value
                column.sortType = (rowA, rowB) => {
                    return rowA.original[accessor] > rowB.original[accessor] ? -1 : 1;
                };
            }
        }

        //Add logic to filter column if column filter is not disabled
        if (!column.disableFilters) {
            column.filter = (rows, id, filterValue) => {
                const searchText = filterValue ? filterValue.toLowerCase() : "";
                return rows.filter((row) => {
                    //Find original data value of each row
                    const { original } = row;
                    //Do search for the column
                    return searchColumn(column, original, searchText);
                });
            };
        }

        processedColumns.push(column);
    });

    let renderExpandedContent = null;

    if (additionalColumn) {
        renderExpandedContent = additionalColumn.Cell;
        const { innerCells } = additionalColumn;
        if (innerCells && innerCells.length > 0) {
            additionalColumn.originalInnerCells = [...innerCells];
        }
    }

    const gridColumns = useMemo(() => processedColumns, []);

    //Logic for searching in each column
    const searchColumn = (column, original, searchText) => {
        //Return value
        let isValuePresent = false;
        //Find the accessor node and inner cells array of each column
        const { accessor, innerCells } = column;
        //Find accessor value of a column
        const rowAccessorValue = original[accessor];
        //Check if inner cells are available and save value to boolean var
        const isInnerCellsPresent = innerCells && innerCells.length > 0;
        //Enter if cell value is object or array
        if (typeof rowAccessorValue === "object" && isInnerCellsPresent) {
            //Enter if cell value is array
            if (rowAccessorValue.length > 0) {
                //Loop through cell array value and check if searched text is present
                rowAccessorValue.map((value) => {
                    innerCells.map((cell) => {
                        const dataAccessor = value[cell.accessor];
                        if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
                            isValuePresent = true;
                        }
                    });
                });
            } else {
                //If cell value is an object, loop through inner cells and check if searched text is present
                innerCells.map((cell) => {
                    const dataAccessor = original[accessor][cell.accessor];
                    if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
                        isValuePresent = true;
                    }
                });
            }
        } else {
            //If cell value is not an object or array, convert it to text and check if searched text is present
            const dataAccessor = original[accessor];
            if (dataAccessor && dataAccessor.toString().toLowerCase().includes(searchText)) {
                isValuePresent = true;
            }
        }
        return isValuePresent;
    };

    //Add logic for doing global search in the grid
    const globalSearchLogic = (rows, columns, filterValue) => {
        //Enter search logic only if rows and columns are available
        if (filterValue && processedColumns.length > 0) {
            //convert user searched text to lower case
            const searchText = filterValue.toLowerCase();
            //Loop through all rows
            return rows.filter((row) => {
                //Find original data value of each row
                const { original } = row;
                //Return value of the filter method
                let returnValue = false;
                //Loop through all column values for each row
                processedColumns.map((column) => {
                    //Do search for each column
                    returnValue = returnValue || searchColumn(column, original, searchText);
                });
                return returnValue;
            });
        }
        return rows;
    };

    //#region - Group sorting logic
    //Function to return sorting logic based on the user selected order of sort
    const compareValues = (compareOrder, v1, v2) => {
        if (compareOrder === "Ascending") {
            return v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
        } else {
            return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
        }
    };
    //Function to return sorted data
    const getSortedData = (originalData) => {
        return originalData.sort(function (x, y) {
            let compareResult = 0;
            groupSortOptions.forEach((option) => {
                const { sortBy, sortOn, order } = option;
                const newResult =
                    sortOn === "value"
                        ? compareValues(order, x[sortBy], y[sortBy])
                        : compareValues(order, x[sortBy][sortOn], y[sortBy][sortOn]);
                compareResult = compareResult || newResult;
            });
            return compareResult;
        });
    };
    //#endregion

    //#region - Cell update logic
    //Function to find correct index from original data using index from sorted data
    const getOriginalDataIndex = (sortedDataIndex) => {
        const updatedData = getSortedData([...items]).find((item, index) => {
            return index === sortedDataIndex;
        });
        let originalDataIndex = -1;
        originalDataIndex = items.findIndex((item, index) => {
            return item === updatedData;
        });
        return originalDataIndex;
    };
    //Gets triggered when a cell in grid is updated
    useImperativeHandle(ref, () => ({
        updateCellInGrid(rowIndex, columnId, value) {
            const originalDataIndex = getOriginalDataIndex(rowIndex);
            if (originalDataIndex >= 0) {
                setItems((old) =>
                    old.map((row, index) => {
                        if (index === originalDataIndex) {
                            return {
                                ...old[originalDataIndex],
                                [columnId]: value
                            };
                        }
                        return row;
                    })
                );
            }
        }
    }));
    //#endregion

    //Gets triggered when one row item is updated
    const updateRowInGrid = (rowIndex, updatedRow) => {
        setItems((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    row = updatedRow;
                }
                return row;
            })
        );
        updateRowData(updatedRow);
    };

    //Gets triggered when one row item is deleted
    const deleteRowFromGrid = (rowIndexToBeDeleted, deletedRow) => {
        setItems((old) =>
            old.filter((row, index) => {
                return index !== rowIndexToBeDeleted;
            })
        );
        deleteRowData(deletedRow);
    };

    //Gets called when group sort is applied or cleared
    const doGroupSort = (sortOptions) => {
        setGroupSortOptions(sortOptions);
    };

    //Gets called when page scroll reaches the bottom of the grid.
    //Fetch the next set of data and append it to the variable holding grid data and update the state value.
    //Also update the hasNextPage state value to False once API response is empty, to avoid unwanted API calls.
    const loadNextPage = (...args) => {
        const newIndex = args && args.length > 0 ? args[0] : -1;
        if (newIndex >= 0 && hasNextPage) {
            setIsLoading(true);
            setIsNextPageLoading(true);
            fetchData(newIndex).then((data) => {
                setIsLoading(false);
                setHasNextPage(data && data.length > 0);
                setIsNextPageLoading(false);
                setItems(items.concat(data));
            });
        }
    };

    useEffect(() => {
        //Make API call to fetch initial set of data.
        setIsLoading(true);
        fetchData(0).then((data) => {
            setIsLoading(false);
            setItems(data);
        });
    }, []);

    //Sort the data based on the user selected group sort optipons
    const data = getSortedData([...items]);

    if (data && data.length > 0) {
        return (
            <div>
                <Customgrid
                    title={title}
                    gridHeight={gridHeight}
                    gridWidth={gridWidth}
                    managableColumns={gridColumns}
                    originalColumns={gridColumns}
                    additionalColumn={additionalColumn}
                    data={data}
                    originalData={items}
                    rowEditOverlay={rowEditOverlay}
                    rowEditData={rowEditData}
                    updateRowInGrid={updateRowInGrid}
                    deletePopUpOverLay={deletePopUpOverLay}
                    deleteRowFromGrid={deleteRowFromGrid}
                    globalSearchLogic={globalSearchLogic}
                    selectBulkData={selectBulkData}
                    calculateRowHeight={calculateRowHeight}
                    isExpandContentAvailable={typeof renderExpandedContent === "function"}
                    renderExpandedContent={renderExpandedContent}
                    hasNextPage={hasNextPage}
                    isNextPageLoading={isNextPageLoading}
                    loadNextPage={loadNextPage}
                    doGroupSort={doGroupSort}
                />
                {isNextPageLoading ? (
                    <div id="loader" className="background">
                        <div className="dots container">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    } else if (isLoading) {
        return <h2 style={{ textAlign: "center", marginTop: "70px" }}>Initializing Grid...</h2>;
    } else {
        return <h2 style={{ textAlign: "center", marginTop: "70px" }}>Invalid Data or Column Configurations</h2>;
    }
});

export default Grid;
