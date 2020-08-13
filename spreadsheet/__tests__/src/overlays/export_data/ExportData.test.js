import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import {
    render,
    screen,
    fireEvent,
    getByRole,
    querySelector
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from '@testing-library/react'
import ExportData from "../../../../src/overlays/export_data/ExportData";
import { element } from "prop-types";
import { iteratee } from "lodash";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const rows = [
    {
        "travelId": 0,
        "flightno": "XX6576",
        "date": "2015-05-01",
        "segmentfrom": "ABC",
        "segmentto": "ZYY",
        "flightModel": 115,
        "bodyType": "Small Body",
        "type": "Car",
        "startTime": "03:34 (A)",
        "endTime": "03:05 (S)",
        "status": "To Be Cancelled",
        "additionalStatus": "",
        "timeStatus": "04:58|hrs to depart",
        "weightpercentage": "65%",
        "weightvalue": "52098/20000 kg",
        "volumepercentage": "32%",
        "volumevalue": "33/60 cbm",
        "uldposition1": "L4",
        "uldvalue1": "6/1",
        "uldposition2": "Q4",
        "uldvalue2": "2/7",
        "uldposition3": "L8",
        "uldvalue3": "7/5",
        "uldposition4": "Q8",
        "uldvalue4": "3/2",
        "revenue": "$60,485.33",
        "yeild": "$6.28",
        "sr": "52/ AWBs",
        "queuedBookingSR": "23/ AWBs",
        "queuedBookingvolume": "8023 kg / 35 cbm"
    },
    {
        "travelId": 1,
        "flightno": "XX5177",
        "date": "2018-02-09",
        "segmentfrom": "CCC",
        "segmentto": "YXZ",
        "flightModel": 197,
        "bodyType": "Small Body",
        "type": "Van",
        "startTime": "01:23 (E)",
        "endTime": "12:31 (E)",
        "status": "Cancelled",
        "additionalStatus": "Arrived",
        "timeStatus": "12:57|hrs to depart",
        "weightpercentage": "37%",
        "weightvalue": "49689/20000 kg",
        "volumepercentage": "47%",
        "volumevalue": "49/60 cbm",
        "uldposition1": "L3",
        "uldvalue1": "1/1",
        "uldposition2": "Q2",
        "uldvalue2": "3/4",
        "uldposition3": "L6",
        "uldvalue3": "8/1",
        "uldposition4": "Q6",
        "uldvalue4": "4/2",
        "revenue": "$62,830.60",
        "yeild": "$8.39",
        "sr": "34/ AWBs",
        "queuedBookingSR": "75/ AWBs",
        "queuedBookingvolume": "8893 kg / 43 cbm"
    },
    {
        "travelId": 2,
        "flightno": "XX7883",
        "date": "2017-12-14",
        "segmentfrom": "BCB",
        "segmentto": "XYZ",
        "flightModel": 244,
        "bodyType": "Small Body",
        "type": "Van",
        "startTime": "12:29 (S)",
        "endTime": "10:34 (A)",
        "status": "Cancelled",
        "additionalStatus": "",
        "timeStatus": "04:04|hrs to depart",
        "weightpercentage": "64%",
        "weightvalue": "56007/20000 kg",
        "volumepercentage": "62%",
        "volumevalue": "18/60 cbm",
        "uldposition1": "L3",
        "uldvalue1": "6/8",
        "uldposition2": "Q3",
        "uldvalue2": "3/2",
        "uldposition3": "L5",
        "uldvalue3": "8/6",
        "uldposition4": "Q7",
        "uldvalue4": "6/9",
        "revenue": "$57,361.63",
        "yeild": "$7.07",
        "sr": "88/ AWBs",
        "queuedBookingSR": "33/ AWBs",
        "queuedBookingvolume": "2916 kg / 50 cbm"
    }
];
const columnsList = [
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
        filterType: "autoCompleteFilter",
        dataSource: []
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
        filterType: "autoCompleteFilter",
        dataSource: []
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
        filterType: "autoCompleteFilter",
        dataSource: []
    }
];
const closeExport = jest.fn();

