/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import LeftDrawer from "../../../src/drawer/LeftDrawer";

describe("LeftDrawer component", () => {
    const filterData = {
        filter: [
            {
                name: "Departure Port",
                types: [
                    {
                        name: "Airport",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "Airport Group",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "AirportGroup",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "City",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "City Group",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "Country",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    }
                ],
                field: [],
                condition: []
            },
            {
                name: "Arrival Port",
                types: [
                    {
                        name: "Airport",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "Airport Group",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "City",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "City Group",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    },
                    {
                        name: "Country",
                        dataType: "AutoComplete",
                        enabled: true,
                        dataSource: "Airport",
                        validationMessage: "This field is required*",
                        options: [
                            {
                                key: "AAA",
                                value: "AAA"
                            },
                            {
                                key: "AAB",
                                value: "AAB"
                            },
                            {
                                key: "ABA",
                                value: "ABA"
                            },
                            {
                                key: "ABB",
                                value: "ABB"
                            },
                            {
                                key: "BBA",
                                value: "BBA"
                            },
                            {
                                key: "BAA",
                                value: "BAA"
                            },
                            {
                                key: "BBB",
                                value: "BBB"
                            }
                        ]
                    }
                ],
                field: [],
                condition: []
            },
            {
                name: "Date",
                dataType: "DateTime",
                enabled: true,
                field: [
                    {
                        column: "From Date & Time",
                        value: ""
                    },
                    {
                        column: "To Date & Time",
                        value: ""
                    }
                ],
                types: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Booking Profile",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Flight Group",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Flight No",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Revenue",
                dataType: "Numeric",
                enabled: true,
                condition: [
                    {
                        value: "equals"
                    },
                    {
                        value: "not equals to"
                    },
                    {
                        value: "less than"
                    },
                    {
                        value: "greater than"
                    },
                    {
                        value: "less or equal"
                    },
                    {
                        value: "greater or equal"
                    },
                    {
                        value: "contains"
                    },
                    {
                        value: "does not match"
                    },
                    {
                        value: "starts with"
                    }
                ],
                types: [],
                field: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Yeild",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Service Recovery",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Queued Bookings",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Weight",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Volume",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Aircraft",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Aircraft Classification",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Flight Type",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Flight Status",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Segment Status",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            },
            {
                name: "Milestone Status",
                enabled: false,
                dataType: "Text",
                types: [],
                field: [],
                condition: [],
                validationMessage: "This field is required*"
            }
        ]
    };
    // const item = [
    //     {
    //         name: "Booking Profile",
    //         dataType: "Text",
    //         enabled: false,
    //         validated: false,
    //         warning: "This field is required*"
    //     }
    // ];

    const fromLeftToRight = jest.fn();
    it("Should check LeftDrawer ", () => {
        render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
    });

    it("Check searchFilterHandler", () => {
        const wrapper = render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
        const searchFilterHandlerElm = wrapper.getByTestId(
            "searchFilterHandler-input"
        );
        // eslint-disable-next-line no-unused-expressions
        expect(searchFilterHandlerElm).toBeInTheDocument;
        userEvent.type(searchFilterHandlerElm, "Booking Profile");
        expect(searchFilterHandlerElm).toHaveLength;
    });

    it("Check handleAccordianArrow", () => {
        const wrapper = render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
        const handleAccordianArrowElm = wrapper.getAllByTestId(
            "handleAccordianArrow"
        )[0];
        expect(handleAccordianArrowElm).toBeInTheDocument;
        fireEvent.click(handleAccordianArrowElm);
    });

    it("Check firstAccordion", () => {
        const wrapper = render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
        const firstAccordionElm = wrapper.getAllByTestId("firstAccordion")[0];
        expect(firstAccordionElm).toBeInTheDocument;
        fireEvent.click(firstAccordionElm);
    });

    it("Check normalHeads", () => {
        const wrapper = render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
        const normalHeadsElm = wrapper.getAllByTestId("normalHeads")[0];
        expect(normalHeadsElm).toBeInTheDocument;
        fireEvent.click(normalHeadsElm);
    });

    it("Check fieldHeads", () => {
        const wrapper = render(
            <LeftDrawer
                filterData={filterData}
                fromLeftToRight={fromLeftToRight}
            />
        );
        const fieldHeadsElm = wrapper.getAllByTestId("fieldHeads")[0];
        expect(fieldHeadsElm).toBeInTheDocument;
        fireEvent.click(fieldHeadsElm);
    });
});
