/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import "regenerator-runtime/runtime";

// import Customgrid from './../../../src/Customgrid';
import Customgrid from "../../src/Customgrid";

const gridColumns = [
    {
        Header: "Id",
        accessor: "travelId",
        width: 50,
        disableFilters: true,
        columnId: "column_0"
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
        columnId: "column_1",
        originalInnerCells: [
            {
                Header: "Flight No",
                accessor: "flightno"
            },
            {
                Header: "Date",
                accessor: "date"
            }
        ]
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
        columnId: "column_2",
        originalInnerCells: [
            {
                Header: "From",
                accessor: "from"
            },
            {
                Header: "To",
                accessor: "to"
            }
        ]
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
        columnId: "column_3",
        originalInnerCells: [
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
        ]
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
        columnId: "column_4",
        originalInnerCells: [
            {
                Header: "Percentage",
                accessor: "percentage"
            },
            {
                Header: "Value",
                accessor: "value"
            }
        ]
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
        columnId: "column_5",
        originalInnerCells: [
            {
                Header: "Percentage",
                accessor: "percentage"
            },
            {
                Header: "Value",
                accessor: "value"
            }
        ]
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
        columnId: "column_6",
        originalInnerCells: [
            {
                Header: "Position",
                accessor: "position"
            },
            {
                Header: "Value",
                accessor: "value"
            }
        ]
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
        sortValue: "revenue",
        columnId: "column_7",
        originalInnerCells: [
            {
                Header: "Revenue",
                accessor: "revenue"
            },
            {
                Header: "Yeild",
                accessor: "yeild"
            }
        ]
    },
    {
        Header: "SR",
        accessor: "sr",
        width: 90,
        columnId: "column_8"
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
        columnId: "column_9",
        originalInnerCells: [
            {
                Header: "Sr",
                accessor: "sr"
            },
            {
                Header: "Volume",
                accessor: "volume"
            }
        ]
    }
];

// additionalColumn
const mockAdditionalColumn = {
    Header: "Remarks",
    innerCells: [
        {
            Header: "Remarks",
            accessor: "remarks"
        }
    ],
    columnId: "ExpandColumn",
    originalInnerCells: [
        {
            Header: "Remarks",
            accessor: "remarks"
        }
    ],
    displayCell: jest.fn()
};

const data = [
    {
        travelId: 0,
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
    },
    {
        travelId: 1,
        flight: {
            flightno: "XX6983",
            date: "23-May-2016"
        },
        segment: {
            from: "AAB",
            to: "XXY"
        },
        details: {
            flightModel: 6593,
            bodyType: "Narrow Body",
            type: "Car",
            startTime: "07:48 (A)",
            endTime: "05:36 (E)",
            status: "Active",
            additionalStatus:
                "Elit est dolore nostrud Lorem labore et elit voluptate elit commodo cupidatat. Sint quis dolor laboris sit ipsum aliquip.velit cupidatat tempor laborum cupidatat",
            timeStatus: "09:20 hrs to depart"
        },
        weight: {
            percentage: "76%",
            value: "40966/20000 kg"
        },
        volume: {
            percentage: "94%",
            value: "11/60 cbm"
        },
        uldPositions: [
            {
                position: "L1",
                value: "6/2"
            },
            {
                position: "Q2",
                value: "5/1"
            },
            {
                position: "L6",
                value: "6/4"
            },
            {
                position: "Q5",
                value: "3/7"
            }
        ],
        revenue: {
            revenue: "$77,213.84",
            yeild: "$4.36"
        },
        sr: "84/ AWBs",
        queuedBooking: {
            sr: "36/ AWBs",
            volume: "7692 kg / 78 cbm"
        },
        remarks: "Labore irure."
    }
];

const mockGridHeight = "80vh";
const mockGridWidth = "100%";
const mockTitle = "AWBs";
//  const managableColumns = gridColumns
//  const originalColumns = gridColumns
const mockGetRowEditOverlay = jest.fn();
const mockUpdateRowInGrid = jest.fn();
const mockDeleteRowFromGrid = jest.fn();
const mockGlobalSearchLogic = jest.fn();
const mockSelectBulkData = jest.fn();
const mockCalculateRowHeight = jest.fn();
const mockIsExpandContentAvailable = true;
const mockDisplayExpandedContent = jest.fn();
const mockHasNextPage = true;
const mockIsNextPageLoading = false;
const mockLoadNextPage = jest.fn();
const mockDoGroupSort = jest.fn();

describe("render CustomgridCustomgrid", () => {
    it("should render Customgrid", () => {
        const { container } = render(
            <Customgrid
                title={mockTitle}
                gridHeight={mockGridHeight}
                gridWidth={mockGridWidth}
                managableColumns={gridColumns}
                originalColumns={gridColumns}
                additionalColumn={mockAdditionalColumn}
                data={data}
                getRowEditOverlay={mockGetRowEditOverlay}
                updateRowInGrid={mockUpdateRowInGrid}
                deleteRowFromGrid={mockDeleteRowFromGrid}
                globalSearchLogic={mockGlobalSearchLogic}
                selectBulkData={mockSelectBulkData}
                calculateRowHeight={mockCalculateRowHeight}
                isExpandContentAvailable={mockIsExpandContentAvailable}
                displayExpandedContent={mockDisplayExpandedContent}
                hasNextPage={mockHasNextPage}
                isNextPageLoading={mockIsNextPageLoading}
                loadNextPage={mockLoadNextPage}
                doGroupSort={mockDoGroupSort}
            />
        );

        const component1 = container.querySelector(
            "[data-testid='toggleColumnFilter']"
        );
        const component2 = container.querySelector(
            "[data-testid='bulkSelector']"
        );
        const component3 = container.querySelector(
            "[data-testid='toggleGroupSortOverLay']"
        );
        const component4 = container.querySelector(
            "[data-testid='toggleManageColumns']"
        );
        const component5 = container.querySelector(
            "[data-testid='toggleExportDataOverlay']"
        );
        act(() => {
            component1.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
            component2.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
            component3.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
            component4.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
            component5.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
    });
});
