/* eslint-disable no-undef */
import React from "react";
import ReactDOM from "react-dom";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import ColumnReordering from "../../../../src/Overlays/managecolumns/index";

describe("ColumnReordering unit test", () => {
    const updateColumnStructure = jest.fn();
    const toggleManageColumns = jest.fn();
    const mockAdditionalColumn = [
        {
            Header: "Remarks",
            innerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                },
                {
                    Header: "Details",
                    onlyInTablet: true,
                    accessor: "details"
                }
            ],
            columnId: "ExpandColumn",
            displayInExpandedRegion: true,
            originalInnerCells: [
                {
                    Header: "Remarks",
                    accessor: "remarks"
                },
                {
                    Header: "Details",
                    onlyInTablet: true,
                    accessor: "details"
                }
            ]
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
            Header: "Segment",
            accessor: "segment",
            width: 100,
            innerCells: [
                {
                    Header: "From",
                    accessor: "from"
                },
                {
                    Header: "To",
                    accessor: "to"
                }
            ],
            disableSortBy: true,
            columnId: "column_2",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "From",
                    accessor: "from"
                },
                {
                    Header: "To",
                    accessor: "to"
                }
            ]
        },
        {
            Header: "Weight",
            accessor: "weight",
            width: 130,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            sortValue: "percentage",
            columnId: "column_3",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ]
        },
        {
            Header: "Volume",
            accessor: "volume",
            width: 100,
            innerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            sortValue: "percentage",
            columnId: "column_4",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Percentage",
                    accessor: "percentage"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ]
        },
        {
            Header: "ULD Positions",
            accessor: "uldPositions",
            width: 120,
            innerCells: [
                {
                    Header: "Position",
                    accessor: "position"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ],
            disableSortBy: true,
            columnId: "column_5",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Position",
                    accessor: "position"
                },
                {
                    Header: "Value",
                    accessor: "value"
                }
            ]
        },
        {
            Header: "Revenue/Yield",
            accessor: "revenue",
            width: 120,
            innerCells: [
                {
                    Header: "Revenue",
                    accessor: "revenue"
                },
                {
                    Header: "Yeild",
                    accessor: "yeild"
                }
            ],
            sortValue: "revenue",
            columnId: "column_6",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Revenue",
                    accessor: "revenue"
                },
                {
                    Header: "Yeild",
                    accessor: "yeild"
                }
            ]
        },
        {
            Header: "SR",
            accessor: "sr",
            width: 90,
            columnId: "column_7",
            displayInExpandedRegion: false
        },
        {
            Header: "Queued Booking",
            accessor: "queuedBooking",
            width: 130,
            innerCells: [
                {
                    Header: "Sr",
                    accessor: "sr"
                },
                {
                    Header: "Volume",
                    accessor: "volume"
                }
            ],
            disableSortBy: true,
            columnId: "column_8",
            displayInExpandedRegion: false,
            originalInnerCells: [
                {
                    Header: "Sr",
                    accessor: "sr"
                },
                {
                    Header: "Volume",
                    accessor: "volume"
                }
            ]
        }
    ];
    afterEach(cleanup);
    let container;
    beforeAll(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });

    it("should render ColumnReordering component", () => {
        const component = render(
            <ColumnReordering
                isManageColumnOpen
                toggleManageColumns={toggleManageColumns}
                originalColumns={mockOriginalColumns}
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
                updateColumnStructure={updateColumnStructure}
            />,
            container
        );
        expect(component).toBeDefined();
    });

    // it("should render ColumnReordering search component", () => {
    //     const { getByTestId } = render(
    //         <ColumnReordering
    //             isManageColumnOpen
    //             toggleManageColumns={toggleManageColumns}
    //             originalColumns={mockOriginalColumns}
    //             isExpandContentAvailable
    //             additionalColumn={[mockAdditionalColumn]}
    //             updateColumnStructure={updateColumnStructure}
    //         />,
    //         container
    //     );
    //     const filterList = getByTestId("filterColumnsList");
    //     fireEvent.change(filterList, { target: { value: "id" } });
    //     expect(filterList.value).toBe("id");
    // });

    it("Click on Save button For Default Select", () => {
        // const { getByTestId } =
        render(
            <ColumnReordering
                isManageColumnOpen
                toggleManageColumns={toggleManageColumns}
                originalColumns={mockOriginalColumns}
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
                updateColumnStructure={updateColumnStructure}
            />,
            container
        );

        // const mockDoColumnUpdate = jest.fn();
        const saveButton = document.getElementsByClassName(
            "btns btns__save"
        )[0];

        // getByTestId("saveButton");

        // triggering Save button Click
        act(() => {
            saveButton.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        // fireEvent.click(saveButton);

        // NOT WORKING
        // const columnReorderBody = document
        //     .querySelector(".column__settings")
        //     .querySelector(".column__body")
        //     .getElementsByTagName("div")[0].innerHTML;

        // expect(columnReorderBody).toBeUndefined();
        // expect(mockDoColumnUpdate).toHaveBeenCalledTimes(1);
    });

    // it("Un-select All coloumns", () => {
    //     // LOGIC-->> UnSelect All Columns by unchecking the select All checkBox
    //     // expect the coloumn body (on showing all chosen coloumns) to be empty
    //     const { getByTestId } = render(
    //         <ColumnReordering
    //             isManageColumnOpen
    //             toggleManageColumns={toggleManageColumns}
    //             originalColumns={mockOriginalColumns}
    //             isExpandContentAvailable
    //             additionalColumn={[mockAdditionalColumn]}
    //             updateColumnStructure={updateColumnStructure}
    //         />,
    //         container
    //     );
    //     const selectAllCheckBox = getByTestId("selectAllCheckbox");

    //     fireEvent.click(selectAllCheckBox);

    //     const coloumnBodyInnerHtml = document
    //         .getElementsByClassName("column__settings")[0]
    //         .getElementsByClassName("column__body")[0]
    //         .getElementsByClassName("column__reorder").innerHTML;

    //     expect(coloumnBodyInnerHtml).toBe("");
    // });

    it("Un-select and Select All coloumns", () => {
        // LOGIC-->> UnSelect All Columns by unchecking the select All checkBox
        // expect the coloumn body (on showing all chosen coloumns) to be empty
        const { getByTestId } = render(
            <ColumnReordering
                isManageColumnOpen
                toggleManageColumns={toggleManageColumns}
                originalColumns={mockOriginalColumns}
                isExpandContentAvailable
                additionalColumn={[mockAdditionalColumn]}
                updateColumnStructure={updateColumnStructure}
            />,
            container
        );
        const selectAllCheckBox = getByTestId("selectAllCheckbox");

        // unchecking the select all checkbox
        fireEvent.click(selectAllCheckBox);

        // checking the select all checkbox
        fireEvent.click(selectAllCheckBox);

        const coloumnBodyInnerHtml = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder");

        expect(coloumnBodyInnerHtml.length).toBe(10);
    });

    it("UnSelect The Segment Coloumn From Column Chooser", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        const segmentColumCheckBox = document
            .getElementsByClassName("column__chooser")[0]
            .getElementsByClassName("column__checkbox")[3]
            .getElementsByTagName("input")[0];

        act(() => {
            segmentColumCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        const isSegmentIncludedInBody = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .innerHTML.includes("Segment");

        expect(isSegmentIncludedInBody).toBe(false);

        const saveButton = document.getElementsByClassName(
            "btns btns__save"
        )[0];

        // triggering Save button Click
        act(() => {
            saveButton.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
    });

    it("UnSelect and Select Segment Column ", () => {
        // LOGIC-->> UnSelect and then select segment Column
        // expect no of coloumns to be as same before and after select
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        const noOfColoumnsBeforeSelect = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder").length;

        const segmentColumCheckBox = document
            .getElementsByClassName("column__chooser")[0]
            .getElementsByClassName("column__checkbox")[3]
            .getElementsByTagName("input")[0];

        // unchecking segment checkbox
        act(() => {
            segmentColumCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        // checking segment checkbox
        act(() => {
            segmentColumCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        const noOfColoumnsAfterSelect = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder").length;

        expect(noOfColoumnsAfterSelect).toEqual(noOfColoumnsBeforeSelect);
    });

    it("Unselect and Select Flight no Inner Cell", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        const flightNoInnerCell = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder")[1]
            .getElementsByTagName("input")[0];

        // unchecking flightNo innerCell checkbox
        act(() => {
            flightNoInnerCell.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        // checking flightNo innerCell checkbox
        act(() => {
            flightNoInnerCell.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        expect(flightNoInnerCell.checked).toBeTruthy();
    });

    it("UnSelect All and Click Reset Button", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });
        const selectAllCheckBox = document
            .getElementsByClassName("column__chooser")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByTagName("input")[1];

        // un-checking selectAll checkbox
        act(() => {
            selectAllCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        const resetButton = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("btns")[0];

        // clicking Reset button
        act(() => {
            resetButton.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        const noOfColoumnsAfterReset = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder").length;

        expect(noOfColoumnsAfterReset).toEqual(10);
    });

    it("Error scenario for no Coloumns Selected", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        const selectAllCheckBox = document
            .getElementsByClassName("column__chooser")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByTagName("input")[1];

        act(() => {
            selectAllCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });

        expect(selectAllCheckBox.checked).toBeFalsy();

        const saveButton = document.getElementsByClassName(
            "btns btns__save"
        )[0];

        // un-checking selectAll checkbox
        act(() => {
            saveButton.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
    });

    it("Select InnerCell Of Remarks", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        // console.log(container.outerHTML);

        const remarksInnerCellCheckBox = document
            .getElementsByClassName("column__settings")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByClassName("column__reorder")[10]
            .getElementsByTagName("input")[0];

        act(() => {
            remarksInnerCellCheckBox.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
    });

    it("Trigger search of columns onChnage", () => {
        act(() => {
            ReactDOM.render(
                <ColumnReordering
                    isManageColumnOpen
                    toggleManageColumns={toggleManageColumns}
                    originalColumns={mockOriginalColumns}
                    isExpandContentAvailable
                    additionalColumn={[mockAdditionalColumn]}
                    updateColumnStructure={updateColumnStructure}
                />,
                container
            );
        });

        const searchColoumnInputField = document
            .getElementsByClassName("column__chooser")[0]
            .getElementsByClassName("column__body")[0]
            .getElementsByTagName("input")[0];

        act(() => {
            searchColoumnInputField.dispatchEvent(
                new KeyboardEvent("keyDown", {
                    event: { target: { value: "id" } }
                })
            );
        });
    });
});
