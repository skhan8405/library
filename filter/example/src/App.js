import React, { useState } from "react";
import Filter from "filter";
import FilterData from "./data.json";
let data = {};
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
  FilterData.filter.map((item) => {
    if (item.types) {
      return item.types.map((typeItem) => {
        if (typeItem.dataSource === "Airport") {
          return (typeItem = {
            name: typeItem.name,
            dataType: typeItem.dataType,
            enabled: typeItem.enabled,
            dataSource: typeItem.dataSource,
            validationMessage: typeItem.validationMessage,
            options: airport,
          });
        } else if (typeItem.dataSource === "AirportGroup") {
          return (typeItem = {
            name: typeItem.name,
            dataType: typeItem.dataType,
            enabled: typeItem.enabled,
            dataSource: typeItem.dataSource,
            validationMessage: typeItem.validationMessage,
            options: airportGroup,
          });
        }
      });
    }
  });
  data.filter = FilterData.filter;
  console.log(FilterData);
  return <Filter filterData={FilterData} />;
}
