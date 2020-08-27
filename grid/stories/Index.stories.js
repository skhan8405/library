import React from "react";

import Grid from "../src/index";
import { fetchData } from "../example/src/getData";

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
        displayCell: (rowData, DisplayTag) => {
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
        editCell: (rowData, DisplayTag, rowUpdateCallBack) => {
            return <div />;
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
        displayCell: (rowData, DisplayTag) => {
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
        editCell: (rowData, DisplayTag, rowUpdateCallBack) => {
            return <div />;
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
        displayCell: (rowData, DisplayTag) => {
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
            return (
                <div className="details-wrap">
                    <ul>
                        <li>
                            <DisplayTag columnKey="details" cellKey="startTime">
                                {startTime}
                            </DisplayTag>
                            -
                            <DisplayTag columnKey="details" cellKey="endTime">
                                {endTime}
                            </DisplayTag>
                        </li>
                        <li className="divider">|</li>
                        <li>
                            <DisplayTag columnKey="details" cellKey="status">
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
                            <DisplayTag columnKey="details" cellKey="bodyType">
                                {bodyType}
                            </DisplayTag>
                        </li>
                        <li className="divider">|</li>
                        <li>
                            <span>
                                <DisplayTag columnKey="details" cellKey="type">
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
        displayCell: (rowData, DisplayTag) => {
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
        displayCell: (rowData, DisplayTag) => {
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
                accessor: "position"
            },
            {
                Header: "Value",
                accessor: "value"
            }
        ],
        disableSortBy: true,
        displayCell: (rowData, DisplayTag) => {
            const { uldPositions } = rowData;
            return (
                <div className="uld-details">
                    <ul>
                        {uldPositions.map((positions, index) => {
                            return (
                                <li key={index}>
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
                accessor: "revenue"
            },
            {
                Header: "Yeild",
                accessor: "yeild"
            }
        ],
        displayCell: (rowData, DisplayTag) => {
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
        editCell: (rowData, rowUpdateCallBack) => {
            return <div />;
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
        displayCell: (rowData, DisplayTag) => {
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
const rowActions = [
    { label: "Send SCR", value: "SCR" },
    { label: "Segment Summary", value: "SegmentSummary" },
    { label: "Open Summary", value: "OpenSummary" },
    { label: "Close Summary", value: "CloseSummary" }
];
export const rowActionCallback = (rowData, actionValue) => {
    console.log("Row action: " + actionValue);
    console.log(rowData);
};
export const getRowEditOverlay = (rowData, DisplayTag, rowUpdateCallBack) => {
    console.log("Row action: " + DisplayTag);
    console.log(rowData);
    // return (
    //     <RowEdit
    //         airportCodeList={airportCodeList}
    //         DisplayTag={DisplayTag}
    //         rowData={rowData}
    //         rowUpdateCallBack={rowUpdateCallBack}
    //     />
    // );
};
export const calculateRowHeight = (row, gridColumns) => {
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
export const updateRowData = (row) => {
    console.log("Row updated: ");
    console.log(row);
};
export const deleteRowData = (row) => {
    console.log("Row deleted: ");
    console.log(row);
};
export const selectBulkData = (selectedRows) => {
    console.log("Rows selected: ");
    console.log(selectedRows);
};
const data = [
    {
        travelId: 10,
        flight: {
            flightno: "XX2225",
            date: "31-Aug-2016"
        },
        segment: {
            from: "BCC",
            to: "ZZY"
        },
        details: {
            flightModel: 6518,
            bodyType: "Big Body",
            type: "Van",
            startTime: "01:23 (S)",
            endTime: "11:29 (E)",
            status: "To Be Cancelled",
            additionalStatus:
                "Elit est consectetur deserunt et sit officia eu. Qui minim quis exercitation in irure elit velit nisi officia cillum laborum reprehenderit.aliqua ex sint cupidatat non",
            timeStatus: "10:02 hrs to depart"
        },
        weight: {
            percentage: "16%",
            value: "35490/20000 kg"
        },
        volume: {
            percentage: "54%",
            value: "31/60 cbm"
        },
        uldPositions: [
            {
                position: "L1",
                value: "7/9"
            },
            {
                position: "Q1",
                value: "9/3"
            },
            {
                position: "L6",
                value: "8/4"
            },
            {
                position: "Q7",
                value: "4/9"
            }
        ],
        revenue: {
            revenue: "$63,474.27",
            yeild: "$7.90"
        },
        sr: "74/ AWBs",
        queuedBooking: {
            sr: "88/ AWBs",
            volume: "7437 kg / 31 cbm"
        },
        remarks: "Enim aute magna."
    }
];
// const [index, setIndex] = useState(0);
export const loadData = async () => {
    debugger;
    // return await data;
    // setIndex(index + pageSize);
    return await fetchData(1, 10);
};

export default {
    title: "Grid Component",
    component: Grid,
    includeStories: ["MainStory"]
};

const Template = (args) => {
    debugger;
    console.log(args.loadData);
    return (
        <Grid
            title="AWBs"
            gridHeight="80vh"
            gridWidth="100%"
            loadData={loadData}
            columns={columns}
            columnToExpand={columnToExpand}
            // rowActions={rowActions}
            // rowActionCallback={rowActionCallback}
            // getRowEditOverlay={getRowEditOverlay}
            // calculateRowHeight={calculateRowHeight}
            // updateRowData={updateRowData}
            // deleteRowData={deleteRowData}
            // selectBulkData={selectBulkData}
        />
    );
};
// const Template = (args) =>{
//     debugger;
//     console.log({...args})
//     return ({
//     component: Grid,
//     props: {...args},
//     });
// };
export const MainStory = Template.bind({});
MainStory.args = {
    title: "AWBs",
    gridHeight: "80vh",
    gridWidth: "100%",
    columns: columns
    // columnToExpand: columnToExpand
    // rowActions: rowActions
};
// export default {
//     title: "Grid Component",
//     component: Grid,
//     // includeStories: ["MainStory"]
// };

// export const MainStory = () => (
// <Grid
//         title="AWBs"
//         gridHeight="80vh"
//         gridWidth="100%"
//         loadData={loadData}
//         columns={columns}
//         columnToExpand={columnToExpand}
//         rowActions={rowActions}
//         rowActionCallback={rowActionCallback}
//         getRowEditOverlay={getRowEditOverlay}
//         calculateRowHeight={calculateRowHeight}
//         updateRowData={updateRowData}
//         deleteRowData={deleteRowData}
//         selectBulkData={selectBulkData}
//     />
// );
