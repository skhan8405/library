import React from "react";

import ColumnItem from "../src/Overlays/managecolumns/columnItem";

const managedColumns = [
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
        Header: "SR",
        accessor: "sr",
        width: 90,
        columnId: "column_8",
        displayInExpandedRegion: false
    }
];

const data = {
    id: 1,
    Header: "Flight",
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
};

const originalInnerCells = [
    {
        Header: "Flight No",
        accessor: "flightno"
    },
    {
        Header: "Date",
        accessor: "date"
    }
];

const findColumn = (columnId) => {
    const column = mockOriginalColumns.filter(
        (c) => `${c.columnId}` === columnId
    )[0];
    return {
        column,
        index: mockOriginalColumns.indexOf(column)
    };
};

const moveColumn = (columnId, atIndex) => {
    const { column, index } = findColumn(columnId);
    // updateColumnsInState(
    //     update(mockOriginalColumns, {
    //         $splice: [
    //             [index, 1],
    //             [atIndex, 0, column]
    //         ]
    //     })
    // );
};

export default {
    title: "ColumnItem",
    component: ColumnItem,
    includeStories: ["SimpleStory"]
};

export const SimpleStory = () => (
    <ColumnItem
        key={1}
        id={1}
        Header={"Flight"}
        moveColumn={moveColumn}
        findColumn={findColumn}
        originalInnerCells={originalInnerCells}
        // isInnerCellSelected={isInnerCellSelected}
        // selectInnerCells={selectInnerCells}
    />
);
