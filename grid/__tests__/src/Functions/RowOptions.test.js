import React from "react";
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import RowOptions from "../../../src/Functions/RowOptions";
import '@testing-library/jest-dom';

describe("render row options", () => {

  const rowdata = {
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
      additionalStatus: "Elit est consectetur deserunt et sit officia eu. Qui minim quis exercitation in irure elit velit nisi officia cillum laborum reprehenderit.aliqua ex sint cupidatat non",
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
    remarks: "Enim aute magna ipsum magna commodo qui aute et elit aliqua nostrud ea nulla duis. Proident dolore aliqua sint nostrud aliquip exercitation anim nulla quis cupidatat dolor nostrud aliqua incididunt. Mollit ut cillum Lorem laborum dolore proident."
  }

  let container;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    // container *must* be attached to document so events work correctly.
    document.body.appendChild(container);
  });
  afterEach(cleanup);
  const rowActionCallbackMock = jest.fn();
  const bindRowEditOverlayMock = jest.fn();
  const bindRowDeleteOverlayMock = jest.fn();
  const rowActionsMock = jest.fn();

  it("Should render", () => {
    const { getByText, queryByTestId, container } = render(
      <RowOptions row={rowdata} rowActions={rowActionsMock} rowActionCallback={rowActionCallbackMock} bindRowEditOverlay={bindRowEditOverlayMock} bindRowDeleteOverlay={bindRowDeleteOverlayMock} />);
  });


  // it("Click to show the options", () => {

  //   const { getByText, getByTestId, container } = render(
  //     <RowOptions row={rowdata} rowActions={rowActionsMock} rowActionCallback={rowActionCallbackMock} bindRowEditOverlay={bindRowEditOverlayMock} bindRowDeleteOverlay={bindRowDeleteOverlayMock} />);

  //   fireEvent.click(document.getElementsByClassName('row-options-wrap'));
  //   expect(rowActionCallbackMock).toHaveBeenCalledTimes(1);
  // });

});
