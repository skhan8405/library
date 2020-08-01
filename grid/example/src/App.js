import React, { useRef } from "react";
import Grid from "grid";
import { isInnerCellShown, isInnerCellsNotEmpty } from "./utils/CellDisplayUtility";
import { fetchData } from "./getData";
import FlightEdit from "./cells/FlightEdit";
import getDateValue from "./utils/DateUtility";
import DeletePopUpOverLay from "./cells/DeletePopUpOverlay";
import RowEditOverlay from "./cells/RowEditOverlay";
import SREdit from "./cells/SREdit";
import SegmentEdit from "./cells/SegmentEdit";

const App = () => {
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
            width: 50,
            disableFilters: true
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
            sortValue: "flightno",
            displayCell: (rowData) => {
                const { flightno, date } = rowData.flight;
                return (
                    <div className="flight-details">
                        <strong>{flightno}</strong>
                        <span>{getDateValue(date, "cell")}</span>
                    </div>
                );
            },
            editCell: (rowData) => {
                return <FlightEdit rowData={rowData} />;
            }
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
            onlyInDesktop: true,
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
            displayCell: (rowData) => {
                const { startTime, endTime, status, additionalStatus, flightModel, bodyType, type, timeStatus } = rowData.details;
                const timeStatusArray = timeStatus ? timeStatus.split(" ") : [];
                const timeValue = timeStatusArray.shift();
                const timeText = timeStatusArray.join(" ");
                return (
                    <div className="details-wrap">
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
            sortValue: "percentage",
            displayCell: (rowData) => {
                const { percentage, value } = rowData.weight;
                const splitValue = value ? value.split("/") : [];
                let valuePrefix,
                    valueSuffix = "";
                if (splitValue.length === 2) {
                    valuePrefix = splitValue[0];
                    valueSuffix = splitValue[1];
                }
                return (
                    <div className="weight-details">
                        <strong className="per">{percentage}</strong>
                        {value ? (
                            <span>
                                <strong>{valuePrefix}/</strong>
                                {valueSuffix}
                            </span>
                        ) : null}
                    </div>
                );
            }
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
            sortValue: "percentage",
            displayCell: (rowData) => {
                const { percentage, value } = rowData.volume;
                const splitValue = value ? value.split("/") : [];
                let valuePrefix,
                    valueSuffix = "";
                if (splitValue.length === 2) {
                    valuePrefix = splitValue[0];
                    valueSuffix = splitValue[1];
                }
                return (
                    <div className="weight-details">
                        <strong className="per">{percentage}</strong>
                        {value ? (
                            <span>
                                <strong>{valuePrefix}/</strong>
                                {valueSuffix}
                            </span>
                        ) : null}
                    </div>
                );
            }
        },
        {
            Header: "ULD Positions",
            accessor: "uldPositions",
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
            disableSortBy: true,
            displayCell: (rowData) => {
                const { uldPositions } = rowData;
                return (
                    <div className="uld-details">
                        <ul>
                            {uldPositions.map((positions, index) => {
                                return (
                                    <li key={index}>
                                        <span>{positions.position}</span>
                                        <strong>{positions.value}</strong>
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
                    accessor: "revenue"
                },
                {
                    Header: "Yeild",
                    accessor: "yeild"
                }
            ],
            displayCell: (rowData) => {
                const { revenue, yeild } = rowData.revenue;
                return (
                    <div className="revenue-details">
                        <span className="large">{revenue}</span>
                        <span>{yeild}</span>
                    </div>
                );
            },
            sortValue: "revenue"
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            displayCell: (rowData) => {
                const { sr } = rowData;
                return (
                    <div className="sr-details">
                        <span>{sr}</span>
                    </div>
                );
            },
            editCell: (rowData) => {
                return <SREdit rowData={rowData} />;
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
            displayCell: (rowData) => {
                const { sr, volume } = rowData.queuedBooking;
                return (
                    <div className="queued-details">
                        <span>
                            <strong>{sr}</strong>
                        </span>
                        <span>
                            <strong>{volume}</strong>
                        </span>
                    </div>
                );
            }
        }
    ];

    //Configure data to be displayed in expanded view (separate configurations for desktop and other devices)
    const columnToExpand = {
        Header: "Remarks",
        innerCells: [
            { Header: "Remarks", accessor: "remarks" },
            { Header: "Details", onlyInIpad: true, accessor: "details" }
        ],
        displayCell: (rowData) => {
            const { remarks, details } = rowData;
            const { startTime, endTime, status, additionalStatus, flightModel, bodyType, type, timeStatus } = details
                ? details
                : {};
            const timeStatusArray = timeStatus ? timeStatus.split(" ") : [];
            const timeValue = timeStatusArray.shift();
            const timeText = timeStatusArray.join(" ");
            return (
                <div className="details-wrap">
                    <ul>
                        <li>{remarks}</li>
                        <li className="divider">|</li>
                    </ul>
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
                </div>
            );
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
            if (isExpanded && columnToExpand) {
                //Increase height based on the number of inner cells in additional columns
                rowHeight =
                    rowHeight +
                    (columnToExpand.innerCells && columnToExpand.innerCells.length > 0
                        ? columnToExpand.innerCells.length * 35
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
            gridHeight="80vh"
            gridWidth="100%"
            columns={columns}
            columnToExpand={columnToExpand}
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
