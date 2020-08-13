/* eslint-disable no-undef */

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { unmountComponentAtNode } from "react-dom";
import SavedFilters from "../../../src/panel/SavedFilters";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    // container *must* be attached to document so events work correctly.
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("Main Filter Panel component", () => {
    const handleListFilter = jest.fn();
    const addSavedFilters = jest.fn();
    const addingToFavourite = jest.fn();
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement("div");
        // container *must* be attached to document so events work correctly.
        document.body.appendChild(container);
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it("Save Filter ", () => {
        // eslint-disable-next-line no-unused-vars
        const { getByTestId } = render(
            <SavedFilters
                // eslint-disable-next-line react/jsx-boolean-value
                showFilter={true}
                handleListFilter={handleListFilter}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("addSavedFilters-check"));
    });
});
