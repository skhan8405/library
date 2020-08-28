import React from "react";

import Spreadsheet from "../src/index";
import CargoData from "./data.json";

export default {
    title: "Spreadsheet",
    component: Spreadsheet
};

let data = CargoData;

const columns = [
    {
        key: "flightno",
        name: "FlightNo",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "date",
        name: "Date",
        draggable: false,
        editor: "DatePicker",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "segmentfrom",
        name: "Segment From",
        draggable: false,
        editor: "DropDown",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter",
        dataSource: []
    },
    {
        key: "revenue",
        name: "Revenue",
        draggable: false,
        editor: "Text",
        formulaApplicable: true,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "yeild",
        name: "Yeild",
        draggable: false,
        editor: "Text",
        formulaApplicable: true,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "segmentto",
        name: "Segment To",
        draggable: false,
        editor: "DropDown",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter",
        dataSource: []
    },
    {
        key: "flightModel",
        name: "Flight Model",
        draggable: false,
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "numeric"
    },
    {
        key: "bodyType",
        name: "Body Type",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "type",
        name: "Type",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "startTime",
        name: "Start Time",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "endTime",
        name: "End Time",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "status",
        name: "Status",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "additionalStatus",
        name: "Additional Status",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "timeStatus",
        name: "Time Status",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "weightpercentage",
        name: "Weight Percentage",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "weightvalue",
        name: "Weight Value",
        draggable: false,
        editor: "Text",
        formulaApplicable: true,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "volumepercentage",
        name: "Volume Percentage",
        draggable: false,
        editor: "Text",
        formulaApplicable: true,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "volumevalue",
        name: "Volume Value",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "uldposition1",
        name: "uldposition1",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "uldvalue1",
        name: "uldvalue1",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "uldposition2",
        name: "uldposition2",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "uldvalue2",
        name: "uldvalue2",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "uldposition3",
        name: "uldposition3",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    }
];

const pageSize = 10;

const gridHeight = "90vh";

const updateCellData = (fromRow, toRow, value, updateType) => {
    if (updateType === "CELL_UPDATE") {
        console.log(
            "Starting row:",
            fromRow,
            "updated-Value:",
            value,
            "Updation-Type:",
            updateType,
            "Ending Row:",
            toRow
        );
    }
    if (updateType === "CELL_DRAG") {
        console.log(
            "fromRow:",
            fromRow,
            "toRow:",
            toRow,
            "updated-Value:",
            value,
            "Updation-Type:",
            updateType
        );
    }
};

const selectBulkData = (selectedRows) => {
    console.log("selectedRows:", selectedRows);
};

const maxLeftPinnedColumn = 5;

const updatedRows = ({ fromRow, toRow, updated }) => {
    let tempData = [...data];
    const temp = tempData.slice();
    for (let i = fromRow; i <= toRow; i++) {
        temp[i] = {
            ...temp[i],
            ...updated
        };
    }
    data = temp;
    console.log("UpdatedRows:", temp);
};

const Template = (args) => (
    <Spreadsheet
        rows={data.slice(0, pageSize)}
        dataSet={data}
        pageSize={pageSize}
        count={pageSize}
        columns={columns}
        gridHeight={gridHeight}
        updateCellData={updateCellData}
        selectBulkData={selectBulkData}
        maxLeftPinnedColumn={maxLeftPinnedColumn}
        updatedRows={updatedRows}
    />
);

export const MainStory = Template.bind({});
// MainStory.args = {
//     gridHeight: "80vh"
// };
