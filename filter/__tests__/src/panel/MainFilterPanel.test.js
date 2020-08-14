/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import ReactDOM, { unmountComponentAtNode } from "react-dom";
import MainFilterPanel from "../../../src/panel/MainFilterPanel";

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
    const chipArray = {
        applyFilterChip: {
            applyFilter: [
                {
                    name: "Departure Port",
                    type: "Airport",
                    dataType: "AutoComplete",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        }
                    ]
                }
            ]
        }
    };
    const conditionChipArray = {
        applyFilterChip: {
            applyFilter: [
                {
                    name: "Departure Port",
                    condition: "ArrivalPort",
                    dataType: "AutoComplete",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        }
                    ]
                }
            ]
        }
    };
    const fieldChipArray = {
        applyFilterChip: {
            applyFilter: [
                {
                    name: "Departure Port",
                    dataType: "AutoComplete",
                    fieldValue: "ArrivalPort",
                    enabled: true,
                    value: "ANB"
                }
            ]
        }
    };
    const chipCountArray = {
        applyFilterChip: {
            applyFilter: [
                {
                    name: "Departure Port",
                    dataType: "AutoComplete",
                    enabled: true,
                    value: "ABS"
                }
            ]
        }
    };
    const emptyChipArray = {
        applyFilterChip: {
            applyFilter: []
        }
    };
    const showDrawer = jest.fn();
    const addAppliedFilters = jest.fn();
    const addSavedFilters = jest.fn();
    const addingToFavourite = jest.fn();

    it("Should check MainFilterPanel ", () => {
        ReactDOM.render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={chipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />,
            container
        );
        expect(chipArray.applyFilterChip).toBeTruthy;
    });

    it("Show Count ", () => {
        ReactDOM.render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={[]}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />,
            container
        );
        expect(chipArray.applyFilterChip).toBeTruthy;
    });

    it("Show Count 1 ", () => {
        render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={emptyChipArray}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );
        expect(chipArray.applyFilterChip).toBeTruthy;
    });

    it(" Check type click ", () => {
        const wrapper = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={chipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );

        const typeCheckElm = wrapper.getByTestId("typecheck");
        fireEvent.click(typeCheckElm);
    });

    it(" Check condition click ", () => {
        const wrapper = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={conditionChipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );

        const conditionElm = wrapper.getByTestId("conditionValue-check");
        fireEvent.click(conditionElm);
    });

    it(" Check fieldValue click ", () => {
        const wrapper = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={fieldChipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );

        const fieldValueElm = wrapper.getByTestId("fieldValue-check");
        fireEvent.click(fieldValueElm);
    });

    it("Chip Count ", () => {
        const wrapper = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={chipCountArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={addingToFavourite}
            />
        );

        const chipCountElm = wrapper.getByTestId("chipCount-check");
        fireEvent.click(chipCountElm);
    });

    it("Show Drawer check ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={chipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
            />
        );
        fireEvent.click(getByTestId("showDrawer-check"));
    });

    it("Handle List Filter Check ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={chipArray.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
            />
        );
        fireEvent.click(getByTestId("handleListFilterCheck"));
    });
});
