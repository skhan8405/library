/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import RowDeleteOverLay from "../../src/Functions/RowDeleteOverLay";

describe("render delete", () => {
    const onCloseRowDeleteOverlayMock = jest.fn();
    const onDeleteRowFromGridMock = jest.fn();
    const deletedRowData = {
        title: "todo1"
    };

    it("should render delete and Cancel buttons", () => {
        const { getByText } = render(
            <RowDeleteOverLay
                row={deletedRowData}
                closeRowDeleteOverlay={onCloseRowDeleteOverlayMock}
                deleteRowFromGrid={onDeleteRowFromGridMock}
            />
        );
        expect(getByText("Delete")).toBeInTheDocument();
        expect(getByText("Cancel")).toBeInTheDocument();
    });

    it("Delete function should be called", () => {
        const { getByText } = render(
            <RowDeleteOverLay
                row={deletedRowData}
                closeRowDeleteOverlay={onCloseRowDeleteOverlayMock}
                deleteRowFromGrid={onDeleteRowFromGridMock}
            />
        );
        fireEvent.click(getByText("Delete"));
        expect(onDeleteRowFromGridMock).toBeCalledWith(deletedRowData);
        expect(onDeleteRowFromGridMock).toHaveBeenCalled();
    });

    it("Cancel function should be called", () => {
        const { getByText } = render(
            <RowDeleteOverLay
                row={deletedRowData}
                closeRowDeleteOverlay={onCloseRowDeleteOverlayMock}
                deleteRowFromGrid={onDeleteRowFromGridMock}
            />
        );
        fireEvent.click(getByText("Cancel"));
        expect(onCloseRowDeleteOverlayMock).toHaveBeenCalled();
    });
});
