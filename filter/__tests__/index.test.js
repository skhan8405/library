/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import Filter from "../src/index";
import FilterData from "./data.json";
import { mockData } from "../__mocks__/graphqlDataMock";
import { MockedProvider } from "@apollo/react-testing";
import userEvent from "@testing-library/user-event";

let container_;

let mockCustomPanel = () => {
    const CS = () => {
        alert("Close Segment");
    };
    const OS = () => {
        alert("Open Segment");
    };
    const Segment = () => {
        alert("Segment");
    };

    const Summary = () => {
        alert("Summary");
    };
    const OSEG = () => {
        alert("Open Seg");
    };
    const CSEG = () => {
        alert("Close Seg");
    };

    const buttonPanelData = [
        {
            label: "Close Segment",
            value: "CS",
            handleEvent: CS,
            children: []
        },
        {
            label: "Open Segment",
            value: "OS",
            handleEvent: OS,
            children: []
        },
        {
            label: "...",
            value: "SegmentSummary",
            children: [
                {
                    label: "Segment",
                    value: "segment",
                    handleEvent: Segment
                },
                {
                    label: "Summary",
                    value: "summary",
                    handleEvent: Summary
                },
                {
                    label: "Open Segment",
                    value: "OSEG",
                    handleEvent: OSEG
                },
                {
                    label: "Close Segment",
                    value: "CSEG",
                    handleEvent: CSEG
                }
            ]
        }
    ];

    const isbuttonPanelDataPresent =
        buttonPanelData && buttonPanelData.length > 0;

    return (
        <div className="row-options-overlay">
            {isbuttonPanelDataPresent
                ? buttonPanelData.map((action) => {
                      const { label, children, handleEvent } = action;
                      const isChildrenPresent = children && children.length > 0;
                      return (
                          <div className="dropdown" key={label}>
                              <button
                                  type="button"
                                  className="dropbtn"
                                  onClick={handleEvent}
                              >
                                  {label}
                              </button>

                              <div className="dropdown-content">
                                  {isChildrenPresent
                                      ? children.map((childAction) => {
                                            const {
                                                label,
                                                handleEvent
                                            } = childAction;
                                            return (
                                                <div
                                                    className="dropdown"
                                                    key={label}
                                                >
                                                    <button
                                                        type="button"
                                                        className="dropbtn"
                                                        onClick={handleEvent}
                                                    >
                                                        {label}
                                                    </button>
                                                </div>
                                            );
                                        })
                                      : null}
                              </div>
                          </div>
                      );
                  })
                : null}
        </div>
    );
};

beforeEach(() => {
    container_ = document.createElement("div");
    document.body.appendChild(container_);
});

afterEach(() => {
    document.body.removeChild(container_);
    container_ = null;
});

const appliedFilters = jest.fn();
const renderMockComponent = (
    <MockedProvider addTypename={false} mocks={mockData}>
        <Filter
            filterDataProp={FilterData}
            appliedFiltersProp={appliedFilters}
            CustomPanel={mockCustomPanel}
        />
    </MockedProvider>
);

it("renders without crashing", () => {
    ReactDOM.render(renderMockComponent, container_);
    expect(container_).not.toBeInvalid;
    ReactDOM.unmountComponentAtNode(container_);
});

it("handleListFilterCheck", () => {
    const wrapper = render(renderMockComponent);
    const left = wrapper.getByTestId("handleListFilterCheck");
    fireEvent.click(left);
    expect(left).not.toBeNull();
});

it("showDrawer-check", () => {
    const wrapper = render(renderMockComponent);
    const addfilter = wrapper.getByText("+ Add Filter");
    fireEvent.click(addfilter);
    expect(addfilter).not.toBeNull();
    expect(wrapper.getByTestId("searchFilterHandler-input")).toBeInTheDocument;
});

it("resetFilter-check", () => {
    const wrapper = render(renderMockComponent);
    const addfilter = wrapper.getByText("+ Add Filter");
    fireEvent.click(addfilter);
    expect(addfilter).not.toBeNull();
    const resetfilter = wrapper.getByText("Reset");
    fireEvent.click(resetfilter);
    expect(wrapper.getByText("Recent Filters")).toBeInTheDocument;
});

