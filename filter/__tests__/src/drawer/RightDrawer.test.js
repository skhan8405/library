/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import RightDrawer from "../../../src/drawer/RightDrawer";

describe("RightDrawer component", () => {
    const item = [
        {
            name: "Booking Profile",
            dataType: "Text",
            type: "Booking Profile",
            enabled: false,
            validated: false,
            warning: "This field is required*",
            condition: [],
            field: []
        }
    ];

    const props = {
        applyFilter: jest.fn(),
        saveFilter: jest.fn(),
        createAutoCompleteArray: item,
        handleAutoCompleteEnabled: jest.fn(),
        deleteAutoCompleteElement: jest.fn(),
        autoCompleteArray: item,
        dateTimesArray: [],
        deleteDateTimeElement: jest.fn(),
        handleDateTimeEnabled: jest.fn(),
        createDateTimeArray: jest.fn(),
        addToday: jest.fn(),
        addTomorrow: jest.fn(),
        addThisMonth: jest.fn(),
        addForteenDays: jest.fn(),
        addSevenDays: jest.fn(),
        addThisWeek: jest.fn(),
        addThirtyDays: jest.fn(),
        lastDayChange: jest.fn(),
        nextDayChange: jest.fn(),
        conditionsArray: item,
        handleCondionalEnabled: jest.fn(),
        createConditionalArray: jest.fn(),
        deleteConditionalElement: jest.fn(),
        textComponentsArray: item,
        deleteTextComponentElement: jest.fn(),
        createTextComponentsArray: [],
        handleTextComponentEnabled: jest.fn(),
        closeDrawer: jest.fn(),
        resetDrawer: jest.fn(),
        filterCount: jest.fn(),
        saveWarningClassName: jest.fn(),
        saveWarningLabel: jest.fn(),
        showSavePopUp: jest.fn(),
        emptyFilterClassName: jest.fn(),
        emptyFilterWarning: jest.fn(),
        openShowSavePopUp: jest.fn(),
        recentFilterShow: jest.fn(),
        filterShow: jest.fn(),
        addSavedFilters: jest.fn()
    };

    it("Should check RightDrawer ", () => {
        render(<RightDrawer {...props} />);
    });

    it("Check registersaveFilterName", () => {
        const wrapper = render(<RightDrawer {...props} />);
        const registersaveFilterNameElm = wrapper.getByTestId(
            "registersaveFilterName-input"
        );
        expect(registersaveFilterNameElm).toBeInTheDocument;
        userEvent.type(registersaveFilterNameElm, "Booking Profile");
        expect(registersaveFilterNameElm).toHaveLength;
    });

    it("Check cancelSavePopup", () => {
        const wrapper = render(<RightDrawer {...props} />);
        const cancelSavePopupElm = wrapper.getAllByTestId(
            "cancelSavePopup-button"
        )[0];
        expect(cancelSavePopupElm).toBeInTheDocument;
        fireEvent.click(cancelSavePopupElm);
    });

    it("Check applyFilter", () => {
        const wrapper = render(<RightDrawer {...props} />);
        const applyFilterElm = wrapper.getByTestId("applyFilter-button");
        expect(applyFilterElm).toBeInTheDocument;
        fireEvent.click(applyFilterElm);
    });

    it("Check saveFilter", () => {
        const wrapper = render(<RightDrawer {...props} />);
        const saveFilterElm = wrapper.getByTestId("saveFilter-button");
        expect(saveFilterElm).toBeInTheDocument;
        fireEvent.click(saveFilterElm);
    });
});
