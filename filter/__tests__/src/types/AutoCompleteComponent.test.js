/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import AutoCompleteComponent from "../../../src/types/AutoCompleteComponent";

describe("AutoCompleteComponent component", () => {
    const item = [
        {
            name: "Booking Profile",
            type: "Booking Profile",
            dataType: "Text",
            enabled: false,
            validated: false,
            warning: "This field is required*"
        }
    ];

    const props = {
        name: "Booking Profile",
        type: "Booking Profile",
        enabled: false,
        dataType: "Text",
        options: "",
        autoCompleteArray: item,
        handleAutoCompleteEnabled: true,
        deleteAutoCompleteElement: jest.fn(),
        createAutoCompleteArray: item
    };

    it("Should be available in AutoCompleteComponent ", () => {
        const wrapper = render(
            <AutoCompleteComponent
                name={props.name}
                type={props.type}
                enabled={props.enabled}
                dataType={props.dataType}
                options={props.options}
                autoCompleteArray={props.autoCompleteArray}
                deleteAutoCompleteElement={props.deleteAutoCompleteElement}
                handleAutoCompleteEnabled={props.handleAutoCompleteEnabled}
                createAutoCompleteArray={props.createAutoCompleteArray}
            />
        );
        const deleteAutoCompleteElementElm = wrapper.getByTestId(
            "deleteAutoCompleteElement-click"
        );
        const handleAutoCompleteEnabledElm = wrapper.getByTestId(
            "handleAutoCompleteEnabled-check"
        );
        expect(deleteAutoCompleteElementElm).toBeTruthy;
        expect(handleAutoCompleteEnabledElm).toBeTruthy;
        expect(props.deleteAutoCompleteElement).toBeInTheDocument;

        fireEvent.change(handleAutoCompleteEnabledElm, {
            target: { item }
        });
        fireEvent.click(deleteAutoCompleteElementElm, item);
    });
});
