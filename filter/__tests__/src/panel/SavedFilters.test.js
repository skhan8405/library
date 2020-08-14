/* eslint-disable no-undef */

import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SavedFilters from "../../../src/panel/SavedFilters";

// let container = null;
const applyFilter = [
    {
        name: "Departure Port",
        dataType: "AutoComplete",
        enabled: true,
        value: "ABS"
    }
];

const localStorageMock = (function () {
    let store = {};
    return {
        // eslint-disable-next-line object-shorthand
        getItem: function (key) {
            return store[key];
        },
        // eslint-disable-next-line object-shorthand
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        // eslint-disable-next-line object-shorthand
        clear: function () {
            store = {};
        },
        // eslint-disable-next-line object-shorthand
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
