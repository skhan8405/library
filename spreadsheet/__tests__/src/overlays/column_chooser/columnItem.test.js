/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

import React from "react";
import { act } from "react-dom/test-utils";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import ColumnItem from "../../../../src/overlays/column_chooser/columnItem";
import "@testing-library/jest-dom/extend-expect";

let container;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it("Render mount the component and unmount the columnItem", () => {
    const id = 0;
    const text = <div />;
    const moveColumn = jest.fn();
    const findColumn = jest.fn(() => 1);

    act(() => {
        const { asFragment } = render(
            <DndProvider
                backend={TouchBackend}
                options={{
                    enableMouseEvents: true
                }}
            >
                <ColumnItem
                    id={id}
                    text={text}
                    moveColumn={moveColumn}
                    findColumn={findColumn}
                />
            </DndProvider>,
            container
        );
        expect(asFragment).not.toBeNull;
    });
});
