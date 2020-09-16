import React, {
    useCallback,
    useState,
    useEffect,
    createRef,
    useMemo
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
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import PropTypes from "prop-types";
import RowSelector from "./Functions/RowSelector";
import DefaultColumnFilter from "./Functions/DefaultColumnFilter";
import GlobalFilter from "./Functions/GlobalFilter";
import RowOptions from "./Functions/RowOptions";
import RowEditOverlay from "./Functions/RowEditOverlay";
import RowDeleteOverLay from "./Functions/RowDeleteOverLay";
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

const listRef = createRef(null);

const Customgrid = (props) => {
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
        rowDataSelected,
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
        hideGlobalSearch,
        hideColumnFilter,
        hideGroupSort,
        hideColumnChooser,
        hideExportData,
        refreshGrid,
        hideRefreshGrid
    } = props;

    // Local state to check if this is the first rendering of the Grid. Default value is true
    // This will be set as false in useEffect - [].
    // Selectedrows data will be passed to parent only if isFirstRendering is false
    const [isFirstRendering, setIsFirstRendering] = useState(true);

    // Local state value for holding columns configuration
    const [columns, setColumns] = useState(managableColumns);
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

    // Local state value for checking if column filter is open/closed
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

    // Local state value for checking if column filter is open/closed
    const [isRowDeleteOverlyOpen, setIsRowDeleteOverlyOpen] = useState(false);
    // Local state value to hold row data that is going to be deleted
    const [deletedRowData, setDeletedRowData] = useState(null);
    // Bind the user defined row delete overlay into Grid
    const bindRowDeleteOverlay = (rowValue) => {
        setDeletedRowData(rowValue);
        setIsRowDeleteOverlyOpen(true);
    };
    // Close the row edit overlay
    const closeRowDeleteOverlay = () => {
        setDeletedRowData(null);
        setIsRowDeleteOverlyOpen(false);
    };

    // Local state value for checking if group Sort Overlay is open/closed.
    const [isGroupSortOverLayOpen, setGroupSortOverLay] = useState(false);

    // Toggle group Sort state value based on UI clicks
    const toggleGroupSortOverLay = () => {
        setGroupSortOverLay(!isGroupSortOverLayOpen);
    };

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
    const updateColumnStructure = (newColumnStructure, remarksColumn) => {
        setColumns([...newColumnStructure]);
        setIsRowExpandEnabled(!!(remarksColumn && remarksColumn.length > 0));
    };

    // Local state value for hiding/unhiding export data overlay
    const [isExportOverlayOpen, setIsExportOverlayOpen] = useState(false);

    // Toggle export overlay show/hide state value based on UI clicks
    const toggleExportDataOverlay = () => {
        setIsExportOverlayOpen(!isExportOverlayOpen);
    };

    // Column filter added for all columns by default
    const defaultColumn = useMemo(
        () => ({
            Filter: DefaultColumnFilter
        }),
        []
    );

    // Initialize react-table instance with the values received through properties
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        state,
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            globalFilter: (rowsToFilter, columnsToFilter, filterValue) => {
                // convert user searched text to lower case
                const searchText = filterValue ? filterValue.toLowerCase() : "";
                // Loop through all rows
                return rowsToFilter.filter((row) => {
                    // Find original data value of each row
                    const { original } = row;
                    // Return value of the filter method
                    let returnValue = false;
                    // Loop through all column values for each row
                    originalColumns.forEach((column) => {
                        // Do search for each column
                        returnValue =
                            returnValue ||
                            searchColumn(column, original, searchText);
                    });
                    return returnValue;
                });
            },
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

    // This code is to handle the row height calculation while expanding a row or resizing a column
    useEffect(() => {
        if (listRef && listRef.current) {
            listRef.current.resetAfterIndex(0, true);
        }
    });

    // This code is to update the column chooser overlay, when user is updating column configuration from outside Grid
    useEffect(() => {
        setColumns(managableColumns);
        setIsRowExpandEnabled(isExpandContentAvailable);
    }, [managableColumns, isExpandContentAvailable]);

    // This code is update the boolean value used to identify if this is the first time render of Grid
    useEffect(() => {
        setIsFirstRendering(false);
    }, []);

    // This code is to trigger call back when user makes a row selection using checkbox
    // Call back method will not be triggered if this is the first render of Grid
    useEffect(() => {
        if (!isFirstRendering && rowDataSelected) {
            const userCheckedRows = [];
            selectedFlatRows.forEach((selectedRows) => {
                userCheckedRows.push(selectedRows.original);
            });
            rowDataSelected(userCheckedRows);
        }
    }, [state.selectedRowIds]);

    // Render each row and cells in each row, using attributes from react window list.
    const RenderRow = useCallback(
        ({ index, style }) => {
            // if (isItemLoaded(index)) - This check never became false during testing. Hence avoiding it to reach 100% code coverage in JEST test.
            const row = rows[index];
            prepareRow(row);
            return (
                <div {...row.getRowProps({ style })} className="table-row tr">
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
                    {/* Check if row eapand icon is clicked, and if yes, call function to bind content to the expanded region */}
                    {isRowExpandEnabled && row.isExpanded ? (
                        <div className="expand">
                            {displayExpandedContent
                                ? displayExpandedContent(row)
                                : null}
                        </div>
                    ) : null}
                </div>
            );
        },
        [prepareRow, rows, displayExpandedContent]
    );

    // Render table title, global search component, button to show/hide column filter, button to export selected row data & the grid
    // Use properties and methods provided by react-table
    // Autosizer used for calculating grid height (don't consider window width and column resizing value changes)
    // Infinite loader used for lazy loading, with the properties passed here and other values calculated at the top
    // React window list is used for implementing virtualization, specifying the item count in a frame and height of each rows in it.
    return (
        <div className="table-wrapper" style={{ width: gridWidth || "100%" }}>
            <div className="neo-grid-header">
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
                    {!hideColumnChooser ? (
                        <ColumnReordering
                            isManageColumnOpen={isManageColumnOpen}
                            toggleManageColumns={toggleManageColumns}
                            originalColumns={originalColumns}
                            isExpandContentAvailable={isExpandContentAvailable}
                            additionalColumn={
                                additionalColumn ? [additionalColumn] : []
                            }
                            updateColumnStructure={updateColumnStructure}
                        />
                    ) : null}
                    {!hideGlobalSearch ? (
                        <GlobalFilter
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                    ) : null}
                    {!hideGroupSort ? (
                        <GroupSort
                            isGroupSortOverLayOpen={isGroupSortOverLayOpen}
                            toggleGroupSortOverLay={toggleGroupSortOverLay}
                            originalColumns={originalColumns}
                            applyGroupSort={applyGroupSort}
                        />
                    ) : null}
                    {!hideExportData ? (
                        <ExportData
                            isExportOverlayOpen={isExportOverlayOpen}
                            toggleExportDataOverlay={toggleExportDataOverlay}
                            rows={rows}
                            originalColumns={originalColumns}
                            columns={columns} // Updated columns structure from manage columns overlay
                            isRowExpandEnabled={isRowExpandEnabled} // Updated additional column structure from manage columns overlay
                            isExpandContentAvailable={isExpandContentAvailable}
                            additionalColumn={
                                additionalColumn ? [additionalColumn] : []
                            }
                        />
                    ) : null}
                    {!hideColumnFilter ? (
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
                    {!hideGroupSort ? (
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
                    {!hideColumnChooser ? (
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
                    {!hideExportData ? (
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
                    {!hideRefreshGrid ? (
                        <div
                            className="utilities-icon refresh-data"
                            role="presentation"
                            data-testid="refreshGrid"
                            onClick={refreshGrid}
                        >
                            <i>
                                <IconRefresh />
                            </i>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="table-popus">
                {isRowEditOverlyOpen ? (
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
                ) : null}
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
                    overflowX: "auto",
                    overflowY: "hidden"
                }}
            >
                <AutoSizer disableWidth disableResizing>
                    {({ height }) => (
                        <div {...getTableProps()} className="table">
                            <div className="thead table-row table-row--head">
                                {headerGroups.map((headerGroup) => (
                                    <div
                                        {...headerGroup.getHeaderGroupProps()}
                                        className="tr"
                                    >
                                        {headerGroup.headers.map((column) => (
                                            <div
                                                {...column.getHeaderProps()}
                                                className="table-cell column-heading th"
                                            >
                                                <div
                                                    {...column.getSortByToggleProps()}
                                                >
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted ? (
                                                            <i>
                                                                <IconSort
                                                                    className={
                                                                        column.isSortedDesc
                                                                            ? "sort-asc"
                                                                            : "sort-desc"
                                                                    }
                                                                />
                                                            </i>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </span>
                                                </div>
                                                <div
                                                    className={`txt-wrap column-filter ${
                                                        isFilterOpen
                                                            ? "open"
                                                            : ""
                                                    }`}
                                                >
                                                    {!column.disableFilters
                                                        ? column.render(
                                                              "Filter"
                                                          )
                                                        : null}
                                                </div>
                                                {column.canResize && (
                                                    <div
                                                        {...column.getResizerProps()}
                                                        className="resizer"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div {...getTableBodyProps()} className="tbody">
                                <InfiniteLoader
                                    isItemLoaded={isItemLoaded}
                                    itemCount={itemCount}
                                    loadMoreItems={loadMoreItems}
                                >
                                    {({ onItemsRendered, ref }) => (
                                        <List
                                            ref={(list) => {
                                                ref(list);
                                                listRef.current = list;
                                            }}
                                            style={{ overflowX: "hidden" }}
                                            height={height - 60}
                                            itemCount={rows.length}
                                            itemSize={(index) => {
                                                return calculateRowHeight(
                                                    rows[index],
                                                    headerGroups &&
                                                        headerGroups.length
                                                        ? headerGroups[0]
                                                              .headers
                                                        : []
                                                );
                                            }}
                                            onItemsRendered={onItemsRendered}
                                            overscanCount={20}
                                        >
                                            {RenderRow}
                                        </List>
                                    )}
                                </InfiniteLoader>
                            </div>
                        </div>
                    )}
                </AutoSizer>
            </div>
        </div>
    );
};

Customgrid.propTypes = {
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
    rowDataSelected: PropTypes.any,
    calculateRowHeight: PropTypes.any,
    isExpandContentAvailable: PropTypes.any,
    displayExpandedContent: PropTypes.any,
    hasNextPage: PropTypes.any,
    isNextPageLoading: PropTypes.any,
    loadNextPage: PropTypes.any,
    doGroupSort: PropTypes.any,
    getToggleAllRowsSelectedProps: PropTypes.any,
    row: PropTypes.any,
    additionalColumn: PropTypes.any,
    rowActions: PropTypes.any,
    rowActionCallback: PropTypes.any,
    CustomPanel: PropTypes.any,
    hideGlobalSearch: PropTypes.any,
    hideColumnFilter: PropTypes.any,
    hideGroupSort: PropTypes.any,
    hideColumnChooser: PropTypes.any,
    hideExportData: PropTypes.any,
    refreshGrid: PropTypes.any,
    hideRefreshGrid:  PropTypes.any
};

export default Customgrid;
