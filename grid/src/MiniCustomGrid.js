import React, {
    useCallback,
    useState,
    useEffect,
    createRef,
    useMemo,
    forwardRef,
    useImperativeHandle
} from "react";
import {
    useTable,
    useResizeColumns,
    useFlexLayout,
    useRowSelect,
    useSortBy,
    useFilters,
    useGlobalFilter,
    useExpanded
} from "react-table";
// import { VariableSizeList as List } from "react-window";
import {
    FixedSizeGrid as List,
    GridProps,
    GridChildComponentProps
} from "react-window";

import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import PropTypes from "prop-types";
import RowSelector from "./Functions/RowSelector";
import DefaultColumnFilter from "./Functions/DefaultColumnFilter";
import GlobalFilter from "./Functions/GlobalFilter";
import RowOptions from "./Functions/RowOptions";
// import RowEditOverlay from "./Functions/RowEditOverlay";
// import RowDeleteOverLay from "./Functions/RowDeleteOverlay";
import ColumnReordering from "./Overlays/managecolumns";
import GroupSort from "./Overlays/groupsort";
import ExportData from "./Overlays/exportdata";
import {
    IconColumns,
    IconAngle,
    IconFilter,
    IconShare,
    IconGroupSort,
    IconSort,
    IconRefresh
} from "./Utilities/SvgUtilities";
import {
    findSelectedRows,
    convertToIndividualColumns
} from "./Utilities/GridUtilities";

const listRef = createRef(null);

