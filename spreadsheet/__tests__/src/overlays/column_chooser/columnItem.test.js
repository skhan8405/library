import React from "react";
import ReactTestUtils, { act } from "react-dom/test-utils";
import ColumnItem from "../../../../src/overlays/column_chooser/columnItem";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";




describe("<ColumnItem />", () => {
  const props = {
    id: 1,
    text: "text",
    moveColumn: jest.fn(),
    findColumn: jest.fn(() => 1),
    useDrop: jest.fn(),
  };
  it("mount", () => {
    const wrapper = mount(
      <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
        <ColumnItem {...props} />
      </DndProvider>
    );

    expect(wrapper.find("ColumnItem.useDrag.end")).not.toBeNull();
    expect(wrapper.find("ColumnItem.useDrop.canDrop")).not.toBeNull();
    expect(wrapper.find("div").length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
