/* eslint-disable no-undef */

import React from "react";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import SortingList from "../../../../src/overlays/sorting/SortingList";
import "@testing-library/jest-dom/extend-expect";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("<SortingList />", () => {
    const sortsArray = [
        {
            id: 1,
            key: "flightno",
            text: "FlightNo"
        },
        {
            id: 2,
            key: "date",
            text: "Date"
        },
        {
            id: 3,
            key: "segmentfrom",
            text: "Segment From"
        }
    ];
    const handleReorderListOfSort = jest.fn(() => {});

    it("mount and render", () => {
        const { asFragment } = render(
            <DndProvider
                backend={TouchBackend}
                options={{ enableMouseEvents: true }}
            >
                <SortingList
                    sortsArray={sortsArray}
                    handleReorderListOfSort={handleReorderListOfSort}
                />
            </DndProvider>
        );
        expect(asFragment).not.toBeNull();
    });
});