const MiniCustomgrid = forwardRef((props, ref) => {
    const {
        title,
        gridHeight,
        gridWidth,
        managableColumns,
        originalColumns,
        additionalColumn,
        data,
        getRowEditOverlay,
        updateRowInGrid,
        deleteRowFromGrid,
        searchColumn,
        onRowSelect,
        calculateRowHeight,
        isExpandContentAvailable,
        displayExpandedContent,
        rowActions,
        rowActionCallback,
        hasNextPage,
        isNextPageLoading,
        loadNextPage,
        doGroupSort,
        CustomPanel,
        globalSearch,
        columnFilter,
        groupSort,
        columnChooser,
        exportData,
        onGridRefresh,
        rowsToDeselect,
        groupSortOptions,
        miniGridList,
        loadMoreRecords,
        miniGridIndex
    } = props;

    // Local state to check if this is the first rendering of the Grid. Default value is true
    // This will be set as false in useEffect - [].
    // Selectedrows data will be passed to parent only if isFirstRendering is false
    const [isFirstRendering, setIsFirstRendering] = useState(true);

    // Local state value for holding columns configuration
    const [columns, setColumns] = useState(managableColumns);

    console.log("MINI CUSTROM GRID RENDERED ", data);

    // Local state value for holding the boolean value to check if row expand is available
    const [isRowExpandEnabled, setIsRowExpandEnabled] = useState(
        isExpandContentAvailable
    );

    // Variable to check if row options are available
    const isRowActionsAvailable = rowActions && rowActions.length > 0;

    // Variables used for handling infinite loading
    const itemCount = hasNextPage ? data.length + 1 : data.length;
    const loadMoreItems = isNextPageLoading
        ? () => {}
        : loadNextPage || (() => {});
    const isItemLoaded = (index) => !hasNextPage || index < data.length;

    // Local state value for checking if column filter is open/closed
    const [isFilterOpen, setFilterOpen] = useState(false);
    // Toggle column filter state value based on UI clicks
    const toggleColumnFilter = () => {
        setFilterOpen(!isFilterOpen);
    };

    // Local state value for checking if row edit overlay is open/closed
    const [isRowEditOverlyOpen, setIsRowEditOverlyOpen] = useState(false);
    // Local state value to hold row data that is going to be edited
    const [editedRowData, setEditedRowData] = useState(null);
    // Bind the user defined row edit overlay into Grid
    const bindRowEditOverlay = (rowValue) => {
        setEditedRowData(rowValue);
        setIsRowEditOverlyOpen(true);
    };
    // Close the row edit overlay
    const closeRowEditOverlay = () => {
        setEditedRowData(null);
        setIsRowEditOverlyOpen(false);
    };

    // Local state value for checking if row delete overlay is open/closed
    const [isRowDeleteOverlyOpen, setIsRowDeleteOverlyOpen] = useState(false);
    // Local state value to hold row data that is going to be deleted
    const [deletedRowData, setDeletedRowData] = useState(null);
    // Bind the user defined row delete overlay into Grid
    const bindRowDeleteOverlay = (rowValue) => {
        debugger;
        setDeletedRowData(rowValue);
        setIsRowDeleteOverlyOpen(true);
    };
    // Close the row edit overlay
    const closeRowDeleteOverlay = () => {
        setDeletedRowData(null);
        setIsRowDeleteOverlyOpen(false);
    };

    const loadMoreRows = () => {
        loadMoreRecords(miniGridIndex);
    };

    // Local state value for checking if group Sort Overlay is open/closed.
    const [isGroupSortOverLayOpen, setGroupSortOverLay] = useState(false);
    // Toggle group Sort state value based on UI clicks
    const toggleGroupSortOverLay = () => {
        setGroupSortOverLay(!isGroupSortOverLayOpen);
    };
    // Call apply group sort function from parent
    const applyGroupSort = (sortOptions) => {
        doGroupSort(sortOptions);
    };

    // Local state value for hiding/unhiding column management overlay
    const [isManageColumnOpen, setManageColumnOpen] = useState(false);
    // Toggle column manage overlay show/hide state value based on UI clicks
    const toggleManageColumns = () => {
        setManageColumnOpen(!isManageColumnOpen);
    };

    // Callback method from column manage overlay to update the column structure of the grid
    // const updateColumnStructure = (newColumnStructure, remarksColumn) => {
    //     setColumns([...newColumnStructure]);
    //     setIsRowExpandEnabled(
    //         !!(remarksColumn && remarksColumn.length > 0)
    //     );
    // };

    // Local state value for hiding/unhiding export data overlay
    const [isExportOverlayOpen, setIsExportOverlayOpen] = useState(false);
    // Toggle export overlay show/hide state value based on UI clicks
    const toggleExportDataOverlay = () => {
        setIsExportOverlayOpen(!isExportOverlayOpen);
    };

    // Local state value for storing user selected rows
    const [userSelectedRows, setUserSelectedRows] = useState([]);

    // Column filter added for all columns by default
    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    // Global Search Filter Logic - React table wants all parameters passed into useTable function to be memoized
    const globalFilterLogic = useCallback(
        (rowsToFilter, columnsToFilter, filterValue) => {
            // convert user searched text to lower case
            const searchText = filterValue ? filterValue.toLowerCase() : "";
            // Loop through all rows
            // debugger
            // console.log("rowsToFilter ", rowsToFilter);
            // console.log("columnsToFilter ", columnsToFilter);
            // console.log("filterValue ", filterValue);

            // data.filter((row) => {
            //     // Find original data value of each row
            //     const { original } = row;
            //     // Return value of the filter method
            //     let returnValue = false;
            //     // Loop through all column values for each row
            //     if (managableColumns !== undefined) {
            //         managableColumns.forEach((column) => {
            //             // Do search for each column
            //             returnValue =
            //                 returnValue ||
            //                 searchColumn(column, original, searchText);
            //         });
            //     }
            //     return returnValue;
            // });

            return rowsToFilter.filter((row) => {
                // Find original data value of each row
                const { original } = row;
                // Return value of the filter method
                let returnValue = false;
                // Loop through all column values for each row
                managableColumns.forEach((column) => {
                    // Do search for each column
                    returnValue =
                        returnValue ||
                        searchColumn(column, original, searchText);
                });
                return returnValue;
            });
        },
        [originalColumns, searchColumn]
    );

    // Finds the rows selected by users from selectedRowIds and updates the state value and triggers the callback function.
    // This is used in useeffects for row selection and row deselection
    const updateSelectedRows = (rows, selectedRowIds) => {
        const rowsSelectedByUser = findSelectedRows(rows, selectedRowIds);
        setUserSelectedRows(rowsSelectedByUser);
        if (onRowSelect) {
            onRowSelect(rowsSelectedByUser);
        }
    };

    // Initialize react-table instance with the values received through properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        preFilteredRows,
        state: { /* globalFilter, */ selectedRowIds },
        // setGlobalFilter,
        toggleAllRowsExpanded,
        toggleAllRowsSelected // select all in mini row logic
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            // globalFilter: globalFilterLogic,
            autoResetFilters: false,
            autoResetGlobalFilter: false,
            autoResetSortBy: false,
            autoResetExpanded: false,
            autoResetSelectedRows: false
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        useRowSelect,
        useFlexLayout,
        useResizeColumns,
        (hooks) => {
            // Add checkbox for all rows in grid, with different properties for header row and body rows
            hooks.allColumns.push((hookColumns) => [
                {
                    id: "selection",
                    columnId: "column_custom_0",
                    disableResizing: true,
                    disableFilters: true,
                    disableSortBy: true,
                    minWidth: 35,
                    width: 35,
                    maxWidth: 35,
                    Header: ({ getToggleAllRowsSelectedProps }) => {
                        return (
                            <RowSelector {...getToggleAllRowsSelectedProps()} />
                        );
                    },
                    Cell: ({ row }) => (
                        <RowSelector {...row.getToggleRowSelectedProps()} />
                    )
                },
                ...hookColumns,
                {
                    id: "custom",
                    columnId: "column_custom_1",
                    disableResizing: true,
                    disableFilters: true,
                    disableSortBy: true,
                    minWidth: 35,
                    width: 35,
                    maxWidth: 35,
                    Cell: ({ row }) => {
                        return (
                            <div className="action">
                                {isRowActionsAvailable ? (
                                    <RowOptions
                                        row={row}
                                        rowActions={rowActions}
                                        rowActionCallback={rowActionCallback}
                                        bindRowEditOverlay={bindRowEditOverlay}
                                        bindRowDeleteOverlay={
                                            bindRowDeleteOverlay
                                        }
                                    />
                                ) : null}
                                {isRowExpandEnabled ? (
                                    <span
                                        className="expander"
                                        {...row.getToggleRowExpandedProps()}
                                    >
                                        <i>
                                            <IconAngle
                                                className={
                                                    row.isExpanded
                                                        ? "icon-arrow-up"
                                                        : "icon-arrow-down"
                                                }
                                            />
                                        </i>
                                    </span>
                                ) : null}
                            </div>
                        );
                    }
                }
            ]);
        }
    );

    // Handle the row height calculation while expanding a row or resizing a column
    useEffect(() => {
        if (listRef && listRef.current) {
            listRef.current.resetAfterIndex(0, true);
        }
    });

    // Update the column chooser overlay, when user is updating column configuration from outside Grid
    useEffect(() => {
        setColumns(managableColumns);
        setIsRowExpandEnabled(isExpandContentAvailable);
    }, [managableColumns, isExpandContentAvailable]);

    // Update the boolean value used to identify if this is the first time render of Grid
    useEffect(() => {
        setIsFirstRendering(false);
    }, []);

    // Update the select state of row in Grid using thehook provided by useTable method
    // Find the row Id using the key - value passed from props and use toggleRowSelected method
    useEffect(() => {
        if (rowsToDeselect) {
            const { idAttribute, value } = rowsToDeselect;
            if (idAttribute && value && value.length > 0) {
                value.forEach((columnVal) => {
                    const rowToDeselect = preFilteredRows.find((row) => {
                        return row.original[idAttribute] === columnVal;
                    });
                    if (rowToDeselect) {
                        const { id } = rowToDeselect;
                        selectedRowIds[id] = false;
                        updateSelectedRows(preFilteredRows, selectedRowIds);
                    }
                });
            }
        }
    }, [rowsToDeselect]);

    // Trigger call back when user makes a row selection using checkbox
    // And store the rows that are selected by user for making them selected when data changes after groupsort
    // Call back method will not be triggered if this is the first render of Grid
    useEffect(() => {
        if (!isFirstRendering) {
            // toggleAllRowsSelected(true);
            updateSelectedRows(preFilteredRows, selectedRowIds);
        }
    }, [selectedRowIds]);

    useImperativeHandle(ref, () => ({
        updateColumnStructure(newColumnStructure, remarksColumn) {
            // debugger;
            setColumns([...newColumnStructure]);
            setIsRowExpandEnabled(
                !!(remarksColumn && remarksColumn.length > 0)
            );
        },

        selectUnselectAllInMiniTable(isSelected) {
            console.log("selectUnselectAllInMiniTable ", isSelected);
            toggleAllRowsSelected(isSelected);
        },
        globalFilterLogic(rowsToFilter, columnsToFilter, filterValue) {
            // convert user searched text to lower case
            // const searchText = filterValue ? filterValue.toLowerCase() : "";

            // let filteredRows = [];
            // if (rows.length !== 0) {
            //     filteredRows = rows.filter((row) => {
            //         // Find original data value of each row
            //         const { original } = row;
            //         // Return value of the filter method
            //         let returnValue = false;
            //         // Loop through all column values for each row
            //         if (managableColumns !== undefined) {
            //             managableColumns.forEach((column) => {
            //                 // Do search for each column
            //                 returnValue =
            //                     returnValue ||
            //                     searchColumn(column, original, searchText);
            //             });
            //         }
            //         return returnValue;
            //     });

            // convert user searched text to lower case
            const searchText = filterValue ? filterValue.toLowerCase() : "";
            // Loop through all rows

            debugger;
            const filteredRows = rows.filter((row) => {
                // Find original data value of each row
                const { original } = row;
                // Return value of the filter method
                let returnValue = false;
                // Loop through all column values for each row
                convertToIndividualColumns([...managableColumns]).forEach(
                    (column) => {
                        // Do search for each column
                        returnValue =
                            returnValue ||
                            searchColumn(column, original, searchText);
                    }
                );
                return returnValue;
            });

            console.log("filteredRows ", filteredRows);
        }
    }));

    // Update the row selection and clear row expands when group sort changes
    // Set all row selections to false and find new Ids of already selected rows and make them selected
    useEffect(() => {
        if (!isFirstRendering) {
            toggleAllRowsExpanded(false);
            if (userSelectedRows && userSelectedRows.length > 0) {
                Object.keys(selectedRowIds).forEach((key) => {
                    selectedRowIds[key] = false;
                });
                userSelectedRows.forEach((selectedRow) => {
                    const updatedRow = rows.find((row) => {
                        return row.original === selectedRow;
                    });
                    if (updatedRow) {
                        const { id } = updatedRow;
                        if (updatedRow) {
                            selectedRowIds[id] = true;
                        }
                    }
                });
            }
        }
    }, [groupSortOptions]);

    // Render each row and cells in each row, using attributes from react window list.
    const RenderRow = (index) =>
        // useCallback(
        //  ({ index, style }) =>
        {
            // if (isItemLoaded(index)) - This check never became false during testing. Hence avoiding it to reach 100% code coverage in JEST test.
            // for (let index = 0; index < 300; index++) {
            const row = rows[index];
            prepareRow(row);
            //  return miniGridList.miniRowsList.map((miniRow) => (
            // <div
            // {...row.getRowProps({ style })}
            // className="table-row tr"
            // >
            //     <h4>{miniRow}</h4>
            // </div>
            // ));
            return (
                <div
                    // {...row.getRowProps({ style })}
                    className="table-row tr"
                >
                    <div className="table-row-wrap">
                        {row.cells.map((cell) => {
                            return (
                                <div
                                    {...cell.getCellProps()}
                                    className="table-cell td"
                                >
                                    {cell.render("Cell")}
                                </div>
                            );
                        })}
                    </div>
                    {isRowExpandEnabled && row.isExpanded ? (
                        <div className="expand">
                            {displayExpandedContent
                                ? displayExpandedContent(row)
                                : null}
                        </div>
                    ) : null}
                </div>
            );
            //  }
        };
    // ,
    // [prepareRow, rows, isRowExpandEnabled, displayExpandedContent]
    // );

    // Render table and other components as required
    // Use properties and methods provided by react-table
    // Autosizer used for calculating grid height (don't consider window width and column resizing value changes)
    // Infinite loader used for lazy loading, with the properties passed here and other values calculated at the top
    // React window list is used for implementing virtualization, specifying the item count in a frame and height of each rows in it.
    return (
        <div className="table-wrapper" style={{ width: gridWidth || "100%" }}>
            <div className="neo-grid-header__results">
                <strong>{rows.length}</strong>
                <span>{title || "Rows"}</span>
            </div>
            {/* <div className="neo-grid-header">
                    <div className="neo-grid-header__results">
                        <strong>{rows.length}</strong>
                        <span>{title || "Rows"}</span>
                    </div>
                    {CustomPanel ? (
                        <div className="neo-grid-header_customPanel">
                            <CustomPanel />
                        </div>
                    ) : null}
                    <div className="neo-grid-header__utilities">
                        {columnChooser !== false ? (
                            <ColumnReordering
                                isManageColumnOpen={isManageColumnOpen}
                                toggleManageColumns={toggleManageColumns}
                                originalColumns={originalColumns}
                                isExpandContentAvailable={
                                    isExpandContentAvailable
                                }
                                additionalColumn={
                                    additionalColumn ? [additionalColumn] : []
                                }
                                updateColumnStructure={updateColumnStructure}
                            />
                        ) : null}
                        {globalSearch !== false ? (
                            <GlobalFilter
                                globalFilter={globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        ) : null}
                        {groupSort !== false ? (
                            <GroupSort
                                isGroupSortOverLayOpen={isGroupSortOverLayOpen}
                                toggleGroupSortOverLay={toggleGroupSortOverLay}
                                originalColumns={originalColumns}
                                applyGroupSort={applyGroupSort}
                            />
                        ) : null}
                        {exportData !== false ? (
                            <ExportData
                                isExportOverlayOpen={isExportOverlayOpen}
                                toggleExportDataOverlay={
                                    toggleExportDataOverlay
                                }
                                rows={rows}
                                originalColumns={originalColumns}
                                columns={columns} // Updated columns structure from manage columns overlay
                                isRowExpandEnabled={isRowExpandEnabled} // Updated additional column structure from manage columns overlay
                                isExpandContentAvailable={
                                    isExpandContentAvailable
                                }
                                additionalColumn={
                                    additionalColumn ? [additionalColumn] : []
                                }
                            />
                        ) : null}
                        {columnFilter !== false ? (
                            <div
                                className="utilities-icon keyword-search"
                                role="presentation"
                                data-testid="toggleColumnFilter"
                                onClick={toggleColumnFilter}
                            >
                                <i>
                                    <IconFilter />
                                </i>
                            </div>
                        ) : null}
                        {groupSort !== false ? (
                            <div
                                className="utilities-icon group-sort"
                                role="presentation"
                                data-testid="toggleGroupSortOverLay"
                                onClick={toggleGroupSortOverLay}
                            >
                                <i>
                                    <IconGroupSort />
                                </i>
                            </div>
                        ) : null}
                        {columnChooser !== false ? (
                            <div
                                className="utilities-icon manage-columns"
                                role="presentation"
                                data-testid="toggleManageColumns"
                                onClick={toggleManageColumns}
                            >
                                <i>
                                    <IconColumns />
                                </i>
                            </div>
                        ) : null}
                        {exportData !== false ? (
                            <div
                                className="utilities-icon export-data"
                                role="presentation"
                                data-testid="toggleExportDataOverlay"
                                onClick={toggleExportDataOverlay}
                            >
                                <i>
                                    <IconShare />
                                </i>
                            </div>
                        ) : null}
                        {typeof onGridRefresh === "function" ? (
                            <div
                                className="utilities-icon refresh-data"
                                role="presentation"
                                data-testid="refreshGrid"
                                onClick={onGridRefresh}
                            >
                                <i>
                                    <IconRefresh />
                                </i>
                            </div>
                        ) : null}
                    </div>
                </div> */}

            <div className="table-popus">
                {/* {isRowEditOverlyOpen ? (
                    <div className="overlay">
                        <RowEditOverlay
                            row={editedRowData}
                            columns={columns}
                            isRowExpandEnabled={isRowExpandEnabled}
                            additionalColumn={additionalColumn}
                            getRowEditOverlay={getRowEditOverlay}
                            closeRowEditOverlay={closeRowEditOverlay}
                            updateRowInGrid={updateRowInGrid}
                        />
                    </div>
                ) : null} */}
                {isRowDeleteOverlyOpen ? (
                    <div className="overlay">
                        <RowDeleteOverLay
                            row={deletedRowData}
                            closeRowDeleteOverlay={closeRowDeleteOverlay}
                            deleteRowFromGrid={deleteRowFromGrid}
                        />
                    </div>
                ) : null}
            </div>

            <div
                className="tableContainer table-outer neo-grid"
                style={{
                    height: gridHeight || "50vh",
                    overflowX: "auto"
                    // overflowY: "hidden"
                }}
            >
                <div /* {...getTableProps()} */ className="table">
                    {/* {({ onItemsRendered, ref }) => (
                            <List
                                ref={(list) => {
                                    ref(list);
                                    listRef.current = list;
                                }}
                                style={{ overflowX: "hidden" }}
                                
                                onItemsRendered={({
                                    visibleRowStartIndex,
                                    visibleColumnStartIndex,
                                    visibleRowStopIndex,
                                    overscanRowStopIndex,
                                    overscanRowStartIndex
                                }) => {
                                    // props.setScrollRowAndColumn(
                                    //     visibleRowStartIndex,
                                    //     visibleColumnStartIndex
                                    // );
                                    onItemsRendered({
                                        overscanStartIndex: overscanRowStartIndex,
                                        overscanStopIndex: overscanRowStopIndex,
                                        visibleStartIndex: visibleRowStartIndex,
                                        visibleStopIndex: visibleRowStopIndex
                                    });
                                }}
                                // overscanCount={20}
                            >
                                <div {...getTableBodyProps()} className="tbody">
                                    {rows.map((item, idx) => RenderRow(idx))}
                                </div>
                                <button onClick={() => loadMoreRows()}>
                                    Click here to load 20 more records
                                </button>
                            </List>
                        )} */}

                    <div {...getTableBodyProps()} className="tbody">
                        {rows.map((item, idx) => RenderRow(idx))}
                    </div>
                    <button
                        className="load-more-div"
                        onClick={() => loadMoreRows()}
                    >
                        Click here to load 20 more records
                    </button>
                </div>
            </div>
            {/*   <div className="load-more-div">
                   <button onClick={() => loadMoreRecords()}>
                        Click here to load 20 more records
                    </button> 
                </div> */}
        </div>
    );
});
MiniCustomgrid.propTypes = {
    title: PropTypes.any,
    gridHeight: PropTypes.any,
    gridWidth: PropTypes.any,
    managableColumns: PropTypes.any,
    originalColumns: PropTypes.any,
    data: PropTypes.any,
    getRowEditOverlay: PropTypes.any,
    updateRowInGrid: PropTypes.any,
    deleteRowFromGrid: PropTypes.any,
    searchColumn: PropTypes.any,
    onRowSelect: PropTypes.any,
    calculateRowHeight: PropTypes.any,
    isExpandContentAvailable: PropTypes.any,
    displayExpandedContent: PropTypes.any,
    hasNextPage: PropTypes.any,
    isNextPageLoading: PropTypes.any,
    loadNextPage: PropTypes.any,
    doGroupSort: PropTypes.any,
    miniGridIndex: PropTypes.any,
    getToggleAllRowsSelectedProps: PropTypes.any,
    row: PropTypes.any,
    additionalColumn: PropTypes.any,
    rowActions: PropTypes.any,
    rowActionCallback: PropTypes.any,
    CustomPanel: PropTypes.any,
    globalSearch: PropTypes.any,
    columnFilter: PropTypes.any,
    groupSort: PropTypes.any,
    columnChooser: PropTypes.any,
    exportData: PropTypes.any,
    onGridRefresh: PropTypes.any,
    rowsToDeselect: PropTypes.any,
    groupSortOptions: PropTypes.any,
    miniGridList: PropTypes.any
};

export default MiniCustomgrid;
