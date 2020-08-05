import React from "react";
import ReactDOM from "react-dom";
import RowOptions from "../../../src/Functions/RowOptions"
import {render, fireEvent} from "@testing-library/react"

const initialProps = {
    row:"myrow", bindRowEditOverlay:jest.fn(), bindRowDeleteOverlay:jest.fn()
    };

it( "renders without crashing", () => {
    const div = document.createElement("div");
    render(<RowOptions {...initialProps}></RowOptions>, div)
} )

it( "Click the row options", () => {
    const div2 = document.createElement("div");
    const { getByText } = render(<RowOptions {...initialProps}></RowOptions>, div2)
    fireEvent.click(div2.contains("icon-row-options"));
    getByText("Edit");
} )