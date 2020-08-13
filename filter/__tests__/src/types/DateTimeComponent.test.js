/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import FieldComponent from "../../../src/types/DateTimeComponent";

describe("FieldComponent component", () => {
    const item = [
        {
            name: "Date",
            dataType: "DateTime",
            enabled: true,
            field: [
                {
                    column: "From Date & Time",
                    value: "2020-08-12T10:40"
                },
                {
                    column: "To Date & Time",
                    value: "2020-08-13T10:40"
                }
            ],
            validated: true,
            warning: ""
        }
    ];

    const props = {
        dateTimesArray: item,
        deleteDateTimeElement: false,
        handleDateTimeEnabled: true,
        createDateTimeArray: "",
        addToday: "addtoday",
        addTomorrow: "addTomorrow",
        addThisMonth: "addThisMonth",
        addForteenDays: "addForteenDays",
        addSevenDays: "addSevenDays",
        addThisWeek: "addThisWeek",
        addThirtyDays: "addThirtyDays",
        lastDayChange: "lastDayChange",
        nextDayChange: "nextDayChange"
    };

    it("Should be available in DateTimeComponent ", () => {
        const wrapper = render(
            <FieldComponent
                dateTimesArray={props.dateTimesArray}
                deleteDateTimeElement={props.deleteDateTimeElement}
                handleDateTimeEnabled={props.handleDateTimeEnabled}
                createDateTimeArray={props.createDateTimeArray}
                addToday={props.addToday}
                addTomorrow={props.addTomorrow}
                addThisMonth={props.addThisMonth}
                addForteenDays={props.addForteenDays}
                addSevenDays={props.addSevenDays}
                addThisWeek={props.addThisWeek}
                addThirtyDays={props.addThirtyDays}
                lastDayChange={props.lastDayChange}
                nextDayChange={props.nextDayChange}
            />
        );
        const createDateTimeArrayElm = wrapper.getAllByTestId(
            "createDateTimeArray-input"
        );
        const deleteDateTimeElementElm = wrapper.getByTestId(
            "deleteDateTimeElement-click"
        );
        const handleDateTimeEnabledElm = wrapper.getByTestId(
            "handleDateTimeEnabled-check"
        );
        expect(createDateTimeArrayElm).toBeInTheDocument;
        expect(deleteDateTimeElementElm).toBeFalsy;
        expect(handleDateTimeEnabledElm).toBeTruthy;
        expect(item.validated).toBeChecked;

        fireEvent.change(handleDateTimeEnabledElm, {
            target: { item }
        });
        fireEvent.click(deleteDateTimeElementElm, item);
    });
});
