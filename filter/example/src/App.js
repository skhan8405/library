import React from "react";
import Filter from "filter";
import FilterData from "./data.json";

export default function App() {
  return <Filter filterData={FilterData} />;
}
