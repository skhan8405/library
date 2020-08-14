/* eslint-disable no-undef */

import React from "react";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import ColumnsList from "../../../../src/overlays/column_chooser/columnsList";
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

describe("<ColumnsList />", () => {
    const columns = [
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

    const handleReorderList = jest.fn(() => {});

    it("mount and render", () => {
        const { asFragment } = render(
            <DndProvider
                backend={TouchBackend}
                options={{ enableMouseEvents: true }}
            >
                <ColumnsList
                    columnsArray={columns}
                    handleReorderList={handleReorderList}
                />
            </DndProvider>
        );
        expect(asFragment).not.toBeNull();
    });
});