it("showDrawer-click-outside", () => {
    const wrapper = render(
        <MockedProvider addTypename={false} mocks={mockData}>
            <div>
                <Filter
                    filterDataProp={FilterData}
                    appliedFiltersProp={appliedFilters}
                    CustomPanel={mockCustomPanel}
                />
                <a className="samps" href="#" />
            </div>
        </MockedProvider>
    );
    const addfilter = wrapper.getByText("+ Add Filter");
    fireEvent.click(addfilter);
    expect(addfilter).not.toBeNull();
    const outsideEle = document.getElementsByClassName("samps")[0];
    act(() => {
        outsideEle.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(wrapper.getByTestId("searchFilterHandler-input")).not
        .toBeInTheDocument;
});

it("searchFilter", () => {
    const { container, getByTestId } = render(renderMockComponent);
    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='searchFilterHandler-input']"
    );
    act(() => {
        fireEvent.change(component2, { target: { value: "air" } });
    });
    expect(getByTestId("searchFilterHandler-input")).toBeInTheDocument();
});

it("applyFilter - dateTime", async () => {
    const { container, getByTestId, debug } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='Date']");
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("Date.value"), { document });
    const component3 = container.querySelector("[id=Date-value]");
    debug(component3);
    act(() => {
        fireEvent.focus(component3);
        fireEvent.click(component3);
    });
    const minComponent = container.querySelectorAll(
        "[class='react-datepicker__day react-datepicker__day--014']"
    )[0];
    act(() => {
        fireEvent.click(minComponent);
    });
    const component4 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component5 = container.querySelector(
        "[data-testid='2020-09-14,Date']"
    );
    expect(getByTestId("2020-09-14,Date")).toBeInTheDocument();
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("[data-testid='searchFilterHandler-input']"))
        .toBeInTheDocument;
});

it("applyFilter - dateTime clicked twice", async () => {
    const { container, getByTestId } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='Date']");
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component3 = container.querySelector("[data-testid='Date']");
    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("Date.value"), { document });
    const component4 = container.querySelector("[id='Date-value']");
    act(() => {
        fireEvent.focus(component4);
        fireEvent.click(component4);
    });
    const minComponent = container.querySelectorAll(
        "[class='react-datepicker__day react-datepicker__day--014']"
    )[0];
    act(() => {
        fireEvent.click(minComponent);
    });
    const component5 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component6 = container.querySelector(
        "[data-testid='2020-09-14,Date']"
    );
    act(() => {
        component6.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        expect(getByTestId("2020-09-14,Date")).toBeInTheDocument();
    });
    expect(container.querySelector("[data-testid='searchFilterHandler-input']"))
        .toBeInTheDocument;
});

it("close - dateTime", async () => {
    const { container } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='Date']");
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("Date.value"), { document });
    const component3 = container.querySelector("[data-testid='closeField']");
    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("[name='Date>check']")).not
        .toBeInTheDocument;
});
it("change value - Departure Port > Airport Group", async () => {
    const { container } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component2 = container.querySelector(
        "[id='accordion__heading-raa-18']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component3 = container.querySelector(
        "[data-testid='Airport Group:Departure Port']"
    );

    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(
        () => document.getElementsByName("departurePortAirportGroup.value"),
        { document }
    );
    const component4 = container.querySelector(
        "[id='departurePortAirportGroup-value']"
    );
    fireEvent.focus(component4);

    fireEvent.change(component4, "");

    await waitFor(() => {
        expect(component4.value).toBe("");
    });

    const component5 = container.querySelector("[data-testid='closeField']");
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("[name='departurePortAirportGroup>check']"))
        .not.toBeInTheDocument;
});

it("enable condition and selecting two filters", async () => {
    const { container, getByText } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component2 = container.querySelector(
        "[id='accordion__heading-raa-20']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component3 = container.querySelector(
        "[data-testid='Airport Group:Departure Port']"
    );

    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component4 = container.querySelector(
        "[data-testid='City:Departure Port']"
    );

    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(
        () => document.getElementsByName("departurePortAirportGroup.value"),
        { document }
    );
    const component5 = container.querySelector(
        "[name='departurePortAirportGroup.value']"
    );
    userEvent.type(component5, "deployed");
    await waitFor(() => {
        expect(component5.value).toBe("deployed");
    });
    const component6 = container.querySelector(
        "[id='departurePortAirportGroup>check']"
    );
    fireEvent.click(component6);
    const conditionField = container.querySelector(
        "[name='departurePortAirportGroup.condition']"
    );
    fireEvent.focus(conditionField);
    fireEvent.keyDown(
        container.querySelector("[name='departurePortAirportGroup.condition']"),
        {
            key: "ArrowDown",
            code: 40
        }
    );
    await waitFor(() => expect(getByText("equal to")).toBeInTheDocument());
    const component7 = container.querySelector(
        "[id='departurePortAirportGroup>check']"
    );
    fireEvent.click(component7);
    expect(container.querySelector("[name='departurePortAirportGroup>check']"))
        .toBeInTheDocument;

    const component8 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );
    act(() => {
        component8.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component9 = container.querySelector(
        "[data-testid='deployed,departurePortAirportGroup']"
    );
    await waitFor(() => {
        expect(component9).toBeInTheDocument;
    });
});

it("applyFilter validation", () => {
    const { container } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component2 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );

    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(container.querySelector("[id='fieldWarning']")).toBeInTheDocument;
});