const setup = () => {
    const utils = render(
        <ExportData
            closeExport={closeExport}
            columnsList={columnsList}
            rows={rows}
        />
    );
    const input1 = utils.getByTestId("searchExport");
    const input2 = utils.getByTestId("selectColumns");
    return {
        input1,
        input2,
        ...utils
    };
};
test("exportValidationClick", () => {
    // afterEach(cleanup)
    const { getByTestId } = render(<ExportData
        closeExport={closeExport}
        columnsList={columnsList}
        rows={rows}
    />)
    fireEvent.click(getByTestId('exportValidationClick'));
    const element = getByTestId('exportValidationClick')
    expect(element).toHaveTextContent('Export')
})
test("add to column change trigger", () => {
    // afterEach(cleanup)
    const { getAllByTestId } = render(<ExportData
        closeExport={closeExport}
        columnsList={columnsList}
        rows={rows}
    />)
    fireEvent.click(getAllByTestId('addToColumn')[0], { target: { checked: true } });
    const element = getAllByTestId('addToColumn')
})
test("selectColumn onChange trigger", () => {
    // afterEach(cleanup)
    const { getByTestId } = render(<ExportData
        closeExport={closeExport}
        columnsList={columnsList}
        rows={rows}
    />)
    fireEvent.click(getByTestId('selectColumns'), { target: { checked: true } });
    const element = getByTestId('selectColumns')
})
test("close export click trigger", () => {
    const { getByTestId } = render(<ExportData
        closeExport={closeExport}
        columnsList={columnsList}
        rows={rows}
    />)
    fireEvent.click(getByTestId('closeExport'));
    const element = getByTestId('closeExport')
    expect(element).toHaveTextContent('Cancel')
})
test("onChange Trigger for SearchExport", () => {
    const { input1 } = setup();
    fireEvent.change(input1, { target: { value: "fli" } });
    expect(input1.value).toBe("fli");
});
test("onChange Trigger for selectColumns", () => {
    const { input2, utils } = setup();
    fireEvent.change(input2, { target: { checked: true } });
    expect(input2.checked).toBe(true);
});

