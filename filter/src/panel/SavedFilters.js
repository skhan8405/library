import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { ReactComponent as IconCheck } from "../images/icon-check.svg";

const SavedFilters = (props) => {
    const [showFilter, setShowFilter] = useState(false);
    const listRef = useRef();
    useEffect(() => {
        const listHandler = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                setShowFilter(false);
                props.handleListFilter();
            }
        };
        setShowFilter(props.showFilter);
        document.addEventListener("mousedown", listHandler);

        return () => {
            document.removeEventListener("mousedown", listHandler);
        };
    }, [props]);

    const keyValue = "";
    let savedFilters = localStorage.getItem("savedFilters");
    savedFilters = savedFilters ? JSON.parse(savedFilters) : [];

    const savedFilter = savedFilters.map((filterArray, index) => {
        return (
            <div key={index}>
                <div className="alignLeft">
                    <div>
                        <IconCheck />
                    </div>
                    <div
                        role="presentation"
                        style={{ marginLeft: "15px" }}
                        data-testid="addSavedFilters-check"
                        onClick={() => {
                            // below two methods are required for closing the savedFilter list popUp
                            setShowFilter(false);
                            props.handleListFilter();
                            props.addSavedFilters(filterArray);
                        }}
                    >
                        {Object.keys(filterArray)[0]}
                    </div>
                </div>
            </div>
        );
    });
    if (showFilter) {
        return (
            <div className="filter__saved" ref={listRef}>
                <div className="savedFilters">
                    <div className="text-muted">Saved Filters</div>
                    <ul key={keyValue} className="leftSpace">
                        {savedFilter}
                    </ul>
                </div>
            </div>
        );
    }
    return <div />;
};

SavedFilters.propTypes = {
    handleListFilter: PropTypes.any,
    showFilter: PropTypes.any,
    addSavedFilters: PropTypes.any
};

export default SavedFilters;
