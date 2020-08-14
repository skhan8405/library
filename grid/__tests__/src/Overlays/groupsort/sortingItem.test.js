/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import MultiBackend, { TouchTransition } from "react-dnd-multi-backend";
import { act } from "react-dom/test-utils";
import SortList from "../../../../src/Overlays/groupsort/sortingList";
import SortItem from "../../../../src/Overlays/groupsort/sortingItem";
import "@testing-library/jest-dom/extend-expect";

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

const originalColumns = [
    {
        Header: "Flight",
        accessor: "flight",
        columnId: "flight-id",
        width: 100,
        innerCells: [
            {
                Header: "Flight No",
                accessor: "flightno"
            },
            {
                Header: "Flight Date",
                accessor: "date"
            }
        ],
        sortValue: "flightno"
    },
    {
        Header: "Flight1",
        accessor: "flight1",
        columnId: "flight1-id",
        width: 100,
        innerCells: [
            {
                Header: "Flight No1",
                accessor: "flightno1"
            },
            {
                Header: "Date1",
                accessor: "date1"
            }
        ],
        sortValue: "flightno1"
    }
];

const sortOptions = [
    {
        order: "Ascending",
        sortBy: "flight1",
        sortOn: "date1"
    },
    {
        order: "Ascending",
        sortBy: "flight",
        sortOn: "flightno"
    }
];

const singleSortOption = {
    order: "Ascending",
    sortBy: "flight1",
    sortOn: "date1"
};

const updateSortingOptions = jest.fn();
const updateSingleSortingOption = jest.fn();
const copySortOption = jest.fn();
const deleteSortOption = jest.fn();
const moveSortMock = jest.fn();
const findSortMock = jest.fn(() => {
    return { index: 0 };
});

describe("testing sort item ", () => {
    it("should renders parent component", () => {
        const { getByText, container } = render(
            <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <SortList
                    sortOptions={sortOptions}
                    originalColumns={originalColumns}
                    updateSortingOptions={updateSortingOptions}
                    updateSingleSortingOption={updateSingleSortingOption}
                    copySortOption={copySortOption}
                    deleteSortOption={deleteSortOption}
                />
            </DndProvider>
        );
        const childComponent = container.querySelector("div");
        expect(childComponent).toBeInTheDocument();
        expect(getByText("Flight Date")).toBeInTheDocument();
    });
    it("should renders child component", () => {
        const { container } = render(
            <DndProvider
                backend={MultiBackend}
                options={HTML5toTouch}
                sortOptions={sortOptions}
                originalColumns={originalColumns}
                updateSortingOptions={updateSortingOptions}
                updateSingleSortingOption={updateSingleSortingOption}
                copySortOption={copySortOption}
                deleteSortOption={deleteSortOption}
            >
                <SortItem
                    id={0}
                    originalColumns={originalColumns}
                    sortOption={singleSortOption}
                    moveSort={moveSortMock}
                    findSort={findSortMock}
                    updateSingleSortingOption={updateSingleSortingOption}
                    copySortOption={copySortOption}
                    deleteSortOption={deleteSortOption}
                />
            </DndProvider>
        );
        const childComponent = container.querySelector("div");
        expect(childComponent).toBeInTheDocument();
    });
    it("should renders after changing dropdown values", () => {
        const { getByText } = render(
            <DndProvider
                backend={MultiBackend}
                options={HTML5toTouch}
                sortOptions={sortOptions}
                originalColumns={originalColumns}
                updateSortingOptions={updateSortingOptions}
                updateSingleSortingOption={updateSingleSortingOption}
                copySortOption={copySortOption}
                deleteSortOption={deleteSortOption}
            >
                <SortItem
                    id={0}
                    originalColumns={originalColumns}
                    sortOption={singleSortOption}
                    moveSort={moveSortMock}
                    findSort={findSortMock}
                    updateSingleSortingOption={updateSingleSortingOption}
                    copySortOption={copySortOption}
                    deleteSortOption={deleteSortOption}
                />
            </DndProvider>
        );
        // Change Sort By
        const sortBySelectList = document
            .querySelector(".sort__bodyContent")
            .getElementsByClassName("sort__reorder")[1]
            .getElementsByTagName("select")[0];

        act(() => {
            sortBySelectList.dispatchEvent(
                new MouseEvent("change", { bubbles: true })
            );
        });
        expect(getByText("Flight1")).toBeInTheDocument();
        // Change Sort On
        const sortOnSelectList = document
            .querySelector(".sort__bodyContent")
            .getElementsByClassName("sort__reorder")[2]
            .getElementsByTagName("select")[0];

        act(() => {
            sortOnSelectList.dispatchEvent(
                new MouseEvent("change", { bubbles: true })
            );
        });
        expect(getByText("Date1")).toBeInTheDocument();
        // Change Sort Order
        const sortOrderSelectList = document
            .querySelector(".sort__bodyContent")
            .getElementsByClassName("sort__reorder")[3]
            .getElementsByTagName("select")[0];

        act(() => {
            sortOrderSelectList.dispatchEvent(
                new MouseEvent("change", { bubbles: true })
            );
        });
        expect(getByText("Descending")).toBeInTheDocument();
    });
    it("should renders after copying and deleting sort options", () => {
        render(
            <DndProvider
                backend={MultiBackend}
                options={HTML5toTouch}
                sortOptions={sortOptions}
                originalColumns={originalColumns}
                updateSortingOptions={updateSortingOptions}
                updateSingleSortingOption={updateSingleSortingOption}
                copySortOption={copySortOption}
                deleteSortOption={deleteSortOption}
            >
                <SortItem
                    id={0}
                    originalColumns={originalColumns}
                    sortOption={singleSortOption}
                    moveSort={moveSortMock}
                    findSort={findSortMock}
                    updateSingleSortingOption={updateSingleSortingOption}
                    copySortOption={copySortOption}
                    deleteSortOption={deleteSortOption}
                />
            </DndProvider>
        );
        // Copy sort
        const copyIcon = document.getElementsByClassName("sort__icon")[0];
        act(() => {
            copyIcon.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        });
        expect(copySortOption).toHaveBeenCalledTimes(1);
        // Delete sort
        const deleteIcon = document.getElementsByClassName("sort__icon")[1];
        act(() => {
            deleteIcon.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
        expect(deleteSortOption).toHaveBeenCalledTimes(1);
    });
});
