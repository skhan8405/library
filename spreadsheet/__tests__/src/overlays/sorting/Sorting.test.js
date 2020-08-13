import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { render, screen, fireEvent, getByRole, getByText } from "@testing-library/react";
import Sorting from "../../../../src/overlays/sorting/Sorting";
import "@testing-library/jest-dom/extend-expect";
import { element } from "prop-types";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

const closeSorting = jest.fn();
const sortingParamsObjectList = [];
const columnFieldValue = [
    "FlightNo",
    "Date",
    "Segment From",
    "Revenue",
    "Yeild",
    "Segment To",
    "Flight Model",
    "Body Type",
    "Type",
    "Start Time",
    "End Time"
];
const clearAllSortingParams = jest.fn();
const setTableAsPerSortingParams = jest.fn(([]) => { });
const handleTableSortSwap = jest.fn(([]) => { });

test("<Sorting />", () => {
    let sortingParamsObjectList = [{
        order: "Ascending",
        sortBy: "FlightNo",
        sortOn: "Value"
    }];
    act(() => {
        ReactDOM.render(
            <Sorting
                closeSorting={closeSorting}
                sortingParamsObjectList={sortingParamsObjectList}
                columnFieldValue={columnFieldValue}
                clearAllSortingParams={clearAllSortingParams}
                setTableAsPerSortingParams={setTableAsPerSortingParams}
                handleTableSortSwap={handleTableSortSwap}
            />,
            container
        );
    });
    let component = ReactTestUtils.renderIntoDocument(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );

    component.add();
    component.copy(0);
    component.captureSortingFeildValues(
        { target: { value: "Ascending" } },
        0,
        "sortBy"
    );
    component.captureSortingFeildValues(
        { target: { value: "Descending" } },
        0,
        "order"
    );
    component.updateTableAsPerSortCondition();
    component.handleReorderListOfSort(["FlightNo",
        "Date",
        "Segment From",
        "Revenue",
        "Yeild"]);
    sortingParamsObjectList = [];
    component = ReactTestUtils.renderIntoDocument(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    component.remove(0);
    component.clearAll();
    component.handleClickOutside({
        target: {}
    });

});
it("close sorting event trigger", () => {
    let sortingParamsObjectList = [{
        order: "Ascending",
        sortBy: "FlightNo",
        sortOn: "Value"
    }];
    const { getByTestId } = render(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    fireEvent.click(getByTestId("closeSorting"));
});

it("selecting order dropDown", () => {
    let component = ReactTestUtils.renderIntoDocument(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    component.createColumnsArrayFromProps([{
        order: "Ascending",
        sortBy: "FlightNo",
        sortOn: "Value"
    }])
});
it("ApplySort event trigger", () => {
    const { getByTestId } = render(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    fireEvent.click(getByTestId("applySort"));
    const element = getByTestId("applySort")
    expect(element).toHaveTextContent('Ok')
});
it("Add Sorting event trigger", () => {
    const { getByTestId } = render(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    fireEvent.click(getByTestId("addSort"));
    fireEvent.keyDown(getByTestId("addSort"), { key: 'Enter', code: 'Enter' })
});
it("selecting Value from dropDown", () => {
    const { getAllByTestId } = render(
        <Sorting
            closeSorting={closeSorting}
            sortingParamsObjectList={sortingParamsObjectList}
            columnFieldValue={columnFieldValue}
            clearAllSortingParams={clearAllSortingParams}
            setTableAsPerSortingParams={setTableAsPerSortingParams}
            handleTableSortSwap={handleTableSortSwap}
        />
    );
    fireEvent.change(getAllByTestId("selectingValue")[0], { target: { value: "FlightNo" } });
    const element = getAllByTestId("selectingValue")[0]
    expect(element).toHaveTextContent('Value')
});
// it("Should not call action on/off click inside the ExportData", () => {
//   const map = {};
//   const mockCallBack = jest.fn();
//   document.addEventListener = jest.fn((event, cb) => {
//     map[event] = cb;
//   });
//   const props = {
//     closeSorting: jest.fn(),
//   };
//   const wrapper = mount(<Sorting {...props} />);
//   const component = mount(
//     <FontAwesomeIcon
//       className="icon-close"
//       icon={faTimes}
//       onClick={mockCallBack}
//     ></FontAwesomeIcon>
//   );
//   map.mousedown({
//     target: ReactDOM.findDOMNode(wrapper.instance()),
//   });
//   expect(props.closeSorting).not.toHaveBeenCalled();
//   map.mousedown({
//     target: ReactDOM.findDOMNode(component.instance()),
//   });
//   expect(props.closeSorting).toHaveBeenCalled();
//   wrapper.unmount();
// });
// it("simulates search export input field", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <select className="custom__ctrl" onChange={mockCallBack}></select>
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
// it("simulates  checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <select
//       className="custom__ctrl"
//       name="sortBy"
//       onChange={mockCallBack}
//       value={false}
//     ></select>
//   );
//   component.find({ name: "sortBy" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates  checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <select
//       className="custom__ctrl"
//       name="sortOn"
//       onChange={mockCallBack}
//       value={true}
//     ></select>
//   );
//   component.find({ name: "sortOn" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("simulates  checkbox change event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <select
//       className="custom__ctrl"
//       name="order"
//       onChange={mockCallBack}
//       value={false}
//     ></select>
//   );
//   component.find({ name: "order" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// test("clear all", () => {
//   const mockClearAllSortingParams = jest.fn();
//   const component = mount(
//     <Sorting clearAllSortingParams={mockClearAllSortingParams} />
//   );
//   component.clearAll = jest.fn();
//   component.instance().clearAll();
//   expect(mockClearAllSortingParams.mock.calls.length).toEqual(1);
// });
// it("copy", () => {
//   const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
//   wrapper.copy = jest.fn();
//   wrapper.setState({ sortingOrderList: ["a", "b"] });
//   wrapper.instance().copy(1);
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
// });
// it("remove", () => {
//   const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
//   wrapper.copy = jest.fn();
//   wrapper.setState({ sortingOrderList: ["a"] });
//   wrapper.instance().remove(1);
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
//   expect(wrapper.state("errorMessage")).toBe(false);
// });
// it("simulates close of sort file click event", () => {
//   const mockCallBack = jest.fn();
//   const component = shallow(
//     <select
//       className="custom__ctrl"
//       name={"sortOn"}
//       onChange={mockCallBack}
//       value={"value"}
//     >
//       <option>Value</option>
//     </select>
//   );
//   component.find({ className: "custom__ctrl" }).simulate("change");
//   expect(component).toMatchSnapshot();
// });
// it("createColumnsArrayFromProps", () => {
//   const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
//   wrapper.createColumnsArrayFromProps = jest.fn();
//   wrapper.instance().createColumnsArrayFromProps(["a", "b", "c"]);
// });
// it("captureSortingFeildValues", () => {
//   const wrapper = shallow(
//     <Sorting
//       columnFieldValue={[
//         { sortby: "a" },
//         { sortby: "a" },
//         { sortby: "a" },
//         { sortby: "a" },
//       ]}
//     />
//   );
//   wrapper.captureSortingFeildValues = jest.fn();
//   wrapper.setState({
//     sortingOrderList: [
//       { sortby: "a", sortOn: "", order: "a" },
//       { sortby: "b", sortOn: "", order: "a" },
//       { sortby: "", sortOn: "", order: "" },
//       { sortby: "d", sortOn: "", order: "" },
//     ],
//   });
//   wrapper
//     .instance()
//     .captureSortingFeildValues({ target: { value: "a" } }, 0, "sortBy");
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
//   wrapper
//     .instance()
//     .captureSortingFeildValues({ target: { value: "a" } }, 0, "order");
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
//   wrapper
//     .instance()
//     .captureSortingFeildValues({ target: { value: "a" } }, 0, "sortOn");
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
// });
// it("updateTableAsPerSortCondition", () => {
//   const mockfunc = jest.fn();
//   const wrapper = shallow(
//     <Sorting
//       columnFieldValue={["a", "b", "c"]}
//       setTableAsPerSortingParams={mockfunc}
//     />
//   );
//   wrapper.updateTableAsPerSortCondition = jest.fn();
//   wrapper.setState({ sortingOrderList: ["a", "b"] });
//   wrapper.instance().updateTableAsPerSortCondition();
//   expect(wrapper.state("errorMessage")).toBe(true);
// });
// it("handleReorderListOfSort", () => {
//   const handleTableSortSwap = jest.fn();
//   const wrapper = shallow(
//     <Sorting
//       columnFieldValue={["a", "b", "c"]}
//       handleTableSortSwap={handleTableSortSwap}
//     />
//   );
//   wrapper.instance().handleReorderListOfSort(["flight", "booking"]);
//   expect(handleTableSortSwap.mock.calls.length).toEqual(1);
// });
// it("add", () => {
//   const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
//   wrapper.copy = jest.fn();
//   wrapper.setState({ sortingOrderList: ["a", "b", "c"] });
//   wrapper.setState({ rowList: ["a", "b", "c"] });
//   wrapper.instance().add();
//   expect(wrapper.state("sortingOrderList")).not.toBeNull();
// });
// it("sort__close div click event", () => {
//   const mockFunc = jest.fn();
//   const wrapper = shallow(
//     <div className="sort__close">
//       <FontAwesomeIcon
//         className="icon-close"
//         icon={faTimes}
//         onClick={mockFunc}
//       ></FontAwesomeIcon>
//     </div>
//   );
//   wrapper.find(".sort__close").simulate("click");
//   expect(wrapper.find(".sort__close").length).toEqual(1);
// });
// it("sort__close div click event", () => {});
