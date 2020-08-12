/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
/* eslint-disable no-unused-vars */
import regeneratorRuntime from "regenerator-runtime";
import GlobalFilter from "../../../src/Functions/GlobalFilter";

describe("render global search", () => {
    it("should search the given value", () => {
        const setGlobalFilter = jest.fn();
        const globalFilter = "XX2225";

        const { container } = render(
            <GlobalFilter
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
        );

        const input = container.getElementsByClassName("txt").item(0);
        fireEvent.change(input, { target: { value: "ABC1178" } });
        expect(input.value).toBe("ABC1178");

        fireEvent.change(input, { target: { value: "XYZ5639" } });
        expect(input.value).toBe("XYZ5639");
    });
});
