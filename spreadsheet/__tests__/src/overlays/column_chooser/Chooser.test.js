/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import ColumnReordering from "../../../../src/overlays/column_chooser/Chooser";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
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

const columns = [
    {
        key: "flightno",
        name: "FlightNo",
        draggable: false,
        editor: "Text",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "date",
        name: "Date",
        draggable: false,
        editor: "DatePicker",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    },
    {
        key: "segmentfrom",
        name: "Segment From",
        draggable: false,
        editor: "DropDown",
        formulaApplicable: false,
        sortable: true,
        resizable: true,
        filterable: true,
        width: 150,
        filterType: "autoCompleteFilter"
    }
];
const maxLeftPinnedColumn = 5;
const closeColumnReOrdering = jest.fn();
const headerKeys = ["FlightNo", "Date", "Segment From"];
const existingPinnedHeadersList = [];
const updateTableAsPerRowChooser = jest.fn();
const handleheaderNameList = jest.fn();

test("addToColumnReorderEntityList change trigger", () => {
    // afterEach(cleanup)
    const { getAllByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getAllByTestId("addToColumnReorderEntityList")[0], {
        target: { checked: true }
    });
    // const element = getAllByTestId("addToColumnReorderEntityList");
});
test("selectAllCheckBox change trigger", () => {
    // afterEach(cleanup)
    const { getByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getByTestId("selectAllCheckBox"), {
        target: { checked: true }
    });
});
test("chooser", () => {
    act(() => {
        ReactDOM.render(
            <ColumnReordering
                columns={columns}
                maxLeftPinnedColumn={maxLeftPinnedColumn}
                updateTableAsPerRowChooser={updateTableAsPerRowChooser}
                headerKeys={headerKeys}
                closeColumnReOrdering={closeColumnReOrdering}
                existingPinnedHeadersList={existingPinnedHeadersList}
                handleheaderNameList={handleheaderNameList}
            />,
            container
        );
    });
    let component = ReactTestUtils.renderIntoDocument(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />,
        container
    );
    component.resetColumnReorderList();
    component.componentWillUnmount();
    component.resetColumnReorderList();
    component.selectAllToColumnReOrderList();
    component.selectAllToColumnReOrderList();
    component.addToColumnReorderEntityList("Segment From");
    component.filterColumnReorderList({ target: { value: "FlightNo" } });
    component.filterColumnReorderList({ target: { value: "" } });
    component.reArrangeLeftPinnedColumn("Segment From");
    component.setWrapperRef("columns--grid");
    component.handleReorderList([
        {
            key: "flightno",
            name: "FlightNo",
            draggable: false,
            editor: "Text",
            formulaApplicable: false,
            sortable: true,
            resizable: true,
            filterable: true,
            width: 150,
            filterType: "autoCompleteFilter"
        },
        {
            key: "date",
            name: "Date",
            draggable: false,
            editor: "DatePicker",
            formulaApplicable: false,
            sortable: true,
            resizable: true,
            filterable: true,
            width: 150,
            filterType: "autoCompleteFilter"
        },
        {
            key: "segmentfrom",
            name: "Segment From",
            draggable: false,
            editor: "DropDown",
            formulaApplicable: false,
            sortable: true,
            resizable: true,
            filterable: true,
            width: 150,
            filterType: "autoCompleteFilter"
        }
    ]);
    component.handleClickOutside({
        target: "parentDiv"
    });
});
test("render the chooser", () => {
    const { asFragment } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    expect(
        asFragment(
            <ColumnReordering
                columns={columns}
                maxLeftPinnedColumn={maxLeftPinnedColumn}
                updateTableAsPerRowChooser={updateTableAsPerRowChooser}
                headerKeys={headerKeys}
                closeColumnReOrdering={closeColumnReOrdering}
                existingPinnedHeadersList={existingPinnedHeadersList}
                handleheaderNameList={handleheaderNameList}
            />
        )
    ).toMatchSnapshot();
});
it("reset button click event", () => {
    const { getByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getByTestId("resetButton"));
    const element = getByTestId("resetButton");
    expect(element).toHaveTextContent("Reset");
});
it("cancel button click event", () => {
    const { getByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getByTestId("cancelButton"));
    const element = getByTestId("cancelButton");
    expect(element).toHaveTextContent("Cancel");
});
it("save button click event", () => {
    const { getByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getByTestId("saveButton"));
    const element = getByTestId("saveButton");
    expect(element).toHaveTextContent("Save");
});
it("close column reordering event", () => {
    const { getByTestId } = render(
        <ColumnReordering
            columns={columns}
            maxLeftPinnedColumn={maxLeftPinnedColumn}
            updateTableAsPerRowChooser={updateTableAsPerRowChooser}
            headerKeys={headerKeys}
            closeColumnReOrdering={closeColumnReOrdering}
            existingPinnedHeadersList={existingPinnedHeadersList}
            handleheaderNameList={handleheaderNameList}
        />
    );
    fireEvent.click(getByTestId("closeColumnReordering"));
});
