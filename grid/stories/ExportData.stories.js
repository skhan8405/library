import React from "react";

import ExportData from "../src/Overlays/exportdata";

const mockAdditionalColumn = [
    {
        Header: "Remarks",
        innerCells: [
            {
                Header: "Remarks",
                accessor: "remarks"
            },
            {
                Header: "ULD Positions",
                accessor: "uldPositions"
            },
            {
                Header: "Flight",
                accessor: "flight"
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
                Header: "ULD Positions",
                accessor: "uldPositions"
            },
            {
                Header: "Flight",
                accessor: "flight"
            }
        ]
    }
];

const mockColumns = [
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
const mockRows = [
    {
        id: "0",
        original: {
            travelId: 0,
            flight: {
                flightno: "XX2225",
                date: "31-Aug-2016"
            },
            uldPositions: [
                {
                    position: "L3",
                    value: "7/6"
                },
                {
                    position: "Q2",
                    value: "5/1"
                },
                {
                    position: "L8",
                    value: "5/9"
                },
                {
                    position: "Q7",
                    value: "1/9"
                }
            ],
            sr: "74/ AWBs",
            remarks: "Enim aute magna ipsum magna"
        },
        index: 0,
        depth: 0,
        cells: [{}],
        values: {
            travelId: 0,
            flight: {
                flightno: "XX2225",
                date: "31-Aug-2016"
            },
            uldPositions: [
                {
                    position: "L3",
                    value: "7/6"
                },
                {
                    position: "Q2",
                    value: "5/1"
                },
                {
                    position: "L8",
                    value: "5/9"
                },
                {
                    position: "Q7",
                    value: "1/9"
                }
            ],
            sr: "74/ AWBs",
            remarks: "Enim aute magna ipsum magna"
        },
        originalSubRows: [],
        subRows: [],
        canExpand: false,
        isSelected: false,
        isSomeSelected: false
    },
    {
        id: "1",
        original: {
            travelId: 1,
            flight: {
                flightno: "XX6983",
                date: "23-May-2016"
            },
            uldPositions: [
                {
                    position: "L3",
                    value: "7/6"
                },
                {
                    position: "Q2",
                    value: "5/1"
                },
                {
                    position: "L8",
                    value: "5/9"
                },
                {
                    position: "Q7",
                    value: "1/9"
                }
            ],
            sr: "84/ AWBs",
            remarks: "Enim aute magna ipsum magna"
        },
        index: 1,
        depth: 0,
        cells: [{}],
        values: {
            travelId: 1,
            flight: {
                flightno: "XX6983",
                date: "23-May-2016"
            },
            uldPositions: [
                {
                    position: "L3",
                    value: "7/6"
                },
                {
                    position: "Q2",
                    value: "5/1"
                },
                {
                    position: "L8",
                    value: "5/9"
                },
                {
                    position: "Q7",
                    value: "1/9"
                }
            ],
            sr: "84/ AWBs",
            remarks: "Enim aute magna ipsum magna"
        },
        originalSubRows: [],
        subRows: [],
        canExpand: false,
        isSelected: false,
        isSomeSelected: false
    }
];

export default {
    title: "ExportData",
    component: ExportData
    // includeStories: ["IsExportOverlayOpen"]
};
export const IsExportOverlayOpen = () => (
    <ExportData isExportOverlayOpen={true} />
);

// export const IsExportOverlayOpen = () => (
//     <ExportData
//         isExportOverlayOpen
//         rows={mockRows}
//         originalColumns={mockOriginalColumns}
//         columns={mockColumns}
//         isRowExpandEnabled
//         isExpandContentAvailable
//         additionalColumn={[mockAdditionalColumn]}
//     />
// );
