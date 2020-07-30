import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import Sorting from "../../../../src/overlays/sorting/Sorting";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

describe("<Sorting />", () => {
  it("Should not call action on/off click inside the ExportData", () => {
    const map = {};
    const mockCallBack = jest.fn();
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const props = {
      closeSorting: jest.fn(),
    };

    const wrapper = mount(<Sorting {...props} />);
    const component = mount(
      <FontAwesomeIcon
        className="icon-close"
        icon={faTimes}
        onClick={mockCallBack}
      ></FontAwesomeIcon>
    );

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

  test("clear all", () => {
    const mockClearAllSortingParams = jest.fn();
    const component = mount(
      <Sorting clearAllSortingParams={mockClearAllSortingParams} />
    );
    component.clearAll = jest.fn();
    component.instance().clearAll();
    expect(mockClearAllSortingParams.mock.calls.length).toEqual(1);
  });

  it("copy", () => {
    const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
    wrapper.copy = jest.fn();
    wrapper.setState({ sortingOrderList: ["a", "b"] });
    wrapper.instance().copy(1);
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
  });

  it("remove", () => {
    const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
    wrapper.copy = jest.fn();
    wrapper.setState({ sortingOrderList: ["a"] });
    wrapper.instance().remove(1);
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
    expect(wrapper.state("errorMessage")).toBe(false);
  });

  it("simulates close of sort file click event", () => {
    const mockCallBack = jest.fn();
    const component = shallow(
      <select
        className="custom__ctrl"
        name={"sortOn"}
        onChange={mockCallBack}
        value={"value"}
      >
        <option>Value</option>
      </select>
    );
    component.find({ className: "custom__ctrl" }).simulate("change");
    expect(component).toMatchSnapshot();
  });

  it("createColumnsArrayFromProps", () => {
    const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
    wrapper.createColumnsArrayFromProps = jest.fn();
    wrapper.instance().createColumnsArrayFromProps(["a", "b", "c"]);
  });

  it("captureSortingFeildValues", () => {
    const wrapper = shallow(
      <Sorting
        columnFieldValue={[
          { sortby: "a" },
          { sortby: "a" },
          { sortby: "a" },
          { sortby: "a" },
        ]}
      />
    );
    wrapper.captureSortingFeildValues = jest.fn();
    wrapper.setState({
      sortingOrderList: [
        { sortby: "a", sortOn: "", order: "a" },
        { sortby: "b", sortOn: "", order: "a" },
        { sortby: "", sortOn: "", order: "" },
        { sortby: "d", sortOn: "", order: "" },
      ],
    });
    wrapper
      .instance()
      .captureSortingFeildValues({ target: { value: "a" } }, 0, "sortBy");
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
    wrapper
      .instance()
      .captureSortingFeildValues({ target: { value: "a" } }, 0, "order");
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
    wrapper
      .instance()
      .captureSortingFeildValues({ target: { value: "a" } }, 0, "sortOn");
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
  });

  it("updateTableAsPerSortCondition", () => {
    const mockfunc = jest.fn();
    const wrapper = shallow(
      <Sorting
        columnFieldValue={["a", "b", "c"]}
        setTableAsPerSortingParams={mockfunc}
      />
    );
    wrapper.updateTableAsPerSortCondition = jest.fn();
    wrapper.setState({ sortingOrderList: ["a", "b"] });
    wrapper.instance().updateTableAsPerSortCondition();
    expect(wrapper.state("errorMessage")).toBe(false);
  });

  it("handleReorderListOfSort", () => {
    const handleTableSortSwap = jest.fn();
    const wrapper = shallow(
      <Sorting
        columnFieldValue={["a", "b", "c"]}
        handleTableSortSwap={handleTableSortSwap}
      />
    );
    wrapper.instance().handleReorderListOfSort(["flight", "booking"]);
    expect(handleTableSortSwap.mock.calls.length).toEqual(1);
  });

  it("add", () => {
    const wrapper = shallow(<Sorting columnFieldValue={["a", "b", "c"]} />);
    wrapper.copy = jest.fn();
    wrapper.setState({ sortingOrderList: ["a", "b", "c"] });
    wrapper.setState({ rowList: ["a", "b", "c"] });
    wrapper.instance().add();
    expect(wrapper.state("sortingOrderList")).not.toBeNull();
  });
});
