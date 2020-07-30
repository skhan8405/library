import React from "react";
import { shallow, mount } from "enzyme";
import ExtDataGrid from "../../../src/common/extDataGrid";

describe("<ExtDataGrid />", () => {
  let rows = [
    { name: "Shyam", age: 24 },
    { name: "Abcd", age: 25 },
  ];
  const mockCellRangeSelection = jest.fn();
  it("mount", () => {
    document.addEventListener[0] = jest.fn(() => {
      document.getElementsByClassName("react-grid-Viewport")[0];
    });
    const wrapper = mount(
      <ExtDataGrid
        columns={["name", "age"]}
        rowsCount={rows.length}
        rowGetter={(i) => rows[i]}
        cellRangeSelection={mockCellRangeSelection}
      />
    );
    wrapper.metricsUpdated = jest.fn();
    expect(wrapper).not.toBeNull();
    expect(wrapper.instance().metricsUpdated()).toBeNull();
    // TODO I am getting some error may be becasue I gave invalid properties. Please correct it.
    wrapper.unmount();
  });
  it("metricsUpdated function",()=>{
      
  })
});
