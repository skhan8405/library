/* eslint-disable no-undef */
import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/dom";
import ExportData from "../../../../src/Overlays/exportdata/index";

describe("Export Data unit test", () => {
    global.URL.createObjectURL = jest.fn();
    const mocktoggleExportDataOverlay = jest.fn();
    const mockAdditionalColumn = [
        {
            Header: "Remarks",
            innerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                }
            ],
            columnId: "ExpandColumn",
            displayInExpandedRegion: true,
            originalInnerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                }
            ]
        }
    ];
    const mockColumns = [
        {
            Header: "Id",
            accessor: "travelId",
            width: 50,
            disableFilters: true,
            columnId: "column_0",
            displayInExpandedRegion: false
        },
        {
            Header: "Flight",
            accessor: "flight",
            width: 100,
            innerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno"
                },
                {
                    Header: "Date",
                    accessor: "date"
                }
            ],
            sortValue: "flightno",
            columnId: "column_1",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno"
                },
                {
                    Header: "Date",
                    accessor: "date"
                }
            ]
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            columnId: "column_8",
            displayInExpandedRegion: false
        }
    ];
    const mockOriginalColumns = [
        {
            Header: "Id",
            accessor: "travelId",
            width: 50,
            disableFilters: true,
            columnId: "column_0",
            displayInExpandedRegion: false
        },
        {
            Header: "Flight",
            accessor: "flight",
            width: 100,
            innerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno"
                },
                {
                    Header: "Date",
                    accessor: "date"
                }
            ],
            sortValue: "flightno",
            columnId: "column_1",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Flight No",
                    accessor: "flightno"
                },
                {
                    Header: "Date",
                    accessor: "date"
                }
            ]
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            columnId: "column_8",
            displayInExpandedRegion: false
        }
    ];
    const mockRows = [
        {
            id: "0",
            original: {
                travelId: 0,
                flight: {
                    flightno: "XX2225",
                    date: "31-Aug-2016"
                },
                sr: "74/ AWBs",
                remarks: "Enim aute magna ipsum magna"
            },
            index: 0,
            depth: 0,
            cells: [{}],
            values: {
                travelId: 0,
                flight: {
                    flightno: "XX2225",
                    date: "31-Aug-2016"
                },
                sr: "74/ AWBs",
                remarks: "Enim aute magna ipsum magna"
            },
            originalSubRows: [],
            subRows: [],
            canExpand: false,
            isSelected: false,
            isSomeSelected: false
        },
        {
            id: "1",
            original: {
                travelId: 1,
                flight: {
                    flightno: "XX6983",
                    date: "23-May-2016"
                },
                sr: "84/ AWBs",
                remarks: "Enim aute magna ipsum magna"
            },
            index: 1,
            depth: 0,
            cells: [{}],
            values: {
                travelId: 1,
                flight: {
                    flightno: "XX6983",
                    date: "23-May-2016"
                },
                sr: "84/ AWBs",
                remarks: "Enim aute magna ipsum magna"
            },
            originalSubRows: [],
            subRows: [],
            canExpand: false,
            isSelected: false,
            isSomeSelected: false
        }
    ];
    afterEach(cleanup);
    let container;
    beforeAll(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    it("should render exportdata component", () => {
        const { getByText } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        screen.debug();
        expect(getByText("Export As")).toBeInTheDocument();
    });
    it("should render empty div with exportOverlay false", () => {
        const component = render(
            <ExportData
                isExportOverlayOpen={false}
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        screen.debug();
        expect(component).toBeDefined();
    });
    it("should check columns", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        expect(selectAllCheck.checked).toEqual(true);
        fireEvent.click(selectAllCheck);
        expect(selectAllCheck.checked).toEqual(false);
    });
    it("should check all file types and export data", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        expect(selectAllCheck.checked).toEqual(true);
        const selectPdf = getByTestId("chk_pdf_test");
        fireEvent.click(selectPdf);
        expect(selectPdf.checked).toEqual(true);
        const selectExcel = getByTestId("chk_excel_test");
        fireEvent.click(selectExcel);
        expect(selectExcel.checked).toEqual(true);
        const selectCsv = getByTestId("chk_csv_test");
        fireEvent.click(selectCsv);
        expect(selectCsv.checked).toEqual(true);
        fireEvent.click(getByTestId("export_button"));
    });
    it("should close exportdata overlay by clicking on close", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        fireEvent.click(getByTestId("cancel_button"));
    });
    it("should provide warnings if no colmns and file types selected", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        fireEvent.click(selectAllCheck);
        expect(selectAllCheck.checked).toEqual(false);
        fireEvent.click(getByTestId("export_button"));
    });
    it("should provide warnings if no colmns is selected", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        fireEvent.click(selectAllCheck);
        expect(selectAllCheck.checked).toEqual(false);
        const selectPdf = getByTestId("chk_pdf_test");
        fireEvent.click(selectPdf);
        expect(selectPdf.checked).toEqual(true);
        fireEvent.click(getByTestId("export_button"));
    });
    it("should provide warnings if no file type is selected", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        expect(selectAllCheck.checked).toEqual(true);
        const selectPdf = getByTestId("chk_pdf_test");
        expect(selectPdf.checked).toEqual(false);
        fireEvent.click(getByTestId("export_button"));
    });
    it("should search columns in list", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const filterList = getByTestId("search");
        expect(filterList.value).toBe("");
        fireEvent.change(filterList, { target: { value: "id" } });
    });
    it("should select single column", () => {
        const { getByTestId } = render(
            <ExportData
                isExportOverlayOpen
                toggleExportDataOverlay={mocktoggleExportDataOverlay}
                rows={mockRows}
                originalColumns={mockOriginalColumns}
                columns={mockColumns}
                isRowExpandEnabled
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
            />,
            container
        );
        const selectAllCheck = getByTestId("select-all-checkbox");
        fireEvent.click(selectAllCheck);
        expect(selectAllCheck.checked).toEqual(false);
        const singleColumn = getByTestId("SR");
        fireEvent.click(singleColumn);
        expect(singleColumn.checked).toEqual(true);
        screen.debug();
        const selectCsv = getByTestId("chk_csv_test");
        fireEvent.click(selectCsv);
        expect(selectCsv.checked).toEqual(true);
        fireEvent.click(getByTestId("export_button"));
    });
});
