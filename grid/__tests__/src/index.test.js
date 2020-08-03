import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Grid from "../../src/index";


it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <Grid
        title="AWBs"
        gridHeight="80vh"
        gridWidth="100%"
    />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });