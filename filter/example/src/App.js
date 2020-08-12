import React from "react";
import Filter from "filter";
import FilterData from "./data.json";
export default function App() {
    /**
     * Following are the field arrays to be provided for the dropDown option
     * Theses arrays with the key value pairs are recieved/mounted
     */
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
    /**
     * This is where the recieved array of dropdown options are redefined with the passing filter object
     */
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
    /**
     * Method displaying the applied filters at that moment
     * @param {*} appliedFilter is the specific applied filters array
     */
    const appliedFilters = (appliedFilter) => {
        console.log("appliedFilter:", appliedFilter);
    };
    /**
     * Method displaying the saved filters at that moment
     * @param {*} savedFilter is the specific saved filters array
     */
    const savedFilters = (savedFilter) => {
        console.log("savedFilter:", savedFilter);
    };
    /**
     * Method displaying the favourite filters
     * @param {*} favourite is the favourite filter array that just got added as favourite
     */
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
