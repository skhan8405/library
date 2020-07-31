import React, { useRef } from "react";
import Grid from "grid";
import { isInnerCellShown, isInnerCellsNotEmpty } from "./utils/CellDisplayUtility";
import { fetchData } from "./getData";
import DeletePopUpOverLay from "./cells/DeletePopUpOverlay";
import RowEditOverlay from "./cells/RowEditOverlay";
import SREdit from "./cells/SREdit";
import FlightEdit from "./cells/FlightEdit";
import SegmentEdit from "./cells/SegmentEdit";

const App = () => {
    //Check if device is desktop
    const isDesktop = window.innerWidth > 1024;

    //Get grid height value, which is a required value
    const gridHeight = "80vh";

    //Get grid width value
    const gridWidth = "100%";

    //For call back functions from component
    const childRef = useRef();

    //Create an array of airports
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

    //Configure columns and its related functions
    let columns = [
        {
            Header: "Id",
            accessor: "travelId",
            disableFilters: true,
            width: 50
        },
        {
            Header: "Flight",
            accessor: "flight",
            width: 100,
            innerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno"
                },
                {
                    Header: "Date",
                    accessor: "date"
                }
            ],
            Cell: (row) => {
                const columnId = "flight";
                const { innerCells } = row.column;
                const { index, original } = row.row;
                return (
                    <FlightEdit
                        index={index}
                        columnId={columnId}
                        innerCells={innerCells}
                        columnValue={original[columnId]}
                        updateCellData={updateCellData}
                        isInnerCellShown={isInnerCellShown}
                        isInnerCellsNotEmpty={isInnerCellsNotEmpty}
                    />
                );
            },
            sortValue: "flightno"
        },
        {
            Header: "Segment",
            accessor: "segment",
            width: 100,
            innerCells: [
                {
                    Header: "From",
                    accessor: "from"
                },
                {
                    Header: "To",
                    accessor: "to"
                }
            ],
            disableSortBy: true,
            Cell: (row) => {
                const segmentColumn = "segment";
                const weightColumn = "weight";
                const { innerCells } = row.column;
                const { index, original } = row.row;
                return (
                    <SegmentEdit
                        airportCodeList={airportCodeList}
                        index={index}
                        segmentId={segmentColumn}
                        segmentValue={original[segmentColumn]}
                        weightId={weightColumn}
                        weightValue={original[weightColumn]}
                        innerCells={innerCells}
                        updateCellData={updateCellData}
                        isInnerCellShown={isInnerCellShown}
                        isInnerCellsNotEmpty={isInnerCellsNotEmpty}
                    />
                );
            }
        },
        {
            Header: "Details",
            accessor: "details",
            width: 300,
            innerCells: [
                {
                    Header: "Flight Model",
                    accessor: "flightModel"
                },
                {
                    Header: "Body Type",
                    accessor: "bodyType"
                },
                {
                    Header: "Type",
                    accessor: "type"
                },
                {
                    Header: "Start Time",
                    accessor: "startTime"
                },
                {
                    Header: "End Time",
                    accessor: "endTime"
                },
                {
                    Header: "Status",
                    accessor: "status"
                },
                {
                    Header: "Additional Status",
                    accessor: "additionalStatus"
                },
                {
                    Header: "Time Status",
                    accessor: "timeStatus"
                }
            ],
            disableSortBy: true,
            Cell: (row) => {
                const { innerCells } = row.column;
                const { startTime, endTime, status, additionalStatus, flightModel, bodyType, type, timeStatus } = row.value;
                let timeStatusArray = timeStatus.split(" ");
                const timeValue = timeStatusArray.shift();
                const timeText = timeStatusArray.join(" ");
                return (
                    <div className="details-wrap content">
                        <ul>
                            {isInnerCellShown(innerCells, "startTime") || isInnerCellShown(innerCells, "endTime") ? (
                                <>
                                    <li>
                                        {isInnerCellShown(innerCells, "startTime") ? startTime + " - " : null}
                                        {isInnerCellShown(innerCells, "endTime") ? endTime : null}
                                    </li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "status") ? (
                                <>
                                    <li>
                                        <span>{isInnerCellShown(innerCells, "status") ? status : null}</span>
                                    </li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "additionalStatus") ? (
                                <>
                                    <li>{additionalStatus}</li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "flightModel") ? (
                                <>
                                    <li>{flightModel}</li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "bodyType") ? (
                                <>
                                    <li>{bodyType}</li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "type") ? (
                                <>
                                    <li>
                                        <span>{type}</span>
                                    </li>
                                    <li className="divider">|</li>
                                </>
                            ) : null}
                            {isInnerCellShown(innerCells, "timeStatus") ? (
                                <>
                                    <li>
                                        <strong>{timeValue} </strong>
                                        <span>{timeText}</span>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                    </div>
                );
            }
        },
        {
            Header: "Weight",
            accessor: "weight",
            width: 130,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            Cell: (row) => {
                const { innerCells } = row.column;
                const { percentage, value } = row.value;
                return (
                    <div className="weight-details content">
                        {isInnerCellShown(innerCells, "percentage") ? <strong className="per">{percentage}</strong> : null}
                        {isInnerCellShown(innerCells, "value") ? (
                            <span>
                                <strong>{value.split("/")[0]}/</strong>
                                {value.split("/")[1]}
                            </span>
                        ) : null}
                    </div>
                );
            },
            sortValue: "percentage"
        },
        {
            Header: "Volume",
            accessor: "volume",
            width: 100,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            Cell: (row) => {
                const { innerCells } = row.column;
                const { percentage, value } = row.value;
                return (
                    <div className="weight-details content">
                        {isInnerCellShown(innerCells, "percentage") ? <strong className="per">{percentage}</strong> : null}
                        {isInnerCellShown(innerCells, "value") ? (
                            <span>
                                <strong>{value.split("/")[0]}/</strong>
                                {value.split("/")[1]}
                            </span>
                        ) : null}
                    </div>
                );
            },
            sortValue: "percentage"
        },
        {
            Header: "ULD Positions",
            accessor: "uldPositions",
            disableSortBy: true,
            width: 100,
            innerCells: [
                {
                    Header: "Position",
                    accessor: "position"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            Cell: (row) => {
                const { innerCells } = row.column;
                return (
                    <div className="uld-details content">
                        {isInnerCellsNotEmpty(innerCells) ? (
                            <ul>
                                {row.value.map((positions, index) => {
                                    return (
                                        <li key={index}>
                                            {isInnerCellShown(innerCells, "position") ? <span>{positions.position}</span> : null}
                                            {isInnerCellShown(innerCells, "value") ? <strong>{positions.value}</strong> : null}
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : null}
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
                    accessor: "revenue"
                },
                {
                    Header: "Yeild",
                    accessor: "yeild"
                }
            ],
            Cell: (row) => {
                const { innerCells } = row.column;
                const { revenue, yeild } = row.value;
                return (
                    <div className="revenue-details content">
                        {isInnerCellShown(innerCells, "revenue") ? <span className="large">{revenue}</span> : null}
                        {isInnerCellShown(innerCells, "yeild") ? <span>{yeild}</span> : null}
                    </div>
                );
            },
            sortValue: "revenue"
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            Cell: (row) => {
                const columnId = "sr";
                const { index, original } = row.row;
                return (
                    <SREdit index={index} columnId={columnId} columnValue={original[columnId]} updateCellData={updateCellData} />
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
                    accessor: "sr"
                },
                {
                    Header: "Volume",
                    accessor: "volume"
                }
            ],
            disableSortBy: true,
            Cell: (row) => {
                const { innerCells } = row.column;
                const { sr, volume } = row.value;
                return (
                    <div className="queued-details content">
                        <span>{isInnerCellShown(innerCells, "sr") ? <strong>{sr}</strong> : null}</span>
                        {isInnerCellShown(innerCells, "volume") ? (
                            <span>
                                <strong>{volume}</strong>
                            </span>
                        ) : null}
                    </div>
                );
            }
        }
    ];

    //Remove columns (that should be displayed in expanded view) if device is not desktop
    if (!isDesktop) {
        columns = columns.filter((item) => {
            return item.accessor !== "details";
        });
    }

    //Configure data to be displayed in expanded view (separate configurations for desktop and other devices)
    const additionalColumn = {
        Header: "Remarks",
        innerCells: isDesktop
            ? null
            : [
                  { Header: "Remarks", accessor: "remarks" },
                  { Header: "Details", accessor: "details" }
              ],
        Cell: (row, column) => {
            const { innerCells } = column;
            const { remarks, details } = row.original;
            if (isDesktop) {
                return remarks;
            } else {
                const { startTime, endTime, status, additionalStatus, flightModel, bodyType, type, timeStatus } = details;
                let timeStatusArray = timeStatus.split(" ");
                const timeValue = timeStatusArray.shift();
                const timeText = timeStatusArray.join(" ");
                return (
                    <div className="details-wrap content">
                        {isInnerCellShown(innerCells, "remarks") ? (
                            <ul>
                                <li>{remarks}</li>
                                <li className="divider">|</li>
                            </ul>
                        ) : null}
                        {isInnerCellShown(innerCells, "details") ? (
                            <ul>
                                <li>
                                    {startTime} – {endTime}
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
                        ) : null}
                    </div>
                );
            }
        }
    };

    //Add logic to calculate height of each row, based on the content of  or more columns
    const calculateRowHeight = (row, gridColumns) => {
        //Minimum height for each row
        let rowHeight = 50;
        if (gridColumns && gridColumns.length > 0 && row) {
            //Get properties of a row
            const { original, isExpanded } = row;
            //Find the column with maximum width configured, from grid columns list
            const columnWithMaxWidth = [...gridColumns].sort((a, b) => {
                return b.width - a.width;
            })[0];
            //Get column properties including the user resized column width (totalFlexWidth)
            const { id, width, totalFlexWidth } = columnWithMaxWidth;
            //Get row value of that column
            const rowValue = original[id];
            if (rowValue) {
                //Find the length of text of data in that column
                const textLength = Object.values(rowValue).join(",").length;
                //This is a formula that was created for the test data used.
                rowHeight = rowHeight + Math.ceil((75 * textLength) / totalFlexWidth);
                const widthVariable = totalFlexWidth > width ? totalFlexWidth - width : width - totalFlexWidth;
                rowHeight = rowHeight + widthVariable / 1000;
            }
            //Add logic to increase row height if row is expanded
            if (isExpanded) {
                //Increase height based on the number of inner cells in additional columns
                rowHeight =
                    rowHeight +
                    (additionalColumn.innerCells && additionalColumn.innerCells.length > 0
                        ? additionalColumn.innerCells.length * 35
                        : 35);
            }
        }
        return rowHeight;
    };

    //Gets called when there is a cell edit
    const updateCellData = (rowIndex, columnId, value) => {
        console.log(rowIndex + " " + columnId + " " + JSON.stringify(value));
        childRef.current.updateCellInGrid(rowIndex, columnId, value);
    };

    //Gets called when there is a row edit
    const updateRowData = (row) => {
        console.log("Row updated: ");
        console.log(row);
    };

    const deleteRowData = (row) => {
        console.log("Row deleted: ");
        console.log(row);
    };

    //Gets called when row bulk edit is done
    const selectBulkData = (selectedRows) => {
        console.log("Rows selected: ");
        console.log(selectedRows);
    };

    return (
        <Grid
            ref={childRef}
            title="AWBs"
            gridHeight={gridHeight}
            gridWidth={gridWidth}
            columns={columns}
            additionalColumn={additionalColumn}
            fetchData={fetchData}
            rowEditOverlay={RowEditOverlay}
            rowEditData={{
                airportCodeList: airportCodeList
            }}
            updateRowData={updateRowData}
            deletePopUpOverLay={DeletePopUpOverLay}
            deleteRowData={deleteRowData}
            selectBulkData={selectBulkData}
            calculateRowHeight={calculateRowHeight}
        />
    );
};

export default App;
