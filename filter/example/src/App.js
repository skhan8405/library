import React from "react";
import Filter from "filter";
import FilterData from "./data.json";
export default function App() {
  const airport = [
    { key: "AAA", value: "AAA" },
    { key: "AAB", value: "AAB" },
    { key: "ABA", value: "ABA" },
    { key: "ABB", value: "ABB" },
    { key: "BBA", value: "BBA" },
    { key: "BAA", value: "BAA" },
    { key: "BBB", value: "BBB" },
  ];
  const airportGroup = [
    { key: "AAA", value: "AAA" },
    { key: "AAB", value: "AAB" },
    { key: "ABA", value: "ABA" },
    { key: "ABB", value: "ABB" },
    { key: "BBA", value: "BBA" },
    { key: "BAA", value: "BAA" },
    { key: "BBB", value: "BBB" },
  ];
  FilterData.filter.forEach((item) => {
    if (item.types) {
      for (let i in item.types) {
        if (item.types[i].dataSource === "Airport") {
          item.types[i].options = airport;
        } else {
          item.types[i].options = airportGroup;
        }
      }
    }
  });
  const appliedFilters = (appliedFilter) => {
    console.log("appliedFilter:", appliedFilter);
  };
  const savedFilters = (savedFilter) => {
    console.log("savedFilter:", savedFilter);
  };
  const addingToFavourite = (favourite) => {
    console.log(favourite);
  };
  return (
    <Filter
      filterData={FilterData}
      appliedFilters={appliedFilters}
      savedFilters={savedFilters}
      addingToFavourite={addingToFavourite}
    />
  );
}
