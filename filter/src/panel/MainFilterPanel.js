import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import SavedFilters from "./SavedFilters";

let chips;
const MainFilterPanel = (props) => {
  const [listFilter, setListFilter] = useState(false);
  const [chipArray, setChipArray] = useState([]);
  useEffect(() => {
    setChipArray(props.applyFilterChip.applyFilter);
  }, [props.applyFilterChip]);
  const handleListFilter = () => {
    setListFilter(!listFilter);
  };
  if (chipArray) {
    chips = chipArray.map((item, index) => {
      if (item.type) {
        return (
          <div
            className="listContent"
            key={index}
            onClick={(e) => {
              props.addAppliedFilters(item);
            }}
          >
            <span>
              {item.name}:{item.type}
            </span>
            {item.value.map((value, index) => {
              return <div key={index}>{value.value}</div>;
            })}
          </div>
        );
      } else if (item.condition) {
        return (
          <div
            className="listContent"
            key={index}
            onClick={(e) => {
              props.addAppliedFilters(item);
            }}
          >
            <span>{item.name}</span>:{item.condition}
            {item.amount}
          </div>
        );
      } else if (item.fieldValue) {
        return (
          <div
            className="listContent"
            key={index}
            onClick={(e) => {
              props.addAppliedFilters(item);
            }}
          >
            <span>{item.fieldValue}</span>
            {item.value}
          </div>
        );
      } else {
        return (
          <div
            className="listContent"
            key={index}
            onClick={(e) => {
              props.addAppliedFilters(item);
            }}
          >
            <span>{item.name}</span>:{item.value}
          </div>
        );
      }
    });
  } else {
    chips = <div></div>;
  }

  return (
    <div className="list">
      <div className="displayFlex">
        <div className="alignLeft">
          <FontAwesomeIcon icon={faAlignLeft} onClick={handleListFilter} />
          <SavedFilters
            onSelectSavedFilter={props.onSelectSavedFilter}
            showFilter={listFilter}
            handleListFilter={handleListFilter}
            addSavedFilters={props.addSavedFilters}
          />
          <div className="leftSpace">All flights</div>
        </div>
      </div>
      <div className="secondList">
        <div className="displayFlex">
          {chips}
          <div
            onClick={(e) => {
              props.showDrawer();
            }}
          >
            + Add Filter
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFilterPanel;
