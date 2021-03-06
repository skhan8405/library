/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import ColumnsList from "../../../src/Overlays/managecolumns/columnsList";

describe("ColumnsList unit test", () => {
    const HTML5toTouch = {
        backends: [
            {
                backend: HTML5Backend
            },
            {
                backend: TouchBackend,
                options: { enableMouseEvents: true },
                preview: true,
                transition: TouchTransition
            }
        ]
    };
    const managedColumns = [
        {
            Header: "Id",
            accessor: "travelId",
            width: 50,
            disableFilters: true,
            columnId: "column_0",
            isDisplayInExpandedRegion: false,
            display: true
        },
        {
            Header: () => {
                return <span className="flightHeader">Flight</span>;
            },
            title: "Flight",
            accessor: "flight",
            width: 100,
            innerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno",
                    display: true,
                    cellId: "column_1_cell_0",
                    isSearchable: true
                },
                {
                    Header: "Date",
                    accessor: "date",
                    display: true,
                    cellId: "column_1_cell_1",
                    isSearchable: true
                }
            ],
            sortValue: "flightno",
            columnId: "column_1",
            isDisplayInExpandedRegion: false,
            display: true,
            isSearchable: true
        }
    ];
    const updateColumnsInState = jest.fn();
    const selectInnerCells = jest.fn();

    afterEach(cleanup);

    it("should renders component", () => {
        const { getByText } = render(
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <ColumnsList
                    managedColumns={managedColumns}
                    onColumnReorder={updateColumnsInState}
                    onInnerCellChange={selectInnerCells}
                />
            </DndProvider>
        );
        expect(getByText("Flight")).toBeInTheDocument();
    });
    it("should work drag and drop functionality", () => {
        const createBubbledEvent = (type, props = {}) => {
            const event = new Event(type, { bubbles: true });
            Object.assign(event, props);
            return event;
        };
        const { getAllByTestId } = render(
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <ColumnsList
                    managedColumns={managedColumns}
                    onColumnReorder={updateColumnsInState}
                    onInnerCellChange={selectInnerCells}
                />
            </DndProvider>
        );
        expect(getAllByTestId("columnItem")).toHaveLength(2);
        const startingNode = getAllByTestId("columnItem")[0];
        const endingNode = getAllByTestId("columnItem")[1];
        startingNode.dispatchEvent(
            createBubbledEvent("dragstart", { clientX: 0, clientY: 0 })
        );
        endingNode.dispatchEvent(
            createBubbledEvent("drop", { clientX: 0, clientY: 1 })
        );
    });
});
