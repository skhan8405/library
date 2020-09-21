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
import {
    findSelectedRows,
    findSelectedRowIdAttributes
} from "./Utilities/GridUtilities";

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
        idAttribute,
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
        groupSortOptions
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

    // Local state value for storing user selected rows - identifier values (idAttribute)
    const [
        userSelectedRowIdentifiers,
        setUserSelectedRowIdentifiers
    ] = useState([]);

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
        [originalColumns, searchColumn]
    );

    // Finds the rows selected by users from selectedRowIds and updates the state value and triggers the callback function.
    // This is used in useeffects for row selection and row deselection
    const updateSelectedRows = (rows, selectedRowIds) => {
        const rowsSelectedByUser = findSelectedRows(rows, selectedRowIds);
        const rowIdentifiers = findSelectedRowIdAttributes(
            rowsSelectedByUser,
            idAttribute
        );
        setUserSelectedRowIdentifiers(rowIdentifiers);
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
        state: { globalFilter, selectedRowIds },
        setGlobalFilter,
        toggleAllRowsExpanded
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            globalFilter: globalFilterLogic,
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
        if (rowsToDeselect && rowsToDeselect.length) {
            rowsToDeselect.forEach((rowId) => {
                const rowToDeselect = preFilteredRows.find((row) => {
                    const { original } = row;
                    return original[idAttribute] === rowId;
                });
                if (rowToDeselect) {
                    const { id } = rowToDeselect;
                    selectedRowIds[id] = false;
                    updateSelectedRows(preFilteredRows, selectedRowIds);
                }
            });
        }
    }, [rowsToDeselect]);

    // Trigger call back when user makes a row selection using checkbox
    // And store the rows that are selected by user for making them selected when data changes after groupsort
    // Call back method will not be triggered if this is the first render of Grid
    useEffect(() => {
        if (!isFirstRendering) {
            updateSelectedRows(preFilteredRows, selectedRowIds);
        }
    }, [selectedRowIds]);

    // Update the row selection and clear row expands when group sort changes
    // Set all row selections to false and find new Ids of already selected rows and make them selected
    useEffect(() => {
        if (!isFirstRendering) {
            toggleAllRowsExpanded(false);
            if (
                userSelectedRowIdentifiers &&
                userSelectedRowIdentifiers.length > 0
            ) {
                // Deselect all current selections
                Object.keys(selectedRowIds).forEach((key) => {
                    selectedRowIds[key] = false;
                });

                // Loop through already selected rows and find row id and make it selected
                userSelectedRowIdentifiers.forEach((selectedRowId) => {
                    const updatedRow = preFilteredRows.find((row) => {
                        const { original } = row;
                        return original[idAttribute] === selectedRowId;
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
        [prepareRow, rows, isRowExpandEnabled, displayExpandedContent]
    );

    // Render table and other components as required
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
                    {columnChooser !== false ? (
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
                <AutoSizer
                    disableWidth
                    disableResizing
                    className="tableContainer__AutoSizer"
                >
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
                                    className="tableContainer__InfiniteLoader"
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
                                            className="tableContainer__List"
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
    title: PropTypes.string,
    gridHeight: PropTypes.string,
    gridWidth: PropTypes.string,
    managableColumns: PropTypes.arrayOf(PropTypes.object),
    originalColumns: PropTypes.arrayOf(PropTypes.object),
    data: PropTypes.arrayOf(PropTypes.object),
    idAttribute: PropTypes.string,
    getRowEditOverlay: PropTypes.func,
    updateRowInGrid: PropTypes.func,
    deleteRowFromGrid: PropTypes.func,
    searchColumn: PropTypes.func,
    onRowSelect: PropTypes.func,
    calculateRowHeight: PropTypes.func,
    isExpandContentAvailable: PropTypes.bool,
    displayExpandedContent: PropTypes.func,
    hasNextPage: PropTypes.bool,
    isNextPageLoading: PropTypes.bool,
    loadNextPage: PropTypes.func,
    doGroupSort: PropTypes.func,
    getToggleAllRowsSelectedProps: PropTypes.func,
    row: PropTypes.arrayOf(PropTypes.object),
    additionalColumn: PropTypes.object,
    rowActions: PropTypes.arrayOf(PropTypes.object),
    rowActionCallback: PropTypes.func,
    CustomPanel: PropTypes.any,
    globalSearch: PropTypes.bool,
    columnFilter: PropTypes.bool,
    groupSort: PropTypes.bool,
    columnChooser: PropTypes.bool,
    exportData: PropTypes.bool,
    onGridRefresh: PropTypes.func,
    rowsToDeselect: PropTypes.array,
    groupSortOptions: PropTypes.arrayOf(PropTypes.object)
};

export default Customgrid;
