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
            enabled: false,
            validated: false,
            warning: "This field is required*"
        }
    ];

    const props = {
        textComponentArr: item,
        handleTextComponentEnabled: true,
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
});
