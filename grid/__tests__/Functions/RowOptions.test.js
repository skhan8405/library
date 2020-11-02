/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import RowOptions from "../../src/Functions/RowOptions";
import "@testing-library/jest-dom/extend-expect";

describe("render row options", () => {
    const rowdata = {
        original: {
            travelId: 0,
            flight: {
                flightno: "XX2225",
                date: "31-Aug-2016"
            },
            segment: {
                from: "BCC",
                to: "ZZY"
            },
            details: {
                flightModel: 6518,
                bodyType: "Big Body",
                type: "Van",
                startTime: "01:23 (S)",
                endTime: "11:29 (E)",
                status: "To Be Cancelled",
                additionalStatus:
                    "Elit est consectetur deserunt et sit officia eu. Qui minim quis exercitation in irure elit velit nisi officia cillum laborum reprehenderit.aliqua ex sint cupidatat non",
                timeStatus: "10:02 hrs to depart"
            },
            weight: {
                percentage: "16%",
                value: "35490/20000 kg"
            },
            volume: {
                percentage: "54%",
                value: "31/60 cbm"
            },
            uldPositions: [
                {
                    position: "L1",
                    value: "7/9"
                },
                {
                    position: "Q1",
                    value: "9/3"
                },
                {
                    position: "L6",
                    value: "8/4"
                },
                {
                    position: "Q7",
                    value: "4/9"
                }
            ],
            revenue: {
                revenue: "$63,474.27",
                yeild: "$7.90"
            },
            sr: "74/ AWBs",
            queuedBooking: {
                sr: "88/ AWBs",
                volume: "7437 kg / 31 cbm"
            },
            remarks:
                "Enim aute magna ipsum magna commodo qui aute et elit aliqua nostrud ea nulla duis. Proident dolore aliqua sint nostrud aliquip exercitation anim nulla quis cupidatat dolor nostrud aliqua incididunt. Mollit ut cillum Lorem laborum dolore proident."
        }
    };

    const mockRowActions = jest.fn(() => {
        return <span>Row Action</span>;
    });

    afterEach(cleanup);

    it("Should render component, open the overlay and then close it", () => {
        const { getByTestId, getAllByTestId, container } = render(
            <RowOptions row={rowdata} rowActions={mockRowActions} />
        );
        // Open actions overlay
        const rowActionOpenLinks = getAllByTestId("rowActions-open-link");
        act(() => {
            rowActionOpenLinks[0].dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
        // Check if row actions overlay has been opened
        const rowActionsOverlay = getByTestId("rowActions-kebab-overlay");
        expect(rowActionsOverlay).toBeInTheDocument();
        // Click close button
        const closeButton = getByTestId("close-rowActions-kebab-overlay");
        act(() => {
            closeButton.dispatchEvent(
                new MouseEvent("click", { bubbles: true })
            );
        });
        // Check if overlay has been closed
        const overlayContainer = container.getElementsByClassName(
            "row-options-overlay"
        );
        expect(overlayContainer.length).toBe(0);
    });
});
