import React from "react";

import ColumnsList from "../src/Overlays/managecolumns/columnsList";

export default {
    title: "ColumnsList",
    component: ColumnsList
};

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

const Template = (args) => <ColumnsList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    columnsToManage: { managedColumns }
};
