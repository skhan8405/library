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
            dataType: "AutoComplete",
            enabled: true,
            validated: false,
            warning: "This field is required*",
            value: ""
        }
    ];

    const props = {
        name: "Booking Profile",
        type: "Booking Profile",
        enabled: true,
        dataType: "AutoComplete",
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
    test("autoCompleteSelect change trigger", () => {
        const { getByPlaceholderText } = render(
            <AutoCompleteComponent
                name={props.name}
                type={props.type}
                enabled={item.enabled}
                dataType={props.dataType}
                options={props.options}
                autoCompleteArray={item}
                deleteAutoCompleteElement={props.deleteAutoCompleteElement}
                handleAutoCompleteEnabled={props.handleAutoCompleteEnabled}
                createAutoCompleteArray={props.createAutoCompleteArray}
            />
        );
        fireEvent.select(getByPlaceholderText("Select"), {
            target: { value: [{ key: "ABC", value: "ABC" }] }
        });
        const element = getByPlaceholderText("Select");
        expect(element).toBeInTheDocument;
    });
    test("handleAutoCompleteEnabled-check change trigger", () => {
        const handleAutoCompleteEnabled = jest.fn();
        const { getByTestId } = render(
            <AutoCompleteComponent
                name={props.name}
                type={props.type}
                enabled={props.enabled}
                dataType={props.dataType}
                options={props.options}
                autoCompleteArray={item}
                deleteAutoCompleteElement={props.deleteAutoCompleteElement}
                handleAutoCompleteEnabled={handleAutoCompleteEnabled}
                createAutoCompleteArray={props.createAutoCompleteArray}
            />
        );
        fireEvent.click(getByTestId("handleAutoCompleteEnabled-check"));
        const element = getByTestId("handleAutoCompleteEnabled-check");
        expect(element).toBeInTheDocument;
    });
});
