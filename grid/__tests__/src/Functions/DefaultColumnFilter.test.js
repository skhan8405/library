import React, { memo } from "react";
import { render, fireEvent } from "@testing-library/react";
import DefaultColumnFilter, { setFilter } from "../../../src/Functions/DefaultColumnFilter";

describe("DefaultColumnFilter component", () => {
    const filterValue = [{ value: "flight" }];
    const setFilter = [{ value: "flight" }];
    const wrapper = render(<DefaultColumnFilter column={(filterValue, setFilter)} />);
    const input = wrapper.getByPlaceholderText("Search");

    it("Should check DefaultColumnFilter with onChange ", () => {
        expect(input).toBeInTheDocument;
        fireEvent.change(input, {
            target: { value: "Flight" }
        });
    });
});
