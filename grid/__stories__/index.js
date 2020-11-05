/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback } from "react";
import "./example.css";
import Grid from "../src/index";
import FlightIcon from "./images/FlightIcon.png";
import { fetchData } from "./getData";
import { getValueOfDate } from "./utils/DateUtility";
import FlightEdit from "./cells/FlightEdit";
import SrEdit from "./cells/SrEdit";
import SegmentEdit from "./cells/SegmentEdit";
import RowAction from "./cells/RowAction";
import RowEdit from "./cells/RowEdit";
import RowDelete from "./cells/RowDelete";
import miniGridList from "./miniGrid.json";

const GridComponent = (props) => {
    const {
        className,
        title,
        gridHeight,
        gridWidth,
        rowsToOverscan,
        passColumnToExpand,
        passRowActions,
        passGetRowInfo,
        passOnGridRefresh,
        hasPagination,
        CustomPanel,
        enableGroupHeaders,
        enableJsxHeaders,
        gridHeader,
        rowSelector,
        globalSearch,
        columnFilter,
        groupSort,
        columnChooser,
        exportData,
        rowsForSelection,
        passIdAttribute,
        expandableColumn,
        multiRowSelection,
        passTheme,
        enableServersideSorting
    } = props;
    const idAttribute = "travelId";
    const gridPageSize = 300;
    const paginationType = "index"; // or - "cursor"
    // State for holding index page info
    const [indexPageInfo, setIndexPageInfo] = useState({
        pageNum: 1,
        pageSize: gridPageSize,
        total: 20000,
        lastPage: false
    });
    // State for holding cursor page info
    const [cursorPageInfo, setCursorPageInfo] = useState({
        endCursor: 299,
        pageSize: gridPageSize,
        total: 20000,
        lastPage: false
    });
    // State for holding grid data
    const [gridData, setGridData] = useState(miniGridList.miniRowsList);
    // State for holding Original grid data, to be used while clearing group sort
    const [originalGridData, setOriginalGridData] = useState([]);
    // State for holding group sort options
    const [sortOptions, setSortOptions] = useState([]);
    // State for holding selected rows
    const [userSelectedRows, setUserSelectedRows] = useState([]);
    // State for holding rows to deselect
    const [rowsToDeselect, setRowsToDeselect] = useState([]);
    // State for holding rows to select
    const [rowsToSelect, setRowsToSelect] = useState([]);

    const [isEditOverlayOpened, setIsEditOverlayOpened] = useState(false);
    const [rowDataToEdit, setRowDataToEdit] = useState(null);

    const [isDeleteOverlayOpened, setIsDeleteOverlayOpened] = useState(false);
    const [rowDataToDelete, setRowDataToDelete] = useState(null);

    // Loginc for sorting data
    const compareValues = (compareOrder, v1, v2) => {
        let returnValue = 0;
        if (compareOrder === "Ascending") {
            if (v1 > v2) {
                returnValue = 1;
            } else if (v1 < v2) {
                returnValue = -1;
            }
            return returnValue;
        }
        if (v1 < v2) {
            returnValue = 1;
        } else if (v1 > v2) {
            returnValue = -1;
        }
        return returnValue;
    };
    // Return sorted data based on the parameters
    const getSortedData = (data, sortValues) => {
        if (data && data.length > 0 && sortValues && sortValues.length > 0) {
            return data.sort((x, y) => {
                let compareResult = 0;
                sortValues.forEach((option) => {
                    const { sortBy, sortOn, order } = option;
                    const newResult =
                        sortOn === "value"
                            ? compareValues(order, x[sortBy], y[sortBy])
                            : compareValues(
                                  order,
                                  x[sortBy][sortOn],
                                  y[sortBy][sortOn]
                              );
                    compareResult = compareResult || newResult;
                });
                return compareResult;
            });
        }
        return data;
    };

    const airportCodeList = [
        "AAA",
        "AAB",
        "AAC",
        "ABA",
        "ABB",
        "ABC",
        "ACA",
        "ACB",
        "ACC",
        "BAA",
        "BAB",
        "BAC",
        "BBA",
        "BBB",
        "BBC",
        "BCA",
        "BCB",
        "BCC",
        "CAA",
        "CAB",
        "CAC",
        "CBA",
        "CBB",
        "CBC",
        "CCA",
        "CCB",
        "CCC",
        "XXX",
        "XXY",
        "XXZ",
        "XYX",
        "XYY",
        "XYZ",
        "XZX",
        "XZY",
        "XZZ",
        "YXX",
        "YXY",
        "YXZ",
        "YYX",
        "YYY",
        "YYZ",
        "YZX",
        "YZY",
        "YZZ",
        "ZXX",
        "ZXY",
        "ZXZ",
        "ZYX",
        "ZYY",
        "ZYZ",
        "ZZX",
        "ZZY",
        "ZZZ"
    ];


    //childTableData	
    const [childTableData, setChildTableData] = useState([]);

    const originalColumns = [
        {
            Header: "Id",
            accessor: "travelId",
            width: 50,
            disableFilters: true,
            isSearchable: true,
            isSortable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { travelId } = rowData;
                return (
                    <div className="travelId-details">
                        <span>{travelId}</span>
                    </div>
                );
            }
        },
        {
            groupHeader: "Flight & Segment",
            Header: () => {
                return (
                    <div className="flightHeader">
                        <i className="flightIcon">
                            <img src={FlightIcon} alt="Flight Info" />
                        </i>
                        <span className="flightText">Info</span>
                    </div>
                );
            },
            title: "Flight",
            accessor: "flight",
            width: 100,
            isSortable: true,
            innerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno",
                    isSortable: true,
                    isSearchable: true
                },
                {
                    Header: "Date",
                    accessor: "date",
                    isSearchable: true
                }
            ],
            sortValue: "flightno",
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { flightno, date } = rowData.flight;
                return (
                    <div className="flight-details">
                        <DisplayTag columnKey="flight" cellKey="flightno">
                            <strong>{flightno}</strong>
                        </DisplayTag>
                        <DisplayTag columnKey="flight" cellKey="date">
                            <span>{getValueOfDate(date, "cell")}</span>
                        </DisplayTag>
                    </div>
                );
            },
            editCell: (
                rowData,
                DisplayTag,
                rowUpdateCallBack,
                isDesktop,
                isExpandableColumn
            ) => {
                return (
                    <FlightEdit
                        rowData={rowData}
                        DisplayTag={DisplayTag}
                        rowUpdateCallBack={rowUpdateCallBack}
                    />
                );
            }
        },
        {
            groupHeader: "Flight & Segment",
            Header: "Segment",
            accessor: "segment",
            width: 100,
            isSortable: true,
            innerCells: [
                {
                    Header: "From",
                    accessor: "from",
                    isSortable: true,
                    isSearchable: true
                },
                {
                    Header: "To",
                    accessor: "to",
                    isSortable: true,
                    isSearchable: true
                }
            ],
            disableSortBy: true,
            isSearchable: false,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { from, to } = rowData.segment;
                return (
                    <div className="segment-details">
                        <DisplayTag columnKey="segment" cellKey="from">
                            <span>{from}</span>
                        </DisplayTag>
                        <i>
                            <img src={FlightIcon} alt="segment" />
                        </i>
                        <DisplayTag columnKey="segment" cellKey="to">
                            <span>{to}</span>
                        </DisplayTag>
                    </div>
                );
            },
            editCell: (
                rowData,
                DisplayTag,
                rowUpdateCallBack,
                isDesktop,
                isExpandableColumn
            ) => {
                return (
                    <SegmentEdit
                        airportCodeList={airportCodeList}
                        rowData={rowData}
                        DisplayTag={DisplayTag}
                        rowUpdateCallBack={rowUpdateCallBack}
                    />
                );
            }
        },
        {
            Header: "Details",
            accessor: "details",
            onlyInDesktop: true,
            width: 300,
            innerCells: [
                {
                    Header: "Flight Model",
                    accessor: "flightModel",
                    isSearchable: true
                },
                {
                    Header: "Body Type",
                    accessor: "bodyType",
                    isSearchable: true
                },
                {
                    Header: "Type",
                    accessor: "type",
                    isSearchable: true
                },
                {
                    Header: "Start Time",
                    accessor: "startTime",
                    isSearchable: true
                },
                {
                    Header: "End Time",
                    accessor: "endTime",
                    isSearchable: true
                },
                {
                    Header: "Status",
                    accessor: "status",
                    isSearchable: true
                },
                {
                    Header: "Additional Status",
                    accessor: "additionalStatus",
                    isSearchable: true
                },
                {
                    Header: "Time Status",
                    accessor: "timeStatus",
                    isSearchable: true
                }
            ],
            disableSortBy: true,
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const {
                    startTime,
                    endTime,
                    status,
                    additionalStatus,
                    flightModel,
                    bodyType,
                    type,
                    timeStatus
                } = rowData.details;
                const timeStatusArray = timeStatus ? timeStatus.split(" ") : [];
                const timeValue = timeStatusArray.shift();
                const timeText = timeStatusArray.join(" ");
                if (
                    isExpandableColumn === null ||
                    isExpandableColumn === true
                ) {
                    return (
                        <div className="details-wrap">
                            <ul>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="startTime"
                                    >
                                        {startTime}
                                    </DisplayTag>
                                    -
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="endTime"
                                    >
                                        {endTime}
                                    </DisplayTag>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="status"
                                    >
                                        <span>{status}</span>
                                    </DisplayTag>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="additionalStatus"
                                    >
                                        {additionalStatus}
                                    </DisplayTag>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="flightModel"
                                    >
                                        {flightModel}
                                    </DisplayTag>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="bodyType"
                                    >
                                        {bodyType}
                                    </DisplayTag>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <span>
                                        <DisplayTag
                                            columnKey="details"
                                            cellKey="type"
                                        >
                                            {type}
                                        </DisplayTag>
                                    </span>
                                </li>
                                <li className="divider">|</li>
                                <li>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="timeStatus"
                                    >
                                        <strong>{timeValue} </strong>
                                        <span>{timeText}</span>
                                    </DisplayTag>
                                </li>
                            </ul>
                        </div>
                    );
                }
                return (
                    <div className="details-wrap">
                        <ul>
                            <li>
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="startTime"
                                >
                                    {startTime}
                                </DisplayTag>
                                -
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="endTime"
                                >
                                    {endTime}
                                </DisplayTag>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="status"
                                >
                                    <span>{status}</span>
                                </DisplayTag>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="flightModel"
                                >
                                    {flightModel}
                                </DisplayTag>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="bodyType"
                                >
                                    {bodyType}
                                </DisplayTag>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <span>
                                    <DisplayTag
                                        columnKey="details"
                                        cellKey="type"
                                    >
                                        {type}
                                    </DisplayTag>
                                </span>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <DisplayTag
                                    columnKey="details"
                                    cellKey="timeStatus"
                                >
                                    <strong>{timeValue} </strong>
                                    <span>{timeText}</span>
                                </DisplayTag>
                            </li>
                        </ul>
                    </div>
                );
            }
        },
        {
            Header: "Weight",
            accessor: "weight",
            width: 130,
            isSortable: true,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage",
                    isSortable: true,
                    isSearchable: true
                },
                {
                    Header: "Value",
                    accessor: "value",
                    isSortable: true,
                    isSearchable: true
                }
            ],
            sortValue: "percentage",
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { percentage, value } = rowData.weight;
                const splitValue = value ? value.split("/") : [];
                let valuePrefix;
                let valueSuffix = "";
                if (splitValue.length === 2) {
                    valuePrefix = splitValue[0];
                    valueSuffix = splitValue[1];
                }
                return (
                    <div className="weight-details">
                        <DisplayTag columnKey="weight" cellKey="percentage">
                            <strong className="per">{percentage}</strong>
                        </DisplayTag>
                        <DisplayTag columnKey="weight" cellKey="value">
                            <span>
                                <strong>{valuePrefix}/</strong>
                                {valueSuffix}
                            </span>
                        </DisplayTag>
                    </div>
                );
            }
        },
        {
            Header: "Volume",
            accessor: "volume",
            width: 100,
            isSortable: true,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage",
                    isSearchable: true
                },
                {
                    Header: "Value",
                    accessor: "value",
                    isSearchable: true
                }
            ],
            sortValue: "percentage",
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { percentage, value } = rowData.volume;
                const splitValue = value ? value.split("/") : [];
                let valuePrefix;
                let valueSuffix = "";
                if (splitValue.length === 2) {
                    valuePrefix = splitValue[0];
                    valueSuffix = splitValue[1];
                }
                return (
                    <div className="weight-details">
                        <DisplayTag columnKey="volume" cellKey="percentage">
                            <strong className="per">{percentage}</strong>
                        </DisplayTag>
                        <DisplayTag columnKey="volume" cellKey="value">
                            <span>
                                <strong>{valuePrefix}/</strong>
                                {valueSuffix}
                            </span>
                        </DisplayTag>
                    </div>
                );
            }
        },
        {
            Header: "ULD Positions",
            accessor: "uldPositions",
            width: 120,
            innerCells: [
                {
                    Header: "Position",
                    accessor: "position",
                    isSearchable: true
                },
                {
                    Header: "Value",
                    accessor: "value",
                    isSearchable: true
                }
            ],
            disableSortBy: true,
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { uldPositions } = rowData;
                return (
                    <div className="uld-details">
                        <ul>
                            {uldPositions.map((positions) => {
                                const { position, value } = positions;
                                return (
                                    <li key={`${position}_${value}`}>
                                        <DisplayTag
                                            columnKey="uldPositions"
                                            cellKey="position"
                                        >
                                            <span>{positions.position}</span>
                                        </DisplayTag>
                                        <DisplayTag
                                            columnKey="uldPositions"
                                            cellKey="value"
                                        >
                                            <strong>{positions.value}</strong>
                                        </DisplayTag>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            }
        },
        {
            Header: "Revenue/Yield",
            accessor: "revenue",
            width: 120,
            innerCells: [
                {
                    Header: "Revenue",
                    accessor: "revenue",
                    isSearchable: true
                },
                {
                    Header: "Yeild",
                    accessor: "yeild",
                    isSearchable: true
                }
            ],
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { revenue, yeild } = rowData.revenue;
                return (
                    <div className="revenue-details">
                        <DisplayTag columnKey="revenue" cellKey="revenue">
                            <span className="large">{revenue}</span>
                        </DisplayTag>
                        <DisplayTag columnKey="revenue" cellKey="yeild">
                            <span>{yeild}</span>
                        </DisplayTag>
                    </div>
                );
            },
            sortValue: "revenue",
            isSearchable: true
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            isSortable: true,
            isSearchable: true,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { sr } = rowData;
                return (
                    <div className="sr-details">
                        <span>{sr}</span>
                    </div>
                );
            },
            editCell: (
                rowData,
                DisplayTag,
                rowUpdateCallBack,
                isDesktop,
                isExpandableColumn
            ) => {
                return (
                    <SrEdit
                        rowData={rowData}
                        rowUpdateCallBack={rowUpdateCallBack}
                    />
                );
            }
        },
        {
            Header: "Queued Booking",
            accessor: "queuedBooking",
            width: 130,
            innerCells: [
                {
                    Header: "Sr",
                    accessor: "sr",
                    isSearchable: true
                },
                {
                    Header: "Volume",
                    accessor: "volume",
                    isSearchable: true
                }
            ],
            disableSortBy: true,
            isSearchable: false,
            displayCell: (
                rowData,
                DisplayTag,
                isDesktop,
                isExpandableColumn
            ) => {
                const { sr, volume } = rowData.queuedBooking;
                return (
                    <div className="queued-details">
                        <DisplayTag columnKey="queuedBooking" cellKey="sr">
                            <span>
                                <strong>{sr}</strong>
                            </span>
                        </DisplayTag>
                        <DisplayTag columnKey="queuedBooking" cellKey="volume">
                            <span>
                                <strong>{volume}</strong>
                            </span>
                        </DisplayTag>
                    </div>
                );
            }
        }
    ];

    const [columns, setColumns] = useState([]);

    const columnToExpand = {
        Header: "Remarks",
        innerCells: [
            { Header: "Remarks", accessor: "remarks" },
            { Header: "Details", onlyInTablet: true, accessor: "details" }
        ],
        displayCell: (rowData, DisplayTag, isDesktop) => {
            const { remarks, details } = rowData;
            const {
                startTime,
                endTime,
                status,
                additionalStatus,
                flightModel,
                bodyType,
                type,
                timeStatus
            } = details || {};
            const timeStatusArray = timeStatus ? timeStatus.split(" ") : [];
            const timeValue = timeStatusArray.shift();
            const timeText = timeStatusArray.join(" ");
            return (
                <div className="remarks-wrap details-wrap">
                    <DisplayTag columnKey="remarks" cellKey="remarks">
                        <ul>
                            <li>{remarks}</li>
                        </ul>
                    </DisplayTag>
                    <DisplayTag columnKey="details" cellKey="details">
                        <ul>
                            <li>
                                {startTime} - {endTime}
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <span>{status}</span>
                            </li>
                            <li className="divider">|</li>
                            <li>{additionalStatus}</li>
                            <li className="divider">|</li>
                            <li>{flightModel}</li>
                            <li className="divider">|</li>
                            <li>{bodyType}</li>
                            <li className="divider">|</li>
                            <li>
                                <span>{type}</span>
                            </li>
                            <li className="divider">|</li>
                            <li>
                                <strong>{timeValue} </strong>
                                <span>{timeText}</span>
                            </li>
                        </ul>
                    </DisplayTag>
                </div>
            );
        }
    };


	/*Changes BEGING here*/	
    const [minifiedTreeData, setMinifiedTreeData] = useState([]);	
    //loading 20 records	
    const loadMoreRecords = (miniGridIndex) => {	
	                console.log("loadMoreRecords ");	
        const getDataFromAPI = fetchData(	
            miniGridIndex + 1,	
            minifiedTreeData.length + 20 + 5 * miniGridIndex	
        );	
        getDataFromAPI.then((res) => {	
            const newRows = res.slice(	
                minifiedTreeData.length + 5 * miniGridIndex	
                //  Math.max(100 + 5 * miniGridIndex - 20, 0)	
            );	
            const addedMinifiedTreeData = minifiedTreeData.concat(newRows);	
            setMinifiedTreeData(addedMinifiedTreeData);	
        });	
    };	
    const onClickDivMainTree = useCallback(	
        (miniGridIndex) => {	
	                console.log("onClickDivMainTree ");	
            // setMinifiedTreeData([]);	
            const getDataFromAPI = fetchData({	
                pageNum: miniGridIndex + 1,	
                pageSize: 300,	
                total: 20000,	
                lastPage: false	
            });	
            getDataFromAPI.then((res) => {	
                console.log("RESSSS ", res);	
                if (JSON.stringify(res) !== JSON.stringify(minifiedTreeData))	
                    setChildTableData(res);	
            });	
        },	
        [childTableData]	
    );	
    const sortDataMethod = (groupSortOptions, originalData) => {	
        let sortedData = originalData.sort((x, y) => {	
            let compareResult = 0;	
            groupSortOptions.forEach((option) => {	
                const { sortBy, sortOn, order } = option;	
                const newResult =	
                    sortOn === "value"	
                        ? compareValues(order, x[sortBy], y[sortBy])	
                        : compareValues(	
                              order,	
                              x[sortBy][sortOn],	
                              y[sortBy][sortOn]	
                          );	
                compareResult = compareResult || newResult;	
            });	
            return compareResult;	
        });	
        setMinifiedTreeData(sortedData);	
    };	
    /* Changes END here */

    const calculateRowHeight = (row, gridColumns) => {
        // Minimum height for each row
        let rowHeight = 50;
        if (gridColumns && gridColumns.length > 0 && row) {
            // Get properties of a row
            const { original, isExpanded } = row;
            // Find the column with maximum width configured, from grid columns list
            const columnWithMaxWidth = [...gridColumns].sort((a, b) => {
                return b.width - a.width;
            })[0];
            // Get column properties including the user resized column width (totalFlexWidth)
            const { id, width, totalFlexWidth } = columnWithMaxWidth;
            // Get row value of that column
            const rowValue = original[id];
            if (rowValue) {
                // Find the length of text of data in that column
                const textLength = Object.values(rowValue).join(",").length;
                // This is a formula that was created for the test data used.
                rowHeight += Math.ceil((80 * textLength) / totalFlexWidth);
                const widthVariable =
                    totalFlexWidth > width
                        ? totalFlexWidth - width
                        : width - totalFlexWidth;
                rowHeight += widthVariable / 1000;
            }
            // Add logic to increase row height if row is expanded
            if (isExpanded && passColumnToExpand && columnToExpand) {
                // Increase height based on the number of inner cells in additional columns
                rowHeight +=
                    columnToExpand.innerCells &&
                    columnToExpand.innerCells.length > 0
                        ? columnToExpand.innerCells.length * 35
                        : 35;
            }
        }
        return rowHeight;
    };

    const onRowUpdate = (originalRow, updatedRow) => {
        setChildTableData((old) =>
            old.map((row) => {
                let newRow = row;
                if (
                    Object.entries(row).toString() ===
                    Object.entries(originalRow).toString()
                ) {
                    newRow = updatedRow;
                }
                return newRow;
            })
        );
        setOriginalGridData((old) =>
            old.map((row) => {
                let newRow = row;
                if (
                    Object.entries(row).toString() ===
                    Object.entries(originalRow).toString()
                ) {
                    newRow = updatedRow;
                }
                return newRow;
            })
        );
    };

    const onRowDelete = (originalRow) => {
        setChildTableData((old) =>
            old.filter((row) => {
                return row !== originalRow;
            })
        );
        setOriginalGridData((old) =>
            old.filter((row) => {
                return row !== originalRow;
            })
        );
        if (paginationType === "index") {
            setIndexPageInfo({
                ...indexPageInfo,
                total: indexPageInfo.total - 1
            });
        } else {
            setCursorPageInfo({
                ...cursorPageInfo,
                total: indexPageInfo.total - 1
            });
        }
    };

    const onRowSelect = (selectedRows) => {
        console.log("Rows selected: ");
        console.log(selectedRows);
        if (passIdAttribute) {
            setUserSelectedRows(selectedRows);
        }
    };

    const onGridRefresh = () => {
        console.log("Grid Refrehsed ");
    };

    const bindRowEditOverlay = (rowData) => {
        setRowDataToEdit(rowData);
        setIsEditOverlayOpened(true);
    };
    const unbindRowEditOverlay = () => {
        setRowDataToEdit(null);
        setIsEditOverlayOpened(false);
    };

    const bindRowDeleteOverlay = (rowData) => {
        setRowDataToDelete(rowData);
        setIsDeleteOverlayOpened(true);
    };
    const unbindRowDeleteOverlay = () => {
        setRowDataToDelete(null);
        setIsDeleteOverlayOpened(false);
    };

    const rowActions = (rowData, closeOverlay) => {
        return (
            <RowAction
                rowData={rowData}
                closeOverlay={closeOverlay}
                bindRowEditOverlay={bindRowEditOverlay}
                bindRowDeleteOverlay={bindRowDeleteOverlay}
            />
        );
    };

    const loadMoreData = (updatedPageInfo) => {
        const info = { ...updatedPageInfo };
        if (info.endCursor) {
            info.endCursor += info.pageSize;
        }
        fetchData(info).then((data) => {
            if (data && data.length > 0) {
                setGridData(getSortedData(gridData.concat(data), sortOptions));
                setOriginalGridData(originalGridData.concat(data));
                if (paginationType === "index") {
                    setIndexPageInfo({
                        ...indexPageInfo,
                        pageNum: updatedPageInfo.pageNum
                    });
                } else {
                    setCursorPageInfo({
                        ...cursorPageInfo,
                        endCursor: info.endCursor
                    });
                }
            } else if (paginationType === "index") {
                setIndexPageInfo({
                    ...indexPageInfo,
                    pageNum: updatedPageInfo.pageNum,
                    lastPage: true
                });
            } else {
                setCursorPageInfo({
                    ...cursorPageInfo,
                    endCursor: info.endCursor,
                    lastPage: true
                });
            }
        });
    };

    const serverSideSorting = (groupSortOptions) => {
        console.log("Server side sort", groupSortOptions);
        if (groupSortOptions && groupSortOptions.length > 0) {
            setSortOptions(groupSortOptions);
            setGridData(getSortedData([...gridData], groupSortOptions));
        } else {
            setSortOptions([]);
            setGridData(originalGridData);
        }
    };

    useEffect(() => {
        const pageInfo =
            paginationType === "index" ? indexPageInfo : cursorPageInfo;
        fetchData(pageInfo).then((data) => {
            if (data && data.length > 0) {
                setGridData(data);
                setOriginalGridData(data);
            } else if (paginationType === "index") {
                setIndexPageInfo({
                    ...indexPageInfo,
                    lastPage: true
                });
            } else {
                setCursorPageInfo({
                    ...cursorPageInfo,
                    lastPage: true
                });
            }
        });
        const mappedOriginalColumns = originalColumns.map((column) => {
            const updatedColumn = column;
            if (!enableGroupHeaders && column.groupHeader) {
                delete updatedColumn.groupHeader;
            }
            if (!enableJsxHeaders && column.title) {
                // We know that jsx Header is been provided only for Flight column
                // Hence update the Header value to string "Flight" and delete title
                updatedColumn.Header = "Flight";
                delete updatedColumn.title;
            }
            return updatedColumn;
        });
        setColumns(mappedOriginalColumns);
        if (rowsForSelection && rowsForSelection.length > 0) {
            setRowsToSelect(rowsForSelection);
        }
    }, []);

    const removeRowSelection = (event) => {
        const rowId = event.currentTarget.dataset.id;
        setRowsToDeselect([Number(rowId)]);
    };

    const theme = "portal";

    const gridPageInfo =
        paginationType === "index" ? indexPageInfo : cursorPageInfo;

    const getRowInfo = (rowData) => {
         // const { travelId } = rowData;
        return {
            isRowExpandable: true,
            className: ""
        };
    };

    if (gridData && gridData.length > 0 && columns && columns.length > 0) {
        return (
            <div className={passTheme ? "sample-bg" : ""}>
                <div className="selectedRows">
                    {userSelectedRows.map((row) => {
                        return (
                            <div className="selectedRow" key={row.travelId}>
                                <p>Travel Id : {row.travelId}</p>
                                <button
                                    type="button"
                                    onClick={removeRowSelection}
                                    data-id={row.travelId}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                </div>
                {isEditOverlayOpened && rowDataToEdit !== null ? (
                    <div className="overlay">
                        <RowEdit
                            rowData={rowDataToEdit}
                            airportCodeList={airportCodeList}
                            onRowUpdate={onRowUpdate}
                            unbindRowEditOverlay={unbindRowEditOverlay}
                        />
                    </div>
                ) : null}
                {isDeleteOverlayOpened && rowDataToDelete !== null ? (
                    <div className="overlay">
                        <RowDelete
                            rowData={rowDataToDelete}
                            onRowDelete={onRowDelete}
                            unbindRowDeleteOverlay={unbindRowDeleteOverlay}
                        />
                    </div>
                ) : null}
                <Grid
                    className={className}
                    theme={passTheme ? theme : null}
                    title={title}
                    gridHeight={gridHeight}
                    gridWidth={gridWidth}
 		    gridData={	
                        miniGridList === undefined	
                            ? []	
                            : miniGridList.miniRowsList	
                    }	
                    rowsToOverscan={rowsToOverscan}
                    idAttribute={passIdAttribute ? idAttribute : ""}
                    paginationType={hasPagination ? paginationType : null}
                    pageInfo={hasPagination ? gridPageInfo : null}
		    loadMoreData={()=>loadMoreData}
                    serverSideSorting={
                        enableServersideSorting ? serverSideSorting : null
                    }
                    columns={columns}
                    columnToExpand={passColumnToExpand ? columnToExpand : null}
                    rowActions={passRowActions ? rowActions : null}
                    calculateRowHeight={calculateRowHeight}
                    expandableColumn={expandableColumn}
                    onRowUpdate={onRowUpdate}
                    onRowSelect={onRowSelect}
                    getRowInfo={passGetRowInfo ? getRowInfo : null}
                    onGridRefresh={passOnGridRefresh ? onGridRefresh : null}
                    CustomPanel={CustomPanel}
                    rowsToSelect={rowsToSelect}
                    rowsToDeselect={rowsToDeselect}
                    multiRowSelection={multiRowSelection}
                    gridHeader={gridHeader}
                    rowSelector={rowSelector}
                    globalSearch={globalSearch}
                    columnFilter={columnFilter}
                    groupSort={groupSort}
                    columnChooser={columnChooser}
                    exportData={exportData}
 		    onClickDivMainTree={onClickDivMainTree}
                    minifiedTreeData={minifiedTreeData}	
                    loadMoreRecords={loadMoreRecords}	
                    sortDataMethod={sortDataMethod}	
		    childTableData={childTableData}	
                    //  miniGridList={miniGridList}
                />
            </div>
        );
    }
    return (
        <h2 style={{ textAlign: "center", marginTop: "70px" }}>
            Initializing Grid...
        </h2>
    );
};

export default GridComponent;
