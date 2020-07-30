import React from "react";
import { shallow, mount } from "enzyme";
import DatePicker from "../../../src/functions/DatePicker";

describe("<DatePicker />", () => {
  it("mount", () => {
    const props = {
      column: "",
    };
    const wrapper = mount(<DatePicker {...props} />);
    expect(wrapper).not.toBeNull();
    expect(wrapper.find("input").type()).toEqual("input"); // render input
    expect(wrapper.find("input").props()["type"]).toEqual("date"); // type='date'
    wrapper.find("input").simulate("change");
    wrapper.setState({ value: new Date() });
    const instance = wrapper.instance();
    expect(instance.getValue()).not.toBeNull(); // calling getValue method directly - this is an anti pattern :)
    expect(instance.getInputNode()).not.toBeNull();
  });
});
