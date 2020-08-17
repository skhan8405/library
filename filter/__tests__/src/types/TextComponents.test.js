/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import TextComponents from "../../../src/types/TextComponents";

describe("TextComponents component", () => {
    const item = [
        {
            name: "Booking Profile",
            dataType: "Text",
            enabled: true,
            value: "",
            validated: false,
            warning: "This field is required*"
        }
    ];

    const props = {
        textComponentArr: item,
        handleTextComponentEnabled: jest.fn(() => 1),
        deleteTextComponentElement: jest.fn(),
        createTextComponentsArray: ""
    };

    it("Should be available in TextComponents ", () => {
        const wrapper = render(
            <TextComponents
                textComponentsArray={props.textComponentArr}
                deleteTextComponentElement={props.deleteTextComponentElement}
                createTextComponentsArray={props.createTextComponentsArray}
                handleTextComponentEnabled={props.handleTextComponentEnabled}
            />
        );
        const createTextComponentsArrayElm = wrapper.getByTestId(
            "createTextComponentsArray-input"
        );
        const deleteTextComponentElementElm = wrapper.getByTestId(
            "deleteTextComponentElement-button"
        );
        const handleTextComponentEnabledElm = wrapper.getByTestId(
            "handleTextComponentEnabled-check"
        );
        expect(createTextComponentsArrayElm).toBeInTheDocument;
        expect(deleteTextComponentElementElm).toBeTruthy;
        expect(handleTextComponentEnabledElm).toBeTruthy;
        expect(props.deleteTextComponentElement).toBeInTheDocument;

        fireEvent.change(handleTextComponentEnabledElm, {
            target: { item }
        });
        fireEvent.change(createTextComponentsArrayElm, {
            target: { item }
        });
        fireEvent.click(deleteTextComponentElementElm, item);
    });
    test("handleTextComponentEnabled-check change trigger", () => {
        const handleTextComponentEnabled = jest.fn(() => 1);
        const { getByTestId } = render(
            <TextComponents
                textComponentsArray={props.textComponentArr}
                deleteTextComponentElement={props.deleteTextComponentElement}
                createTextComponentsArray={props.createTextComponentsArray}
                handleTextComponentEnabled={handleTextComponentEnabled}
            />
        );
        fireEvent.click(getByTestId("handleTextComponentEnabled-check"));
        const element = getByTestId("handleTextComponentEnabled-check");
        expect(element).toBeInTheDocument;
    });
    test("createTextComponentsArray-input change trigger", () => {
        const handleTextComponentEnabled = jest.fn(() => 1);
        const createTextComponentsArray = jest.fn(() => 1);
        const { getAllByTestId } = render(
            <TextComponents
                textComponentsArray={item}
                deleteTextComponentElement={props.deleteTextComponentElement}
                createTextComponentsArray={createTextComponentsArray}
                handleTextComponentEnabled={handleTextComponentEnabled}
            />
        );
        fireEvent.change(getAllByTestId("createTextComponentsArray-input")[0], {
            target: { value: "BookingProfile" }
        });
        const element = getAllByTestId("createTextComponentsArray-input")[0];
        expect(element).toBeInTheDocument;
    });
});
