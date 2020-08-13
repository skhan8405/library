import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

import { unmountComponentAtNode } from "react-dom";

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
    const props = {
        applyFilterChip: {
            applyFilter: [
                {
                    name: "Arrival Port",
                    type: "Airport",
                    dataType: "AutoComplete",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        },
                        {
                            key: "ABA",
                            value: "ABA"
                        }
                    ]
                },
                {
                    name: "Arrival Port",
                    dataType: "AutoComplete",
                    condition: "Check Condition",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        },
                        {
                            key: "ABA",
                            value: "ABA"
                        }
                    ]
                },
                {
                    name: "Arrival Port",
                    dataType: "AutoComplete",
                    fieldValue: "Check Field Value",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        },
                        {
                            key: "ABA",
                            value: "ABA"
                        }
                    ]
                },
                {
                    name: "Arrival Port",
                    dataType: "AutoComplete",
                    enabled: true,
                    value: [
                        {
                            key: "AAB",
                            value: "AAB"
                        },
                        {
                            key: "ABA",
                            value: "ABA"
                        }
                    ]
                }
            ]
        },
        addingToFavourite: ""
    };

    const showDrawer = jest.fn();
    const addAppliedFilters = {};
    const addSavedFilters = jest.fn();
    // const addingToFavourite = jest.fn();
    const setCountShow = jest.fn();

    let listFilter = false;

    it("Should be available in MainFilterPanel ", () => {
        const wrapper = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />,
            container
        );
    });

    it(" Check type click ", () => {
        // const element = .getAllByTestId("typecheck");
        // console.log(element);
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip.applyFilter}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("typecheck"));
    });

    it(" Check condition click ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip.applyFilter}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("conditionValue-check"));
    });

    it(" Check fieldValue click ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip.applyFilter}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("fieldValue-check"));
    });

    it("Chip Count ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip.applyFilter}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("chipCount-check"));
    });

    it("Show Drawer check ", () => {
        const { getByTestId } = render(
            <MainFilterPanel
                showDrawer={showDrawer}
                applyFilterChip={props.applyFilterChip.applyFilter}
                addAppliedFilters={addAppliedFilters}
                addSavedFilters={addSavedFilters}
                addingToFavourite={props.addingToFavourite}
            />
        );
        fireEvent.click(getByTestId("showDrawer-check"));
    });
});
