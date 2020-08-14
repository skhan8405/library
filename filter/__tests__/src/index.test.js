/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import Filter from "../../src/index";
import FilterData from "./data.json";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Filter filterData={FilterData} />, div);
    ReactDOM.unmountComponentAtNode(div);
});
