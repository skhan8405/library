import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import DatePicker from "../../../src/functions/DatePicker";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("DatePicker", () => {
  const props = {
    column: {
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
  };
  act(() => {
    ReactDOM.render(<DatePicker {...props} />, container);
  });
  let component = ReactTestUtils.renderIntoDocument(<DatePicker {...props} />);
  component.getInputNode();
  component.onValueChanged({ target: { value: "01/08/2019" } });
  component.getValue();
});
