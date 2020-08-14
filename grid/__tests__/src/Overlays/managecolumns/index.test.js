/* eslint-disable no-undef */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ColumnReordering from "../../../../src/Overlays/managecolumns/index";

describe("ColumnReordering unit test", () => {
    const updateColumnStructure = jest.fn();
    const toggleManageColumns = jest.fn();
    const mockAdditionalColumn = [
        {
            Header: "Remarks",
            innerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                },
                {
                    Header: "Details",
                    onlyInTablet: true,
                    accessor: "details"
                }
            ],
            columnId: "ExpandColumn",
            displayInExpandedRegion: true,
            originalInnerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                },
                {
                    Header: "Details",
                    onlyInTablet: true,
                    accessor: "details"
                }
            ]
        }
    ];

    const mockOriginalColumns = [
        {
            Header: "Id",
            accessor: "travelId",
            width: 50,
            disableFilters: true,
            columnId: "column_0",
            displayInExpandedRegion: false
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
            displayInExpandedRegion: false,
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
            displayInExpandedRegion: false,
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
            columnId: "column_3",
            displayInExpandedRegion: false,
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
            columnId: "column_4",
            displayInExpandedRegion: false,
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
            columnId: "column_5",
            displayInExpandedRegion: false,
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
            columnId: "column_6",
            displayInExpandedRegion: false,
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
            columnId: "column_7",
            displayInExpandedRegion: false
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
            columnId: "column_8",
            displayInExpandedRegion: false,
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
    afterEach(cleanup);
    let container;
    beforeAll(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    it("should render ColumnReordering component", () => {
        const component = render(
            <ColumnReordering
                isManageColumnOpen
                toggleManageColumns={toggleManageColumns}
                originalColumns={mockOriginalColumns}
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
                updateColumnStructure={updateColumnStructure}
            />,
            container
        );
        expect(component).toBeDefined();
    });

    it("should render ColumnReordering search component", () => {
        const { getByTestId } = render(
            <ColumnReordering
                isManageColumnOpen
                toggleManageColumns={toggleManageColumns}
                originalColumns={mockOriginalColumns}
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
                updateColumnStructure={updateColumnStructure}
            />,
            container
        );
        const filterList = getByTestId("filterColumnsList");
        fireEvent.change(filterList, { target: { value: "id" } });
        expect(filterList.value).toBe("id");
    });
});
