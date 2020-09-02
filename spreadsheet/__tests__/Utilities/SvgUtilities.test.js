import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
    IconColumns,
    IconAngle,
    IconFilter,
    IconShare,
    IconGroupSort,
    IconSort,
    IconEdit,
    IconPencil,
    IconTick,
    IconCancel,
    IconSearch,
    RowDelete,
    RowEdit,
    IconClose,
    IconJustify,
    IconCsv,
    IconExcel,
    IconPdf,
    IconNav,
    SortCopy,
    SortDelete
} from "../../src/Utilities/SvgUtilities";
import "idempotent-babel-polyfill";
let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

describe("Svg Utilities File", () => {
    test("Icon Columns Validation", () => {
        const { iconColumns } = render(<IconColumns />);
        const { iconAngle } = render(<IconAngle />);
        const { iconFilter } = render(<IconFilter />);
        const { iconShare } = render(<IconShare />);
        const { iconGroupSort } = render(<IconGroupSort />);
        const { iconSort } = render(<IconSort />);
        const { iconEdit } = render(<IconEdit />);
        const { iconPencil } = render(<IconPencil />);
        const { iconTick } = render(<IconTick />);
        const { iconCancel } = render(<IconCancel />);
        const { iconSearch } = render(<IconSearch />);
        const { rowDelete } = render(<RowDelete />);
        const { rowEdit } = render(<RowEdit />);
        const { iconClose } = render(<IconClose />);
        const { iconJustify } = render(<IconJustify />);
        const { iconCsv } = render(<IconCsv />);
        const { iconExcel } = render(<IconExcel />);
        const { iconPdf } = render(<IconPdf />);
        const { iconNav } = render(<IconNav />);
        const { sortCopy } = render(<SortCopy />);
        const { sortDelete } = render(<SortDelete />);
    });
});