test("<ExportData />", () => {
    global.URL.createObjectURL = jest.fn();

    act(() => {
        ReactDOM.render(
            <ExportData
                closeExport={closeExport}
                columnsList={columnsList}
                rows={rows}
            />,
            container
        );
    });
    act(() => {
        let component = ReactTestUtils.renderIntoDocument(
            <ExportData
                closeExport={closeExport}
                columnsList={columnsList}
                rows={rows}
            />
        );
        component.addToColumnEntityList({
            key: "yeild",
            name: "Yeild",
            draggable: false,
            editor: "Text",
            formulaApplicable: true,
            sortable: true,
            resizable: true,
            filterable: true,
            width: 150,
            filterType: "autoCompleteFilter",
            dataSource: []
        });
        component.addToColumnEntityList({
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
        });

        component.selectDownLoadType({ target: { checked: true, value: "pdf" } });
        component.selectDownLoadType({ target: { checked: false, value: "pdf" } });
        component.selectDownLoadType({ target: { checked: true, value: "csv" } });
        component.selectDownLoadType({ target: { checked: true, value: "excel" } });
        component.exportRowData();
        component.downloadPDF([
            {
                "travelId": 0,
                "flightno": "XX6576",
                "date": "2015-05-01",
                "segmentfrom": "ABC",
                "segmentto": "ZYY",
                "flightModel": 115,
                "bodyType": "Small Body",
                "type": "Car",
                "startTime": "03:34 (A)",
                "endTime": "03:05 (S)",
                "status": "To Be Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:58|hrs to depart",
                "weightpercentage": "65%",
                "weightvalue": "52098/20000 kg",
                "volumepercentage": "32%",
                "volumevalue": "33/60 cbm",
                "uldposition1": "L4",
                "uldvalue1": "6/1",
                "uldposition2": "Q4",
                "uldvalue2": "2/7",
                "uldposition3": "L8",
                "uldvalue3": "7/5",
                "uldposition4": "Q8",
                "uldvalue4": "3/2",
                "revenue": "$60,485.33",
                "yeild": "$6.28",
                "sr": "52/ AWBs",
                "queuedBookingSR": "23/ AWBs",
                "queuedBookingvolume": "8023 kg / 35 cbm"
            },
            {
                "travelId": 1,
                "flightno": "XX5177",
                "date": "2018-02-09",
                "segmentfrom": "CCC",
                "segmentto": "YXZ",
                "flightModel": 197,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "01:23 (E)",
                "endTime": "12:31 (E)",
                "status": "Cancelled",
                "additionalStatus": "Arrived",
                "timeStatus": "12:57|hrs to depart",
                "weightpercentage": "37%",
                "weightvalue": "49689/20000 kg",
                "volumepercentage": "47%",
                "volumevalue": "49/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "1/1",
                "uldposition2": "Q2",
                "uldvalue2": "3/4",
                "uldposition3": "L6",
                "uldvalue3": "8/1",
                "uldposition4": "Q6",
                "uldvalue4": "4/2",
                "revenue": "$62,830.60",
                "yeild": "$8.39",
                "sr": "34/ AWBs",
                "queuedBookingSR": "75/ AWBs",
                "queuedBookingvolume": "8893 kg / 43 cbm"
            },
            {
                "travelId": 2,
                "flightno": "XX7883",
                "date": "2017-12-14",
                "segmentfrom": "BCB",
                "segmentto": "XYZ",
                "flightModel": 244,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "12:29 (S)",
                "endTime": "10:34 (A)",
                "status": "Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:04|hrs to depart",
                "weightpercentage": "64%",
                "weightvalue": "56007/20000 kg",
                "volumepercentage": "62%",
                "volumevalue": "18/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "6/8",
                "uldposition2": "Q3",
                "uldvalue2": "3/2",
                "uldposition3": "L5",
                "uldvalue3": "8/6",
                "uldposition4": "Q7",
                "uldvalue4": "6/9",
                "revenue": "$57,361.63",
                "yeild": "$7.07",
                "sr": "88/ AWBs",
                "queuedBookingSR": "33/ AWBs",
                "queuedBookingvolume": "2916 kg / 50 cbm"
            }
        ], ["FlightNo", "Date", "Revenue"]);
        component.downloadCSVFile([
            {
                "travelId": 0,
                "flightno": "XX6576",
                "date": "2015-05-01",
                "segmentfrom": "ABC",
                "segmentto": "ZYY",
                "flightModel": 115,
                "bodyType": "Small Body",
                "type": "Car",
                "startTime": "03:34 (A)",
                "endTime": "03:05 (S)",
                "status": "To Be Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:58|hrs to depart",
                "weightpercentage": "65%",
                "weightvalue": "52098/20000 kg",
                "volumepercentage": "32%",
                "volumevalue": "33/60 cbm",
                "uldposition1": "L4",
                "uldvalue1": "6/1",
                "uldposition2": "Q4",
                "uldvalue2": "2/7",
                "uldposition3": "L8",
                "uldvalue3": "7/5",
                "uldposition4": "Q8",
                "uldvalue4": "3/2",
                "revenue": "$60,485.33",
                "yeild": "$6.28",
                "sr": "52/ AWBs",
                "queuedBookingSR": "23/ AWBs",
                "queuedBookingvolume": "8023 kg / 35 cbm"
            },
            {
                "travelId": 1,
                "flightno": "XX5177",
                "date": "2018-02-09",
                "segmentfrom": "CCC",
                "segmentto": "YXZ",
                "flightModel": 197,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "01:23 (E)",
                "endTime": "12:31 (E)",
                "status": "Cancelled",
                "additionalStatus": "Arrived",
                "timeStatus": "12:57|hrs to depart",
                "weightpercentage": "37%",
                "weightvalue": "49689/20000 kg",
                "volumepercentage": "47%",
                "volumevalue": "49/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "1/1",
                "uldposition2": "Q2",
                "uldvalue2": "3/4",
                "uldposition3": "L6",
                "uldvalue3": "8/1",
                "uldposition4": "Q6",
                "uldvalue4": "4/2",
                "revenue": "$62,830.60",
                "yeild": "$8.39",
                "sr": "34/ AWBs",
                "queuedBookingSR": "75/ AWBs",
                "queuedBookingvolume": "8893 kg / 43 cbm"
            },
            {
                "travelId": 2,
                "flightno": "XX7883",
                "date": "2017-12-14",
                "segmentfrom": "BCB",
                "segmentto": "XYZ",
                "flightModel": 244,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "12:29 (S)",
                "endTime": "10:34 (A)",
                "status": "Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:04|hrs to depart",
                "weightpercentage": "64%",
                "weightvalue": "56007/20000 kg",
                "volumepercentage": "62%",
                "volumevalue": "18/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "6/8",
                "uldposition2": "Q3",
                "uldvalue2": "3/2",
                "uldposition3": "L5",
                "uldvalue3": "8/6",
                "uldposition4": "Q7",
                "uldvalue4": "6/9",
                "revenue": "$57,361.63",
                "yeild": "$7.07",
                "sr": "88/ AWBs",
                "queuedBookingSR": "33/ AWBs",
                "queuedBookingvolume": "2916 kg / 50 cbm"
            }
        ]);
        component.downloadXLSFile([
            {
                "travelId": 0,
                "flightno": "XX6576",
                "date": "2015-05-01",
                "segmentfrom": "ABC",
                "segmentto": "ZYY",
                "flightModel": 115,
                "bodyType": "Small Body",
                "type": "Car",
                "startTime": "03:34 (A)",
                "endTime": "03:05 (S)",
                "status": "To Be Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:58|hrs to depart",
                "weightpercentage": "65%",
                "weightvalue": "52098/20000 kg",
                "volumepercentage": "32%",
                "volumevalue": "33/60 cbm",
                "uldposition1": "L4",
                "uldvalue1": "6/1",
                "uldposition2": "Q4",
                "uldvalue2": "2/7",
                "uldposition3": "L8",
                "uldvalue3": "7/5",
                "uldposition4": "Q8",
                "uldvalue4": "3/2",
                "revenue": "$60,485.33",
                "yeild": "$6.28",
                "sr": "52/ AWBs",
                "queuedBookingSR": "23/ AWBs",
                "queuedBookingvolume": "8023 kg / 35 cbm"
            },
            {
                "travelId": 1,
                "flightno": "XX5177",
                "date": "2018-02-09",
                "segmentfrom": "CCC",
                "segmentto": "YXZ",
                "flightModel": 197,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "01:23 (E)",
                "endTime": "12:31 (E)",
                "status": "Cancelled",
                "additionalStatus": "Arrived",
                "timeStatus": "12:57|hrs to depart",
                "weightpercentage": "37%",
                "weightvalue": "49689/20000 kg",
                "volumepercentage": "47%",
                "volumevalue": "49/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "1/1",
                "uldposition2": "Q2",
                "uldvalue2": "3/4",
                "uldposition3": "L6",
                "uldvalue3": "8/1",
                "uldposition4": "Q6",
                "uldvalue4": "4/2",
                "revenue": "$62,830.60",
                "yeild": "$8.39",
                "sr": "34/ AWBs",
                "queuedBookingSR": "75/ AWBs",
                "queuedBookingvolume": "8893 kg / 43 cbm"
            },
            {
                "travelId": 2,
                "flightno": "XX7883",
                "date": "2017-12-14",
                "segmentfrom": "BCB",
                "segmentto": "XYZ",
                "flightModel": 244,
                "bodyType": "Small Body",
                "type": "Van",
                "startTime": "12:29 (S)",
                "endTime": "10:34 (A)",
                "status": "Cancelled",
                "additionalStatus": "",
                "timeStatus": "04:04|hrs to depart",
                "weightpercentage": "64%",
                "weightvalue": "56007/20000 kg",
                "volumepercentage": "62%",
                "volumevalue": "18/60 cbm",
                "uldposition1": "L3",
                "uldvalue1": "6/8",
                "uldposition2": "Q3",
                "uldvalue2": "3/2",
                "uldposition3": "L5",
                "uldvalue3": "8/6",
                "uldposition4": "Q7",
                "uldvalue4": "6/9",
                "revenue": "$57,361.63",
                "yeild": "$7.07",
                "sr": "88/ AWBs",
                "queuedBookingSR": "33/ AWBs",
                "queuedBookingvolume": "2916 kg / 50 cbm"
            }
        ]);
        component.exportValidation();
        component.selectAllToColumnList();
        component.handleClickOutside({ target: {} })
    });
});

