import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import ExportData from "../../../../src/overlays/export_data/ExportData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";

describe("<ExportData />", () => {
  test("selecting download type", () => {
    const wrapper = shallow(<ExportData />);
    wrapper.selectDownLoadType = jest.fn();
    expect(wrapper.state("downLaodFileType")).toStrictEqual([]);
    wrapper.instance().selectDownLoadType({
      target: { name: "input", value: "pdf", checked: true },
    });
    expect(wrapper.state("downLaodFileType")).toStrictEqual(["pdf"]);
    wrapper.instance().selectDownLoadType({
      target: { name: "input", value: "pdf", checked: false },
    });
    expect(wrapper.state("downLaodFileType")).toStrictEqual([]);
  });
  test("addToColumnEntityList function", () => {
    const wrapper = shallow(<ExportData />);
    wrapper.addToColumnEntityList = jest.fn();
    wrapper.setState({ columnEntityList: [] });
    wrapper.setState({ isAllSelected: false });
    wrapper.instance().addToColumnEntityList("bookingProfile");
    expect(wrapper.state("columnEntityList")).toStrictEqual(["bookingProfile"]);
    expect(wrapper.state("isAllSelected")).toStrictEqual(false);
    wrapper.setState({ columnEntityList: ["bookingProfile"] });
    wrapper.instance().addToColumnEntityList("bookingProfile");
    expect(wrapper.state("columnEntityList")).toStrictEqual([]);
    expect(wrapper.state("isAllSelected")).toStrictEqual(false);
  });
  test("selectAllToColumnList function", () => {
    const wrapper = shallow(<ExportData />);
    wrapper.selectAllToColumnList = jest.fn();
    wrapper.setState({ columnEntityList: [] });
    wrapper.setState({ isAllSelected: true });
    expect(wrapper.state("columnEntityList")).toStrictEqual([]);
    expect(wrapper.state("isAllSelected")).toStrictEqual(true);
    wrapper.instance().selectAllToColumnList();
    expect(wrapper.state("columnEntityList")).toStrictEqual(undefined);
    expect(wrapper.state("isAllSelected")).toStrictEqual(true);
  });
  test("exportRowData as pdf function", () => {
    // to fix the type error related to createObjectURL
    global.URL.createObjectURL = jest.fn();
    const rows = [
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
    ];
    const wrapper = mount(<ExportData rows={rows} />);
    wrapper.setState({
      columnEntityList: [
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
      ],
    });
    wrapper.exportRowData = jest.fn();
    wrapper.setState({
      columnEntityList: [
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
      ],
    });
    expect(wrapper.state("columnEntityList")).toStrictEqual([
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
    ]);
    wrapper.setState({ downLaodFileType: ["pdf"] });
    expect(wrapper.state("downLaodFileType")).toStrictEqual(["pdf"]);
    wrapper.instance().exportRowData();
    expect(wrapper.state("filteredRow")).toStrictEqual([
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
    ]);
  });
  test("exportRowData as csv function", () => {
    const rows = [
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
    ];
    const wrapper = shallow(<ExportData rows={rows} />);
    wrapper.exportRowData = jest.fn();
    wrapper.setState({
      columnEntityList: [
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
      ],
    });

    expect(wrapper.state("columnEntityList")).toStrictEqual([
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
    ]);

    wrapper.setState({ downLaodFileType: ["csv"] });
    expect(wrapper.state("downLaodFileType")).toStrictEqual(["csv"]);
    wrapper.instance().exportRowData();
    expect(wrapper.state("filteredRow")).toStrictEqual([
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
    ]);
  });
  test("exportRowData as excel function", () => {
    const rows = [
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
    ];
    const wrapper = shallow(<ExportData rows={rows} />);
    wrapper.exportRowData = jest.fn();
    wrapper.setState({
      columnEntityList: [
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
      ],
    });

    expect(wrapper.state("columnEntityList")).toStrictEqual([
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
    ]);
    wrapper.setState({ downLaodFileType: ["excel"] });
    expect(wrapper.state("downLaodFileType")).toStrictEqual(["excel"]);
    wrapper.instance().exportRowData();
    expect(wrapper.state("filteredRow")).toStrictEqual([
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
    ]);
  });
  test("columnSearchLogic function", () => {
    const rows = [
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
    const wrapper = shallow(<ExportData columnsList={rows} />);
    wrapper.columnSearchLogic = jest.fn();
    wrapper.setState({
      columnEntityList: [
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
      ],
    });
    expect(wrapper.state("columnEntityList")).toStrictEqual([
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
    ]);
    wrapper.setState({});
    expect(wrapper.state("")).toStrictEqual();
    wrapper.instance().columnSearchLogic({
      target: { className: "custom__ctrl", value: "flightno" },
    });
    expect(wrapper.state("filteredRow")).toStrictEqual([]);
    wrapper.instance().columnSearchLogic({
      target: { className: "custom__ctrl", value: "book" },
    });
    expect(wrapper.state("filteredRow")).toStrictEqual([]);
  });
  test("exportValidation", () => {
    const rows = [
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
    const wrapper = shallow(<ExportData rows={rows} />);
    wrapper.exportValidation = jest.fn();
    wrapper.setState({ columnEntityList: [1, 2, 3] });
    wrapper.setState({ downLaodFileType: [1, 2, 3] });
    wrapper.instance().exportValidation();
    expect(wrapper.state("clickTag")).toStrictEqual("none");
    wrapper.setState({ columnEntityList: [] });
    wrapper.setState({ downLaodFileType: [1, 2, 3] });
    expect(wrapper.state("clickTag")).toStrictEqual("");
    expect(wrapper.state("warning")).toStrictEqual("Column");
    wrapper.setState({ columnEntityList: [1, 2, 3] });
    wrapper.setState({ downLaodFileType: [] });
    expect(wrapper.state("clickTag")).toStrictEqual("");
    expect(wrapper.state("warning")).toStrictEqual("File Type");
    wrapper.setState({ columnEntityList: [] });
    wrapper.setState({ downLaodFileType: [] });
    expect(wrapper.state("clickTag")).toStrictEqual("");
    expect(wrapper.state("warning")).toStrictEqual("File Type & Column");
  });
  it("close icon click event", () => {
    const mockCallBack = jest.fn();
    const component = mount(
      <FontAwesomeIcon
        icon={faTimes}
        className="icon-close"
        onClick={mockCallBack}
      />
    );
    component.find({ className: "icon-close" }).simulate("click");
    expect(mockCallBack).toHaveBeenCalled();
    component.unmount();
  });
  it("simulates pdf checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <input name="pdf" onChange={mockCallBack}></input>
    );
    component.find({ name: "pdf" }).simulate("change");
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("simulates all columncheckBox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <input type="checkbox" onChange={mockCallBack} checked={true} />
    );
    component.find({ type: "checkbox" }).simulate("change");
    expect(mockCallBack).toHaveBeenCalled();
  });
  it("simulates excel checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <input name="excel" onChange={mockCallBack}></input>
    );
    component.find({ name: "excel" }).simulate("change");
    expect(component).toMatchSnapshot();
  });
  it("simulates csv checkbox change event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <input name="csv" onChange={mockCallBack}></input>
    );
    component.find({ name: "csv" }).simulate("change");
    expect(component).toMatchSnapshot();
  });
  it("simulates search export input field", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <input
        type="text"
        placeholder="Search export"
        className="custom__ctrl"
        onChange={mockCallBack}
      ></input>
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
  test(`Exportdata renders with default props`, () => {
    const wrapper = shallow(<ExportData />);
    expect(wrapper).toMatchSnapshot();
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

    const wrapper = mount(<ExportData {...props} />);
    const component = mount(
      <input name="excel" onChange={mockCallBack}></input>
    );

    map.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance()),
    });

    expect(props.closeExport).not.toHaveBeenCalled();

    map.mousedown({
      target: ReactDOM.findDOMNode(component.instance()),
    });
    expect(props.closeExport).toHaveBeenCalled();
    wrapper.unmount();
  });
});
