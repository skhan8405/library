/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import ColumnsList from "../../../../src/overlays/column_chooser/columnsList";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
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
    const props = {
        columnsArray: [...columns]
    };
    const handleReorderList = jest.fn(() => {});

    it("mount and render", () => {
        ReactDOM.render(
            <DndProvider
                backend={TouchBackend}
                options={{ enableMouseEvents: true }}
            >
                <ColumnsList
                    props={props}
                    columnsArray={columns}
                    handleReorderList={handleReorderList}
                />
            </DndProvider>,
            container
        );
        const { getAllByTestId } = render(
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
        expect(getAllByTestId("columnItem")).toHaveLength(2);
        const item = getAllByTestId("columnItem")[0];
        fireEvent.drag(item);
    });
});
