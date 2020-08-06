import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { act } from "react-dom/test-utils";

import ReactTestUtils from "react-dom/test-utils";
import renderer from "react-test-renderer";
import Spreadsheet from "../../src/index";
import { applyFormula } from "../../src/utilities/utils";
import Sorting from "../../src/overlays/sorting/Sorting";
import ExportData from "../../src/overlays/export_data/ExportData";
import {
  faSortAmountDown,
  faColumns,
  // faSyncAlt,
  faShareAlt,
  // faAlignLeft,
  // faFilter,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const mockformula = [
  {
    draggable: true,
    editor: "text",
    filterRenderer: jest.fn(),
    filterType: "autoCompleteFilter",
    filterable: true,
    formulaApplicable: true,
    key: "revenue",
    name: "Revenue",
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    draggable: true,
    editor: "text",
    filterRenderer: jest.fn(),
    filterType: "autoCompleteFilter",
    filterable: true,
    formulaApplicable: true,
    key: "yeild",
    name: "Yeild",
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    draggable: true,
    editor: "text",
    filterRenderer: jest.fn(),
    filterType: "autoCompleteFilter",
    filterable: true,
    formulaApplicable: true,
    key: "weightvalue",
    name: "Weight Value",
    resizable: true,
    sortable: true,
    width: 150,
  },
  {
    draggable: true,
    editor: "text",
    filterRenderer: jest.fn(),
    filterType: "autoCompleteFilter",
    filterable: true,
    formulaApplicable: true,
    key: "volumepercentage",
    name: "Volume Percentage",
    resizable: true,
    sortable: true,
    width: 150,
  },
];

const data = [
  {
    travelId: 0,
    flightno: "XX6576",
    date: "2015-05-01",
    segmentfrom: "ABC",
    segmentto: "ZYY",
    flightModel: 115,
    bodyType: "Small Body",
    type: "Car",
    startTime: "03:34 (A)",
    endTime: "03:05 (S)",
    status: "To Be Cancelled",
    additionalStatus: "",
    timeStatus: "04:58|hrs to depart",
    weightpercentage: "65%",
    weightvalue: "52098/20000 kg",
    volumepercentage: "32%",
    volumevalue: "33/60 cbm",
    uldposition1: "L4",
    uldvalue1: "6/1",
    uldposition2: "Q4",
    uldvalue2: "2/7",
    uldposition3: "L8",
    uldvalue3: "7/5",
    uldposition4: "Q8",
    uldvalue4: "3/2",
    revenue: "$60,485.33",
    yeild: "$6.28",
    sr: "52/ AWBs",
    queuedBookingSR: "23/ AWBs",
    queuedBookingvolume: "8023 kg / 35 cbm",
  },
  {
    travelId: 1,
    flightno: "XX5177",
    date: "2018-02-09",
    segmentfrom: "CCC",
    segmentto: "YXZ",
    flightModel: 197,
    bodyType: "Small Body",
    type: "Van",
    startTime: "01:23 (E)",
    endTime: "12:31 (E)",
    status: "Cancelled",
    additionalStatus: "Arrived",
    timeStatus: "12:57|hrs to depart",
    weightpercentage: "37%",
    weightvalue: "49689/20000 kg",
    volumepercentage: "47%",
    volumevalue: "49/60 cbm",
    uldposition1: "L3",
    uldvalue1: "1/1",
    uldposition2: "Q2",
    uldvalue2: "3/4",
    uldposition3: "L6",
    uldvalue3: "8/1",
    uldposition4: "Q6",
    uldvalue4: "4/2",
    revenue: "$62,830.60",
    yeild: "$8.39",
    sr: "34/ AWBs",
    queuedBookingSR: "75/ AWBs",
    queuedBookingvolume: "8893 kg / 43 cbm",
  },
];

const gridHeight = "90vh";

let searchKey = "";