it("close Departure Port > Airport", async () => {
    const { container } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component2 = container.querySelector(
        "[id='accordion__heading-raa-24']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component3 = container.querySelector(
        "[data-testid='Airport:Departure Port']"
    );
    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(
        () => document.getElementsByName("departurePortAirport.value"),
        { document }
    );
    () => document.getElementsByName("departurePortAirport.value"),
        expect(container.querySelector("[name='departurePortAirport.value']"))
            .toBeInTheDocument;
    const component4 = container.querySelector("[data-testid='Flight No']");
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("flightNo.value"), {
        document
    });
    expect(container.querySelector("[name='flightNo.value']"))
        .toBeInTheDocument;
    const component5 = container.querySelector("[data-testid='AWB Number']");
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("awbNumber.value"), {
        document
    });
    expect(container.querySelector("[name='awbNumber.value']"))
        .toBeInTheDocument;
    const component6 = container.querySelector("[data-testid='Products']");
    act(() => {
        component6.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("products.value"), {
        document
    });
    expect(container.querySelector("[name='products.value']"))
        .toBeInTheDocument;
    const component7 = container.querySelector("[data-testid='Commodities']");
    act(() => {
        component7.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("commodities.value"), {
        document
    });
    expect(container.querySelector("[name='commodities.value']"))
        .toBeInTheDocument;
    const component8 = container.querySelector("[data-testid='Master Select']");
    act(() => {
        component8.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("masterSelect.value"), {
        document
    });
    expect(container.querySelector("[name='masterSelect.value']"))
        .toBeInTheDocument;
});

it("applyFilter - textField", async () => {
    const { container } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component2 = container.querySelector(
        "[ data-testid='Segment Status']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("segmentStatus.value"), {
        document
    });
    const component3 = container.querySelector("[name='segmentStatus.value']");
    userEvent.type(component3, "deployed");
    await waitFor(() => {
        expect(component3.value).toBe("deployed");
    });
    const component4 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component5 = container.querySelector(
        "[data-testid='deployed,segmentStatus']"
    );
    await waitFor(() => {
        expect(component5).toBeInTheDocument;
    });
});

it("applyFilter - textField selected multiple fields", async () => {
    const { container, getAllByText } = render(renderMockComponent);

    const component1 = container.querySelector(
        "[class='neo-btn addFilter btn btn-link btn-sm']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[ data-testid='Booking Profile']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("bookingProfile.value"), {
        document
    });
    const component3 = container.querySelector("[name='bookingProfile.value']");
    userEvent.type(component3, "valid");
    await waitFor(() => {
        expect(component3.value).toBe("valid");
    });
    const component4 = container.querySelector("[ data-testid='Flight Group']");
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("flightGroup.value"), {
        document
    });
    const component5 = container.querySelector("[name='flightGroup.value']");
    userEvent.type(component5, "valid");
    await waitFor(() => {
        expect(component5.value).toBe("valid");
    });
    const component6 = container.querySelector(
        "[ data-testid='Master Select']"
    );
    act(() => {
        component6.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    await waitFor(() => document.getElementsByName("masterSelect.value"), {
        document
    });

    const inputComp = container.querySelector("[name='masterSelect.value']");
    fireEvent.focus(inputComp);
    fireEvent.keyDown(inputComp, {
        key: "ArrowDown",
        code: 40
    });
    await waitFor(() => {
        expect(getAllByText(/FLOWERS/)[0]).toBeInTheDocument();
    });
    fireEvent.change(inputComp, "LOBSTERS");
    await waitFor(() => {
        expect(getAllByText(/LOBSTERS/)[0]).toBeInTheDocument();
    });
    const component8 = container.querySelector(
        "[class='neo-btn applyFilter btn btn-info']"
    );
    act(() => {
        component8.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    const component9 = container.querySelector(
        "[data-testid='valid,bookingProfile']"
    );
    await waitFor(() => {
        expect(component9).toBeInTheDocument;
    });
    const component10 = container.querySelector(
        "[data-testid='valid,flightGroup']"
    );
    await waitFor(() => {
        expect(component10).toBeInTheDocument;
    });
    const component11 = container.querySelector(
        "[data-testid='FLW,LOB,masterSelect']"
    );
    await waitFor(() => {
        expect(component11).toBeInTheDocument;
    });
});
