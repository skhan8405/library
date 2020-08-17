import React, { useState } from "react";
import Grid from "grid";
import FlightIcon from "./images/FlightIcon.png";
import { fetchData } from "./getData";
import { getValueOfDate } from "./utils/DateUtility";
import FlightEdit from "./cells/FlightEdit";
import SrEdit from "./cells/SrEdit";
import SegmentEdit from "./cells/SegmentEdit";
import RowEdit from "./cells/RowEdit";

const App = () => {
    //#region -- Variable that are specific to example application
    //Find page size required to make API call
    const { search } = window.location;
    const urlPageSize = search
        ? parseInt(search.replace("?pagesize=", ""))
        : NaN;
    const pageSize = !isNaN(urlPageSize) ? urlPageSize : 300;
    //State for holding index value for API call
    const [index, setIndex] = useState(0);
    //#endregion

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

    //Async function that is required by Grid component to load data
    const loadData = async () => {
        setIndex(index + pageSize);
        return await fetchData(index, pageSize);
    };

    //Configure columns and its related functions
    let columns = [
        {
            Header: "AWB Details",
            accessor: "awbId",
            width: 50,
            disableFilters: true
        },
        {
            Header: "Discrepancy",
            accessor: "discrepancy",
            width: 100,
            disableFilters: true
        },
        {
            Header: "Route Details",
            accessor: "routedetails",
            width: 120,
            innerCells: [
                {
                    Header: "Origin",
                    accessor: "Origin"
                },
                {
                    Header: "Destination",
                    accessor: "Destination"
                },                
                {
                    Header: "CarrierFlightNo",
                    accessor: "CarrierFlightNo"
                }
            ],
            disableSortBy: true,
            displayCell: (rowData, DisplayTag) => {
                const { routedetails } = rowData;
                return (
                    <div className="uld-details">
                        <ul>
                            {routedetails.map((routes, index) => {
                                return (
                                    <li key={index}>
                                        <DisplayTag
                                            columnKey="routedetails"
                                            cellKey="Origin"
                                        >
                                            <span>{routes.Origin}</span>
                                        </DisplayTag>
                                        <DisplayTag
                                            columnKey="routedetails"
                                            cellKey="Destination"
                                        >
                                            <strong>{routes.Destination}</strong>
                                        </DisplayTag>
                                        <DisplayTag
                                            columnKey="routedetails"
                                            cellKey="CarrierFlightNo"
                                        >
                                            <strong>{routes.CarrierFlightNo}</strong>
                                        </DisplayTag>
                                    </li>
                                );
                            })}
                        </ul>
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
            { Header: "Details", onlyInTablet: true, accessor: "details" }
        ],
        displayCell: (rowData, DisplayTag) => {
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
            } = details ? details : {};
            const timeStatusArray = timeStatus ? timeStatus.split(" ") : [];
            const timeValue = timeStatusArray.shift();
            const timeText = timeStatusArray.join(" ");
            return (
                <div className="details-wrap">
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

    //Pass row edit overlay to the grid component callback function
    const getRowEditOverlay = (rowData, DisplayTag, rowUpdateCallBack) => {
        return (
            <RowEdit
                airportCodeList={airportCodeList}
                DisplayTag={DisplayTag}
                rowData={rowData}
                rowUpdateCallBack={rowUpdateCallBack}
            />
        );
    };

    //#region -- Configure actions that has to be diplayed in row options overlay and the callback method to be rturned from component
    //Configure additional actions
    const rowActions = [
        { label: "Send SCR", value: "SCR" },
        { label: "Segment Summary", value: "SegmentSummary" },
        { label: "Open Summary", value: "OpenSummary" },
        { label: "Close Summary", value: "CloseSummary" }
    ];
    //Configure row action callback function
    const rowActionCallback = (rowData, actionValue) => {
        console.log("Row action: " + actionValue);
        console.log(rowData);
    };
    //#endregion

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
                rowHeight =
                    rowHeight + Math.ceil((75 * textLength) / totalFlexWidth);
                const widthVariable =
                    totalFlexWidth > width
                        ? totalFlexWidth - width
                        : width - totalFlexWidth;
                rowHeight = rowHeight + widthVariable / 1000;
            }
            //Add logic to increase row height if row is expanded
            if (isExpanded && columnToExpand) {
                //Increase height based on the number of inner cells in additional columns
                rowHeight =
                    rowHeight +
                    (columnToExpand.innerCells &&
                    columnToExpand.innerCells.length > 0
                        ? columnToExpand.innerCells.length * 35
                        : 35);
            }
        }
        return rowHeight;
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
            title="AWBs"
            gridHeight="80vh"
            gridWidth="100%"
            loadData={loadData}
            columns={columns}
            columnToExpand={columnToExpand}
            rowActions={rowActions}
            rowActionCallback={rowActionCallback}
            getRowEditOverlay={getRowEditOverlay}
            calculateRowHeight={calculateRowHeight}
            updateRowData={updateRowData}
            deleteRowData={deleteRowData}
            selectBulkData={selectBulkData}
        />
    );
};

export default App;