it("add to column list change event", () => {
    afterEach(cleanup)
    const { getAllByTestId } = render(<ExportData
        closeExport={closeExport}
        columnsList={columnsList}
        rows={rows}
    />)
    fireEvent.change(getAllByTestId('addToColumn')[2], {
        target: {
            value: {
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
            }
        }
    });
})

// global.URL.createObjectURL = jest.fn();
// test("selecting download type", () => {
//   const wrapper = shallow(<ExportData />);
//   wrapper.selectDownLoadType = jest.fn();
//   expect(wrapper.state("downLaodFileType")).toStrictEqual([]);
//   wrapper.instance().selectDownLoadType({
//     target: { name: "input", value: "pdf", checked: true },
//   });
//   expect(wrapper.state("downLaodFileType")).toStrictEqual(["pdf"]);
//   wrapper.instance().selectDownLoadType({
//     target: { name: "input", value: "pdf", checked: false },
//   });
//   expect(wrapper.state("downLaodFileType")).toStrictEqual([]);
// });
// test("addToColumnEntityList function", () => {
//   const wrapper = shallow(<ExportData />);
//   wrapper.addToColumnEntityList = jest.fn();
//   wrapper.setState({ columnEntityList: [] });
//   wrapper.setState({ isAllSelected: false });
//   wrapper.instance().addToColumnEntityList("bookingProfile");
//   expect(wrapper.state("columnEntityList")).toStrictEqual(["bookingProfile"]);
//   expect(wrapper.state("isAllSelected")).toStrictEqual(false);
//   wrapper.setState({ columnEntityList: ["bookingProfile"] });
//   wrapper.instance().addToColumnEntityList("bookingProfile");
//   expect(wrapper.state("columnEntityList")).toStrictEqual([]);
//   expect(wrapper.state("isAllSelected")).toStrictEqual(false);
// });
// test("selectAllToColumnList function", () => {
//   const wrapper = shallow(<ExportData />);
//   wrapper.selectAllToColumnList = jest.fn();
//   wrapper.setState({ columnEntityList: [] });
//   wrapper.setState({ isAllSelected: true });
//   expect(wrapper.state("columnEntityList")).toStrictEqual([]);
//   expect(wrapper.state("isAllSelected")).toStrictEqual(true);
//   wrapper.instance().selectAllToColumnList();
//   expect(wrapper.state("columnEntityList")).toStrictEqual(undefined);
//   expect(wrapper.state("isAllSelected")).toStrictEqual(true);
// });
// test("exportRowData as pdf function", () => {
//   // to fix the type error related to createObjectURL
//   global.URL.createObjectURL = jest.fn();
//   const rows = [
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ];
//   const wrapper = mount(<ExportData rows={rows} />);
//   wrapper.setState({
//     columnEntityList: [
//       {
//         key: "flightno",
//         name: "FlightNo",
//         draggable: false,
//         editor: "Text",
//         formulaApplicable: false,
//         sortable: true,
//         resizable: true,
//         filterable: true,
//         width: 150,
//         filterType: "autoCompleteFilter",
//       },
//     ],
//   });
//   wrapper.exportRowData = jest.fn();
//   wrapper.setState({
//     columnEntityList: [
//       {
//         key: "flightno",
//         name: "FlightNo",
//         draggable: false,
//         editor: "Text",
//         formulaApplicable: false,
//         sortable: true,
//         resizable: true,
//         filterable: true,
//         width: 150,
//         filterType: "autoCompleteFilter",
//       },
//     ],
//   });
//   expect(wrapper.state("columnEntityList")).toStrictEqual([
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ]);
//   wrapper.setState({ downLaodFileType: ["pdf"] });
//   expect(wrapper.state("downLaodFileType")).toStrictEqual(["pdf"]);
//   wrapper.instance().exportRowData();
//   expect(wrapper.state("filteredRow")).toStrictEqual([{}]);
// });
// test("exportRowData as csv function", () => {
//   const rows = [
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ];
//   const wrapper = shallow(<ExportData rows={rows} />);
//   wrapper.exportRowData = jest.fn();
//   wrapper.setState({
//     columnEntityList: [
//       {
//         key: "flightno",
//         name: "FlightNo",
//         draggable: false,
//         editor: "Text",
//         formulaApplicable: false,
//         sortable: true,
//         resizable: true,
//         filterable: true,
//         width: 150,
//         filterType: "autoCompleteFilter",
//       },
//     ],
//   });
//   expect(wrapper.state("columnEntityList")).toStrictEqual([
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ]);
//   wrapper.setState({ downLaodFileType: ["csv"] });
//   expect(wrapper.state("downLaodFileType")).toStrictEqual(["csv"]);
//   wrapper.instance().exportRowData();
//   expect(wrapper.state("filteredRow")).toStrictEqual([{}]);
// });
// test("exportRowData as excel function", () => {
//   const rows = [
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ];
//   const wrapper = shallow(<ExportData rows={rows} />);
//   wrapper.exportRowData = jest.fn();
//   wrapper.setState({
//     columnEntityList: [
//       {
//         key: "flightno",
//         name: "FlightNo",
//         draggable: false,
//         editor: "Text",
//         formulaApplicable: false,
//         sortable: true,
//         resizable: true,
//         filterable: true,
//         width: 150,
//         filterType: "autoCompleteFilter",
//       },
//     ],
//   });
//   expect(wrapper.state("columnEntityList")).toStrictEqual([
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ]);
//   wrapper.setState({ downLaodFileType: ["excel"] });
//   expect(wrapper.state("downLaodFileType")).toStrictEqual(["excel"]);
//   wrapper.instance().exportRowData();
//   expect(wrapper.state("filteredRow")).toStrictEqual([{}]);
// });
// test("columnSearchLogic function", () => {
//   const rows = [
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//     {
//       key: "date",
//       name: "Date",
//       draggable: false,
//       editor: "DatePicker",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ];
//   const wrapper = shallow(<ExportData columnsList={rows} />);
//   wrapper.columnSearchLogic = jest.fn();
//   wrapper.setState({
//     columnEntityList: [
//       {
//         key: "flightno",
//         name: "FlightNo",
//         draggable: false,
//         editor: "Text",
//         formulaApplicable: false,
//         sortable: true,
//         resizable: true,
//         filterable: true,
//         width: 150,
//         filterType: "autoCompleteFilter",
//       },
//     ],
//   });
//   expect(wrapper.state("columnEntityList")).toStrictEqual([
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ]);
//   wrapper.setState({});
//   expect(wrapper.state("")).toStrictEqual();
//   wrapper.instance().columnSearchLogic({
//     target: { className: "custom__ctrl", value: "flightno" },
//   });
//   expect(wrapper.state("filteredRow")).toStrictEqual([]);
//   wrapper.instance().columnSearchLogic({
//     target: { className: "custom__ctrl", value: "book" },
//   });
//   expect(wrapper.state("filteredRow")).toStrictEqual([]);
// });
// test("exportValidation", () => {
//   const rows = [
//     {
//       key: "flightno",
//       name: "FlightNo",
//       draggable: false,
//       editor: "Text",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//     {
//       key: "date",
//       name: "Date",
//       draggable: false,
//       editor: "DatePicker",
//       formulaApplicable: false,
//       sortable: true,
//       resizable: true,
//       filterable: true,
//       width: 150,
//       filterType: "autoCompleteFilter",
//     },
//   ];
//   const wrapper = shallow(<ExportData rows={rows} />);
//   wrapper.exportValidation = jest.fn();
//   wrapper.setState({ columnEntityList: [1, 2, 3] });
//   wrapper.setState({ downLaodFileType: [1, 2, 3] });
//   wrapper.instance().exportValidation();
//   expect(wrapper.state("clickTag")).toStrictEqual("none");
//   wrapper.setState({ columnEntityList: [] });
//   wrapper.setState({ downLaodFileType: [1, 2, 3] });
//   wrapper.instance().exportValidation();
//   expect(wrapper.state("clickTag")).toStrictEqual("");
//   expect(wrapper.state("warning")).toStrictEqual("Column");
//   wrapper.setState({ columnEntityList: [1, 2, 3] });
//   wrapper.setState({ downLaodFileType: [] });
//   wrapper.instance().exportValidation();
//   expect(wrapper.state("clickTag")).toStrictEqual("");
//   expect(wrapper.state("warning")).toStrictEqual("File Type");
//   wrapper.setState({ columnEntityList: [] });
//   wrapper.setState({ downLaodFileType: [] });
//   wrapper.instance().exportValidation();
//   expect(wrapper.state("clickTag")).toStrictEqual("");
//   expect(wrapper.state("warning")).toStrictEqual("File Type & Column");
// });
// it("close icon click event", () => {
//   const mockCallBack = jest.fn();
//   const component = mount(
//     <FontAwesomeIcon
//       icon={faTimes}
//       className="icon-close"
//       onClick={mockCallBack}
//     />
//   );
//   component.find({ className: "icon-close" }).simulate("click");
//   expect(mockCallBack).toHaveBeenCalled();
//   component.unmount();
// });
// it("simulates pdf checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <input name="pdf" onChange={mockCallBack}></input>
//   );
//   component.find({ name: "pdf" }).simulate("change");
//   expect(mockCallBack).toHaveBeenCalled();
// });
// it("simulates all columncheckBox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <input type="checkbox" onChange={mockCallBack} checked={true} />
//   );
//   component.find({ type: "checkbox" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates excel checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <input name="excel" onChange={mockCallBack}></input>
//   );
//   component.find({ name: "excel" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates csv checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <input name="csv" onChange={mockCallBack}></input>
//   );
//   component.find({ name: "csv" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates search export input field", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <input
//       type="text"
//       placeholder="Search export"
//       className="custom__ctrl"
//       onChange={mockCallBack}
//     ></input>
//   );
//   component.find({ className: "custom__ctrl" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates close of export click event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <button className="btns" onClick={mockCallBack}>
//       Cancel
//     </button>
//   );
//   component.find({ className: "btns" }).simulate("click");
//   expect(component).toMatchSnapshot();
// });
// it("render correctly component", () => {
//   const Component = renderer
//     .create(<div className="export__settings" />)
//     .toJSON();
//   expect(Component).toMatchSnapshot();
// });
// it("Should not call action on/off click inside the ExportData", () => {
//   const map = {};
//   const mockCallBack = jest.fn();
//   document.addEventListener = jest.fn((event, cb) => {
//     map[event] = cb;
//   });
//   const props = {
//     closeExport: jest.fn(),
//   };
//   const wrapper = mount(<ExportData {...props} />);
//   const component = mount(
//     <input name="excel" onChange={mockCallBack}></input>
//   );
//   map.mousedown({
//     target: ReactDOM.findDOMNode(wrapper.instance()),
//   });
//   expect(props.closeExport).not.toHaveBeenCalled();
//   map.mousedown({
//     target: ReactDOM.findDOMNode(component.instance()),
//   });
//   expect(props.closeExport).toHaveBeenCalled();
//   wrapper.unmount();
// });
// it("render div component", () => {
//   const wrapper = mount(<ExportData />);
//   expect(wrapper.find("div").length).toEqual(28);
//   wrapper.unmount();
// });
// it("rendering input", () => {
//   const wrapper = mount(<ExportData />);
//   expect(wrapper.find("input").length).toEqual(5);
//   wrapper.unmount();
// });
// it("rendering input", () => {
//   const wrapper = mount(<ExportData />);
//   expect(wrapper.find("input").length).toEqual(5);
//   wrapper.unmount();
// });
// it("simulates all column select", () => {
//   const checkbox = shallow(<ExportData />);
//   checkbox.find({ className: "selectColumn" }).simulate("change");
//   expect(checkbox.text()).toEqual(
//     "Export DataSelect All<FontAwesomeIcon />Export as<FontAwesomeIcon /><FontAwesomeIcon /><FontAwesomeIcon />You have not selected CancelExport"
//   );
// });
