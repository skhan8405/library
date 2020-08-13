/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import DefaultColumnFilter from "../../../src/Functions/DefaultColumnFilter";
import "@testing-library/jest-dom/extend-expect";

describe("DefaultColumnFilter component", () => {
    const filterValue = "23";
    const setFilter = jest.fn(() => "222");
    const wrapper = render(
        <DefaultColumnFilter column={(filterValue, setFilter)} />
    );
    const input = wrapper.getByPlaceholderText("Search");

    it("Should check DefaultColumnFilter with onChange ", () => {
        expect(input).toBeInTheDocument();
    });
});
