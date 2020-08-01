import React from "react";
import { shallow, mount } from "enzyme";
import ExtDataGrid from "../../../src/common/extDataGrid";

describe("<ExtDataGrid />", () => {
  let rows = [
    {
      travelId: 0,
      flightno: "XX6576",
      date: "2015-05-01",
      segmentfrom: "ABC",
      segmentto: "ZYY",
      flightModel: 115,
      bodyType: "Small Body",
      type: "Car",
      startTime: "03:34 (A)",
      endTime: "03:05 (S)",
      status: "To Be Cancelled",
      additionalStatus: "",
      timeStatus: "04:58|hrs to depart",
      weightpercentage: "65%",
      weightvalue: "52098/20000 kg",
      volumepercentage: "32%",
      volumevalue: "33/60 cbm",
      uldposition1: "L4",
      uldvalue1: "6/1",
      uldposition2: "Q4",
      uldvalue2: "2/7",
      uldposition3: "L8",
      uldvalue3: "7/5",
      uldposition4: "Q8",
      uldvalue4: "3/2",
      revenue: "$60,485.33",
      yeild: "$6.28",
      sr: "52/ AWBs",
      queuedBookingSR: "23/ AWBs",
      queuedBookingvolume: "8023 kg / 35 cbm",
    },
    {
      travelId: 1,
      flightno: "XX5177",
      date: "2018-02-09",
      segmentfrom: "CCC",
      segmentto: "YXZ",
      flightModel: 197,
      bodyType: "Small Body",
      type: "Van",
      startTime: "01:23 (E)",
      endTime: "12:31 (E)",
      status: "Cancelled",
      additionalStatus: "Arrived",
      timeStatus: "12:57|hrs to depart",
      weightpercentage: "37%",
      weightvalue: "49689/20000 kg",
      volumepercentage: "47%",
      volumevalue: "49/60 cbm",
      uldposition1: "L3",
      uldvalue1: "1/1",
      uldposition2: "Q2",
      uldvalue2: "3/4",
      uldposition3: "L6",
      uldvalue3: "8/1",
      uldposition4: "Q6",
      uldvalue4: "4/2",
      revenue: "$62,830.60",
      yeild: "$8.39",
      sr: "34/ AWBs",
      queuedBookingSR: "75/ AWBs",
      queuedBookingvolume: "8893 kg / 43 cbm",
    },
  ];
  const mockCellRangeSelection = jest.fn();
  it("mount", () => {
    document.addEventListener[0] = jest.fn(() => {
      document.getElementsByClassName("react-grid-Viewport")[0];
    });
    const wrapper = mount(
      <ExtDataGrid
        columns={[
          "travelId",
          "flightno",
          "date",
          "segmentfrom",
          "segmentto",
          "flightModel",
          "bodyType",
          "type",
          "startTime",
          "endTime",
          "status",
          "additionalStatus",
          "timeStatus",
          "weightpercentage",
          "weightvalue",
          "volumepercentage",
          "volumevalue",
          "uldposition1",
          "uldvalue1",
          "uldposition2",
          "uldvalue2",
          "uldposition3",
          "uldvalue3",
          "uldposition4",
          "uldvalue4",
          "revenue",
          "yeild",
          "sr",
          "queuedBookingSR",
          "queuedBookingvolume",
        ]}
        rowsCount={rows.length}
        rowGetter={(i) => rows[i]}
        cellRangeSelection={mockCellRangeSelection}
      />
    );
    wrapper.metricsUpdated = jest.fn();
    expect(wrapper).not.toBeNull();
    expect(wrapper.instance().metricsUpdated()).toBeNull();
    wrapper.unmount();
  });
});
