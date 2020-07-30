import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Sorting from "../../../../src/overlays/sorting/Sorting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
  {
    key: "uldvalue3",
    name: "uldvalue3",
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
    key: "uldposition4",
    name: "uldposition4",
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
    key: "uldvalue4",
    name: "uldvalue4",
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
    key: "sr",
    name: "SR",
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
    key: "queuedBookingSR",
    name: "Queued Booking SR",
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
    key: "queuedBookingvolume",
    name: "Queued Booking Volume",
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

describe("<Sorting />", () => {
  it("mount", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const wrapper = mount(
      <Sorting
        setTableAsPerSortingParams={mockSetTableAsPerSortingParams}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );
    expect(wrapper).not.toBeNull();
  });

  it("Should not call action on/off click inside the ExportData", () => {
    const map = {};
    const mockCallBack = jest.fn();
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const props = {
      closeExport: jest.fn(),
    };

    const wrapper = mount(<Sorting {...props} />);

    map.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance()),
    });

    expect(props.closeSorting).not.toHaveBeenCalled();

    map.mousedown({
      target: ReactDOM.findDOMNode(component.instance()),
    });
    expect(props.closeSorting).toHaveBeenCalled();
    wrapper.unmount();
  });

  it("simulates search export input field", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <select className="custom__ctrl" onChange={mockCallBack}></select>
    );
    component.find({ className: "custom__ctrl" }).simulate("change");
    expect(component).toMatchSnapshot();
  });

  it("simulates close of export click event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <button className="btns" onClick={mockCallBack}>
        Cancel
      </button>
    );
    component.find({ className: "btns" }).simulate("click");
    expect(component).toMatchSnapshot();
  });

  it("simulates excel checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <select
        className="custom__ctrl"
        name="sortBy"
        onChange={mockCallBack}
        value={row.sortBy}
      ></select>
    );
    component.find({ name: "sortBy" }).simulate("change");
    expect(component).toMatchSnapshot();
  });
  it("simulates csv checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <select
        className="custom__ctrl"
        name="sortOn"
        onChange={mockCallBack}
        value={row.sortOn}
      ></select>
    );
    component.find({ name: "sortOn" }).simulate("change");
    expect(component).toMatchSnapshot();
  });
  it("simulates csv checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <select
        className="custom__ctrl"
        name="order"
        onChange={mockCallBack}
        value={row.order}
      ></select>
    );
    component.find({ name: "order" }).simulate("change");
    expect(component).toMatchSnapshot();
  });

  test(`Exportdata renders with default props`, () => {
    const wrapper = shallow(<Sorting {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  test("Add new sort", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const component = mount(
      <Sorting
        setTableAsPerSortingParams={mockSetTableAsPerSortingParams}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );
    component.find(".sort__txt").at(0).simulate("click");
  });

  test("Sorting on-close --TEST", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const component = mount(
      <Sorting
        setTableAsPerSortingParams={mockSetTableAsPerSortingParams}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );

    component.find(".sort__close FontAwesomeIcon").simulate("click");
    expect(mockCloseSorting.mock.calls.length).toBe(1);
  });

  test("click", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const component = mount(
      <Sorting
        setTableAsPerSortingParams={mockSetTableAsPerSortingParams}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );
    component.find(".sort__close FontAwesomeIcon").simulate("click");
    expect(mockCloseSorting.mock.calls.length).toBe(1);
  });

  test("Save", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();
    const mockUpdateTableAsPerSortCondition = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const component = mount(
      <Sorting
        setTableAsPerSortingParams={mockUpdateTableAsPerSortCondition}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );
    component.find(".sort__btns .btns.btns__save").simulate("click");
    expect(mockUpdateTableAsPerSortCondition.mock.calls.length).toBe(1);
  });

  test("clear all", () => {
    const mockSortingParamsObjectList = jest.fn();
    const mockHandleTableSortSwap = jest.fn();
    const mockClearAllSortingParams = jest.fn();
    const mockCloseSorting = jest.fn();
    const mockSetTableAsPerSortingParams = jest.fn();

    let mockColumnField = [];
    columns.map((item) => mockColumnField.push(item.name));

    const component = mount(
      <Sorting
        setTableAsPerSortingParams={mockSetTableAsPerSortingParams}
        sortingParamsObjectList={mockSortingParamsObjectList}
        handleTableSortSwap={mockHandleTableSortSwap}
        clearAllSortingParams={mockClearAllSortingParams}
        columnFieldValue={mockColumnField}
        closeSorting={mockCloseSorting}
        columns={columns}
      />
    );
    component.find(".sort__btns .btns").at(0).simulate("click");
    expect(mockClearAllSortingParams.mock.calls.length).toBe(1);
  });
  it("copy",()=>{
      
  })
});