const maxLeftPinnedColumn = 5;
//Configure columns and its related featues such as editor(Text/DropDown), FormulaApplicable(True/False)
//Editable, Draggable, sortable, resizable, filterable, default width
const props = {
  columns: [
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
      filterType: "autoCompleteFilter",
    },
  ],
};
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "numeric",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
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
    filterType: "autoCompleteFilter",
  },
];

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
];

const setStatus = jest.fn();
const setData = jest.fn();

// const [status, setStatus] = useState("");

const closeWarningStatus = () => {
  setStatus("");
  setData(data);
};

const handleWarningStatus = () => {
  setStatus("invalid");
};

describe("DataSheet component", () => {
  HTMLCanvasElement.prototype.getContext = () => {
    // return whatever getContext has to return
  };
  const swapSortList = [
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
    },
  ];
  const swapList = [
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
    },
  ];
  const wrapper = shallow(
    <Spreadsheet
      rows={data}
      columns={columns}
      closeWarningStatus={closeWarningStatus}
      airportCodes={airportCodeList}
      swapSortList={swapSortList}
      swapList={swapList}
      props={props}
    />
  );
  // afterEach(() => {
  //   wrapper.instance().removeAllListeners()
  //   if (customWrapper) {
  //     if ('removeAllListeners' in customWrapper.instance()) {
  //       customWrapper.instance().removeAllListeners()
  //     }
  //     customWrapper = null
  //   }
  // })

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Spreadsheet
        rows={data}
        columns={columns}
        closeWarningStatus={closeWarningStatus}
        airportCodes={airportCodeList}
      />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  describe("<Spreadsheet />", () => {
    it("mount", () => {
      const wrapper = mount(
        <Spreadsheet
          rows={data}
          columns={columns}
          closeWarningStatus={closeWarningStatus}
          airportCodes={airportCodeList}
        />
      );
      expect(wrapper).not.toBeNull();
    });
  });

  describe("check error message called", () => {
    it("mount", () => {
      const mockClearSearchValue = jest.fn();
      const wrapper = mount(
        <Spreadsheet
          rows={data}
          columns={columns}
          closeWarningStatus={closeWarningStatus}
          airportCodes={airportCodeList}
        />
      );
      wrapper.find("ErrorMessage").props().closeWarningStatus();
      expect(wrapper).not.toBeNull();
      wrapper.find("ErrorMessage").props().clearSearchValue();
      expect(wrapper).not.toBeNull();
    });
  });

  describe("check Form Control ", () => {
    it("mount", () => {
      const globalSearchLogic = jest.fn();

      const mockedEvent = { target: {} };
      const wrapper = mount(
        <Spreadsheet
          rows={data}
          columns={columns}
          closeWarningStatus={closeWarningStatus}
          globalSearchLogic={globalSearchLogic}
          airportCodes={airportCodeList}
        />
      );
      const modal = wrapper.find("FormControl").props().onChange(mockedEvent);
      expect(globalSearchLogic).toHaveBeenCalledTimes(1);
    });
  });

  // const setup = propOverrides => {
  //   const props = Object.assign({ leftBtn: MOCK_LEFT, rightBtn: MOCK_RIGHT }, propOverrides);
  //   const wrapper = shallow(<Spreadsheet rows={data} columns={columns} closeWarningStatus={closeWarningStatus} airportCodes={airportCodeList}  {...props} />);
  //   return wrapper;
  // };

  describe("check Font Awesome Icon click ", () => {
    it("mount", () => {
      const exportColumnData = jest.fn();
      const wrapper = mount(
        <FontAwesomeIcon
          title="Export"
          icon={faShareAlt}
          onClick={exportColumnData}
        />
      );
      const modal = wrapper.props().onClick();
      expect(exportColumnData).not.toBeNull();
    });
  });

  describe("check Export Data ", () => {
    it("shallow", () => {
      const exportComponent = null;
      const closeExport = jest.fn();
      const wrapper = shallow(
        <ExportData
          rows={data}
          columnsList={columns}
          closeExport={closeExport}
        />
      );
      const modal = wrapper.props();
      expect(closeExport).not.toBeNull();
    });
  });

  describe("check Sorting Panel ", () => {
    it("mount", () => {
      const sortingParamsObjectList = [
        { sortBy: "FlightNo", order: "Ascending", sortOn: "Value" },
      ];

      const state = {
        sortingParamsObjectList,
      };
      const sortingOrderList = sortingParamsObjectList;
      const setTableAsPerSortingParams = jest.fn();
      const handleTableSortSwap = jest.fn();
      const closeSorting = jest.fn();
      const clearAllSortingParams = jest.fn();
      const columnField = [];
      columns.map((item) => columnField.push(item.name));
      act((sortingOrderList) => {
        const wrapper = mount(
          <Sorting
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            sortingParamsObjectList={sortingParamsObjectList}
            sortingOrderList={sortingParamsObjectList}
            handleTableSortSwap={handleTableSortSwap}
            clearAllSortingParams={clearAllSortingParams}
            columnFieldValue={columnField}
            closeSorting={closeSorting}
          />
        );
        const modal = wrapper
          .props()
          .setTableAsPerSortingParams(sortingParamsObjectList);
        expect(setTableAsPerSortingParams).not.toBeNull();
        const modal1 = wrapper
          .props()
          .handleTableSortSwap(sortingParamsObjectList);
        expect(handleTableSortSwap).not.toBeNull();
        const modal2 = wrapper.props().closeSorting(sortingParamsObjectList);
        expect(closeSorting).not.toBeNull();
      });
    });
  });

  describe("check Datagrid ", () => {
    it("mount", () => {
      const datagidfn = jest.fn();
      const junk = columns;
      const filtercol = {};
      const mockedEvent = { target: {} };
      const filtermock = {
        filterTerm: { value: "Wide Body", label: "Wide Body" },
        column: { key: "bodyType" },
      };
      const searchKey = "";
      const globalSearchLogic = jest.fn();
      const updateCellData = jest.fn();
      const selectBulkData = jest.fn();
      const length = 2;
      const maxLeftPinnedColumn = 5;

      const songLinkProps = {
        columns,
      };

      const status = "";

      const wrapper = mount(
        <Spreadsheet
          rows={data}
          columns={columns}
          junk={junk}
          closeWarningStatus={closeWarningStatus}
          airportCodes={airportCodeList}
          textValue={searchKey}
          globalSearchLogic={globalSearchLogic}
          status={status}
          closeWarningStatus={closeWarningStatus}
          handleWarningStatus={handleWarningStatus}
          count={length}
          gridHeight={gridHeight}
          updateCellData={updateCellData}
          selectBulkData={selectBulkData}
          maxLeftPinnedColumn={maxLeftPinnedColumn}
          {...songLinkProps}
        />
      );
      const getValidFilterValues = wrapper
        .find("ReactDataGrid")
        .props()
        .getValidFilterValues(columns[0].key);
      expect(getValidFilterValues).not.toBeNull();
      // const onRowsSelected = wrapper.find('ReactDataGrid').rowSelection;
      // const onRowsSelected = wrapper.find('ReactDataGrid');
      // console.log('ddddd')
      // console.log(...onRowsSelected)
      // expect(onRowsSelected).not.toBeNull();
      const onGridSort = wrapper
        .find("ReactDataGrid")
        .props()
        .onGridSort("flightno", "DESC");
      expect(onGridSort).not.toBeNull();
      const rowGetter = wrapper.find("ReactDataGrid").props().rowGetter(0);
      expect(rowGetter).not.toBeNull();
      const onColumnResize = wrapper
        .find("ReactDataGrid")
        .props()
        .onColumnResize(0, 100);
      expect(onColumnResize).not.toBeNull();
      const onAddFilter = wrapper
        .find("ReactDataGrid")
        .props()
        .onAddFilter(filtermock);
      expect(onAddFilter).not.toBeNull();
      const onClearFilters = wrapper
        .find("ReactDataGrid")
        .props()
        .onClearFilters();
      expect(onClearFilters).not.toBeNull();
    });
  });

  describe("On Grid Row updated ", () => {
    it("mount", () => {
      const datagidfn = jest.fn();
      const junk = columns;
      const filtercol = {};
      const mockedEvent = { target: {} };
      const songLinkProps = {
        columnns: columns,
      };
      const searchKey = "";
      const onRowsSelectedfn = jest.fn();
      const updateCellData = jest.fn();
      const selectBulkData = jest.fn();
      const length = 2;
      const maxLeftPinnedColumn = 5;
      const status = "";
      const wrapper = shallow(
        <Spreadsheet
          rows={data}
          columns={columns}
          junk={junk}
          closeWarningStatus={closeWarningStatus}
          airportCodes={airportCodeList}
          textValue={searchKey}
          onRowsSelected={onRowsSelectedfn}
          status={status}
          closeWarningStatus={closeWarningStatus}
          handleWarningStatus={handleWarningStatus}
          count={length}
          gridHeight={gridHeight}
          updateCellData={updateCellData}
          selectBulkData={selectBulkData}
          maxLeftPinnedColumn={maxLeftPinnedColumn}
        />
      );

      const onGridRowsUpdated = wrapper
        .find("ReactDataGrid")
        .props()
        .onGridRowsUpdated({
          fromRow: 0,
          toRow: 0,
          updated: { flightno: "dss55555" },
          action: "CELL_UPDATE",
        });
      // console.log(...onGridRowsUpdated)
      expect(onGridRowsUpdated).not.toBeNull();
    });
  });

  describe("On Row selected ", () => {
    it("mount", () => {
      const datagidfn = jest.fn();
      const junk = columns;
      const filtercol = {};
      const mockedEvent = { target: {} };

      const param = [
        {
          additionalStatus: "Arrived",
          bodyType: "Narrow Body",
          date: "21-Oct-2018",
          endTime: "09:00 (E)",
          flightModel: 520,
          flightno: "XX1001",
          queuedBookingSR: "36/ AWBs",
          queuedBookingvolume: "5875 kg / 24 cbm",
          revenue: "$51,490.42",
          segmentfrom: "CCB",
          segmentto: "XXY",
          sr: "72/ AWBs",
          startTime: "10:33 (E)",
          status: "Cancelled",
          timeStatus: "03:10|hrs to depart",
          travelId: 8945,
          type: "Truck",
          uldposition1: "L3",
          uldposition2: "Q2",
          uldposition3: "L6",
          uldposition4: "Q5",
          uldvalue1: "1/1",
          uldvalue2: "5/1",
          uldvalue3: "4/2",
          uldvalue4: "3/8",
          volumepercentage: "53%",
          volumevalue: "49/60 cbm",
          weightpercentage: "71%",
          weightvalue: "59565/20000 kg",
          yeild: "$3.54",

          rowIdx: 0,
        },
      ];

      const searchKey = "";
      const onRowsSelectedfn = jest.fn();
      const onRowsDeselectedfn = jest.fn();
      const updateCellData = jest.fn();
      const selectBulkData = jest.fn();
      const length = 2;
      const maxLeftPinnedColumn = 5;
      const status = "";
      const wrapper = mount(
        <Spreadsheet
          rows={data}
          columns={columns}
          junk={junk}
          closeWarningStatus={closeWarningStatus}
          airportCodes={airportCodeList}
          textValue={searchKey}
          onRowsSelected={onRowsSelectedfn}
          onRowsDeselected={onRowsDeselectedfn}
          status={status}
          closeWarningStatus={closeWarningStatus}
          handleWarningStatus={handleWarningStatus}
          count={length}
          gridHeight={gridHeight}
          updateCellData={updateCellData}
          selectBulkData={selectBulkData}
          maxLeftPinnedColumn={maxLeftPinnedColumn}
        />
      );
      const onRowsSelected = wrapper
        .find("ReactDataGrid")
        .props()
        .rowSelection.onRowsSelected(param);
      expect(onRowsSelectedfn).not.toBeNull();
      const onRowsDeselected = wrapper
        .find("ReactDataGrid")
        .props()
        .rowSelection.onRowsDeselected(param);
      expect(onRowsDeselected).not.toBeNull();
    });
  });

  describe("check sorting panel click ", () => {
    test("onClick is called when button is clicked", () => {
      const searchKey = "";
      const globalSearchLogic = jest.fn();
      const sortingPanel = jest.fn();
      const columnReorderingPannel = jest.fn();
      const updateCellData = jest.fn();
      const selectBulkData = jest.fn();
      const length = 2;
      const maxLeftPinnedColumn = 5;
      const status = "";
      // act(() => {
      const onClick = jest.fn();

      let tree = mount(
        <Spreadsheet
          rows={[...data]}
          columns={columns}
          airportCodes={airportCodeList}
          textValue={searchKey}
          globalSearchLogic={globalSearchLogic}
          status={status}
          closeWarningStatus={closeWarningStatus}
          handleWarningStatus={handleWarningStatus}
          count={length}
          gridHeight={gridHeight}
          updateCellData={updateCellData}
          selectBulkData={selectBulkData}
          maxLeftPinnedColumn={maxLeftPinnedColumn}
        />
      );

      const button = tree.find(".filterIcons").at(0).props().onClick();
      // expect(button.length).toBe(1);
      expect(sortingPanel).not.toBeNull();
      const button2 = tree.find(".filterIcons").at(1).props().onClick();
      // expect(button.length).toBe(1);
      expect(columnReorderingPannel).not.toBeNull();
      // });
      wrapper.instance().exportColumnData();
      wrapper.instance().closeSorting();
      wrapper.instance().clearAllSortingParams();
      wrapper.instance().closeExport();
      wrapper.instance().setTableAsPerSortingParams([{ sortBy: "type" }]);
      wrapper.instance().array_move(["element1", "element2"], 0, 4);
    });
    test("handleTableSortSwap", () => {
      wrapper.instance().handleTableSortSwap([
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
        },
      ]);
      expect(swapSortList).toStrictEqual([
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
        },
      ]);
      expect(props.columns).toStrictEqual([
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
          filterType: "autoCompleteFilter",
        },
      ]);
      wrapper
        .instance()
        .updateTableAsPerRowChooser(
          ["FlightNo", "Date", "Segment From"],
          ["FlightNo", "Date"]
        );
    });
    test("handleWarningStatus ", () => {
      wrapper.instance().handleWarningStatus();
    });
    test("closeColumnReOrdering", () => {
      wrapper.instance().closeColumnReOrdering();
    });
    test("handleheaderNameList", () => {
      wrapper.instance().handleheaderNameList();
    });
    test("sortRows", () => {
      wrapper.instance().sortRows(
        [
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
          },
        ],
        "Date",
        "ASC"
      );
    });
    test("getrows", () => {
      wrapper.instance().sortRows(
        [
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
          },
        ],
        []
      );
    });
    test("sortingDiv", () => {
      const mockCallBack = jest.fn();
      const mockFunc = jest.fn();
      const component = shallow(
        <Sorting
          setTableAsPerSortingParams={mockCallBack}
          sortingParamsObjectList={[]}
          handleTableSortSwap={[]}
          clearAllSortingParams={[]}
          columnFieldValue={[]}
          closeSorting={mockFunc}
        />
      );
      expect(component).toMatchSnapshot();
    });
    test("toCamelCase", () => {
      wrapper.instance().toCamelCase("something");
    });
    test("sort_by", () => {
      wrapper.instance().sort_by();
    });
  });
});
