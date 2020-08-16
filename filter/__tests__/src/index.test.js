/* eslint-disable no-undef */

import React from "react";
import ReactDOM from "react-dom";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import Filter from "../../src/index";
import FilterData from "./data.json";

const airport = [
    { key: "AAA", value: "AAA" },
    { key: "AAB", value: "AAB" },
    { key: "ABA", value: "ABA" },
    { key: "ABB", value: "ABB" },
    { key: "BBA", value: "BBA" },
    { key: "BAA", value: "BAA" },
    { key: "BBB", value: "BBB" }
];
const airportGroup = [
    { key: "AAA", value: "AAA" },
    { key: "AAB", value: "AAB" },
    { key: "ABA", value: "ABA" },
    { key: "ABB", value: "ABB" },
    { key: "BBA", value: "BBA" },
    { key: "BAA", value: "BAA" },
    { key: "BBB", value: "BBB" }
];
FilterData.filter.forEach((item) => {
    if (item.types) {
        Object.keys(item.types).forEach((key) => {
            if (item.types[key].dataSource === "Airport") {
                // eslint-disable-next-line no-param-reassign
                item.types[key].options = airport;
            } else {
                // eslint-disable-next-line no-param-reassign
                item.types[key].options = airportGroup;
            }
        });
    }
});
let container_;

beforeEach(() => {
    container_ = document.createElement("div");
    document.body.appendChild(container_);
});

afterEach(() => {
    document.body.removeChild(container_);
    container_ = null;
});

const appliedFilters = jest.fn();
const savedFilters = jest.fn();
const addingToFavourite = jest.fn();

const props = {
    filterData: { FilterData },
    appliedFilters,
    savedFilters,
    addingToFavourite
};

it("renders without crashing", () => {
    ReactDOM.render(<Filter filterData={FilterData} />, container);
    ReactDOM.unmountComponentAtNode(container);
});

it("handleListFilterCheck", () => {
    const wrapper = render(<Filter props={{ ...props }} />);

    const left = wrapper.getByTestId("handleListFilterCheck");
    fireEvent.click(left);
    expect(left).not.toBeNull();
});

it("showDrawer-check", () => {
    const wrapper = render(
        <Filter filterData={FilterData} props={{ ...props }} />
    );

    const addfilter = wrapper.getByTestId("showDrawer-check");
    fireEvent.click(addfilter);
    expect(addfilter).not.toBeNull();
});

it("applyFilter - date", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
            appliedFilters={appliedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='fieldHeads']");
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component3 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );
    act(() => {
        fireEvent.change(component3, { target: { value: "2020-08-04T13:27" } });
    });

    const component4 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );
    act(() => {
        fireEvent.change(component4, { target: { value: "2020-08-04T13:27" } });
    });

    const component5 = container.querySelector(
        "[class='applyFilter btn btn-']"
    );
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
});

it("saveFilter - Date ", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
            appliedFilters={appliedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );

    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='fieldHeads']");

    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component3 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );

    act(() => {
        // component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        fireEvent.change(component3, { target: { value: "2020-08-04T13:27" } });
    });

    const component4 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );

    act(() => {
        // component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        fireEvent.change(component4, { target: { value: "2020-08-04T13:27" } });
    });

    const component5 = container.querySelector(
        "[class='button-save btn btn-']"
    );

    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const savepopup = container.querySelector("[class='popup--save']");
    const component6 = savepopup.querySelector("[class='txt']");
    act(() => {
        fireEvent.change(component6, { target: { value: "dateFilter" } });
    });

    const savebtnWrap = savepopup.querySelector("[class='btn-wrap']");
    const savebtn = savebtnWrap.querySelectorAll("[class='button']")[1];
    act(() => {
        savebtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(savebtn).not.toBeNull();
});

it("saveFilter - date - empty name", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );

    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector("[data-testid='fieldHeads']");

    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component3 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );

    act(() => {
        // component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        fireEvent.change(component3, { target: { value: "2020-08-04T13:27" } });
    });

    const component4 = container.querySelector(
        "[data-testid='createDateTimeArray-input']"
    );

    act(() => {
        // component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        fireEvent.change(component4, { target: { value: "2020-08-04T13:27" } });
    });

    const component5 = container.querySelector(
        "[class='button-save btn btn-']"
    );
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const savepopup = container.querySelector("[class='popup--save']");
    const component6 = savepopup.querySelector("[class='txt']");
    act(() => {
        fireEvent.change(component6, { target: { value: "" } });
    });

    const savebtnWrap = savepopup.querySelector("[class='btn-wrap']");
    const savebtn = savebtnWrap.querySelectorAll("[class='button']")[1];
    act(() => {
        savebtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(savebtn).not.toBeNull();
});

