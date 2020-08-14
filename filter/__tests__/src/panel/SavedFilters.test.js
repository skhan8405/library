/* eslint-disable no-undef */

import React from "react";
import "@testing-library/jest-dom";
import ReactDOM, { unmountComponentAtNode } from "react-dom";
import SavedFilters from "../../../src/panel/SavedFilters";
import { fireEvent, render } from "@testing-library/react";

let container = null;
const applyFilter = [
    {
        name: "Departure Port",
        dataType: "AutoComplete",
        enabled: true,
        value: "ABS"
    }
];

var localStorageMock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key) {
            delete store[key];
        }
    };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("savedFilters", JSON.stringify(applyFilter));
});

describe("Saved Filter Panel component", () => {
    const handleListFilter = jest.fn();
    const addSavedFilters = jest.fn();

    it("Save Filter ", () => {
        // eslint-disable-next-line no-unused-vars
        const wrapper = render(
            <SavedFilters
                // eslint-disable-next-line react/jsx-boolean-value
                showFilter={true}
                handleListFilter={handleListFilter}
                addSavedFilters={addSavedFilters}
            />
        );
        const saveFilterElm = wrapper.getByTestId("addSavedFilters-check");
        fireEvent.click(saveFilterElm);
    });
});