it("Save filter - Departure Port > Airport", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='handleAccordianArrow']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component3 = container.querySelector(
        "[data-testid='firstAccordion']"
    );
    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component4 = container.querySelector(
        "[id='AirportDeparture Port_input']"
    );
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component5 = container.querySelector(
        "[class='lhyQmCtWOINviMz0WG_gr highlight false option']"
    );
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const sv = container.querySelector("[class='button-save btn btn-']");
    act(() => {
        sv.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const savepopup = container.querySelector("[class='popup--save']");
    const component6 = savepopup.querySelector("[class='txt']");
    act(() => {
        fireEvent.change(component6, { target: { value: "ddlTest" } });
    });

    const savebtnWrap = savepopup.querySelector("[class='btn-wrap']");
    const savebtn = savebtnWrap.querySelectorAll("[class='button']")[1];
    act(() => {
        savebtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(savebtn).not.toBeNull();
});

it("Save empty filter", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='handleAccordianArrow']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const sv = container.querySelector("[class='button-save btn btn-']");
    act(() => {
        sv.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const savepopup = container.querySelector("[class='popup--save']");
    const component6 = savepopup.querySelector("[class='txt']");
    act(() => {
        fireEvent.change(component6, { target: { value: "tst" } });
    });

    const savebtnWrap = savepopup.querySelector("[class='btn-wrap']");
    const savebtn = savebtnWrap.querySelectorAll("[class='button']")[1];
    act(() => {
        savebtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(savebtn).not.toBeNull();
});

it("applyFilter - Departure Port > Airport", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
            appliedFilters={appliedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='handleAccordianArrow']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component3 = container.querySelector(
        "[data-testid='firstAccordion']"
    );
    act(() => {
        component3.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component4 = container.querySelector(
        "[id='AirportDeparture Port_input']"
    );
    act(() => {
        component4.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component5 = container.querySelector(
        "[class='lhyQmCtWOINviMz0WG_gr highlight false option']"
    );
    act(() => {
        component5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component6 = container.querySelector(
        "[class='applyFilter btn btn-']"
    );
    act(() => {
        component6.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(component6).not.toBeNull();
});

it("applyFilter - conditions - Revenue", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
            appliedFilters={appliedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='conditionHeads']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const inputwrap = container.querySelectorAll(
        "[class='filter__content']"
    )[1];
    const component3 = inputwrap.querySelector("[type='number']");

    act(() => {
        fireEvent.change(component3, { target: { value: "2000" } });
    });

    const component6 = container.querySelector(
        "[class='applyFilter btn btn-']"
    );
    act(() => {
        component6.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
});

it("save filter - conditions - Revenue", () => {
    const { container } = render(
        <Filter
            filterData={FilterData}
            props={{ ...props }}
            savedFilters={savedFilters}
            appliedFilters={appliedFilters}
        />
    );

    const component1 = container.querySelector(
        "[data-testid='showDrawer-check']"
    );
    act(() => {
        component1.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const component2 = container.querySelector(
        "[data-testid='conditionHeads']"
    );
    act(() => {
        component2.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const inputwrap = container.querySelectorAll(
        "[class='filter__content']"
    )[1];
    const component3 = inputwrap.querySelector("[type='number']");

    act(() => {
        fireEvent.change(component3, { target: { value: "2000" } });
    });

    const sv = container.querySelector("[class='button-save btn btn-']");
    act(() => {
        sv.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    const savepopup = container.querySelector("[class='popup--save']");
    const component6 = savepopup.querySelector("[class='txt']");
    act(() => {
        fireEvent.change(component6, { target: { value: "revenue" } });
    });

    const savebtnWrap = savepopup.querySelector("[class='btn-wrap']");
    const savebtn = savebtnWrap.querySelectorAll("[class='button']")[1];
    act(() => {
        savebtn.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
});
