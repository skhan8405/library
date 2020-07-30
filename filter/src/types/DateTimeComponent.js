import React, { useState, useEffect } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";

export default function FieldComponent(props) {
  const [fieldComponentArr, setFieldComponentArr] = useState([]);
  useEffect(() => {
    setFieldComponentArr(props.dateTimesArray);
  }, [props.dateTimesArray]);
  /**
   * Method To close the filter
   * @param {*} item is specific filter element
   */
  const handleClose = (item) => {
    props.deleteDateTimeElement(item);
  };
  let fieldComponentDiv = fieldComponentArr.map((item, index) => {
    return (
      <div className="filter__input" key={index}>
        <div className="filter__input-title" key={1}>
          <div className="filter__label">
            <Form.Label>
              <strong>{item.name}</strong>
            </Form.Label>
          </div>
          <div className="filter__control">
            <Form.Check
              type="switch"
              id={item.name}
              label=""
              defaultChecked={item.enabled}
              onChange={(e) => {
                props.handleDateTimeEnabled(item);
              }}
            />

            <FontAwesomeIcon
              className="fontIcons"
              icon={faTimes}
              onClick={(e) => {
                handleClose(item);
              }}
            />
          </div>
        </div>
        {item.field.map((field, index) => {
          return (
            <div key={`${index}-${field.name}`}>
              <div className="displayFlex" key={`${index},${field.name}`}>
                <Form.Text>{field.column}</Form.Text>
              </div>
              <div className="filter__split" key={index}>
                <div className="date-wrap">
                  <Form.Control
                    disabled={!item.enabled}
                    type="datetime-local"
                    value={field.value}
                    className={field.name}
                    onChange={(e) => {
                      props.createDateTimeArray(
                        item,
                        field.column,
                        e.target.value
                      );
                    }}
                  />
                  <span className="date-button">
                    <button type="button"></button>
                  </span>
                </div>
                {/* <div className="time-wrap">
                  <input
                    className="time"
                    type="time"
                    disabled={!item.enabled}
                    onChange={(e) => {
                      bindTimeToDate(e.target.value, item);
                    }}
                  />
                </div> */}
              </div>
            </div>
          );
        })}
        {/* <div className="days">
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addToday();
            }}
          >
            Today
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addTomorrow();
            }}
          >
            Tomorrow
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addThisWeek();
            }}
          >
            This Week
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addSevenDays();
            }}
          >
            Next 7 days
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addForteenDays();
            }}
          >
            Next 14 days
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addThisMonth();
            }}
          >
            This Month
          </button>
          <button
            disabled={!item.enabled}
            type="button"
            onClick={(e) => {
              props.addThirtyDays();
            }}
          >
            Next 30 days
          </button>
          <br />
          Next{" "}
          <input
            disabled={!item.enabled}
            type="text"
            onChange={(e) => {
              props.nextDayChange(e.target.value);
            }}
          />{" "}
          Days
          <br />
          Last{" "}
          <input
            disabled={!item.enabled}
            type="text"
            onChange={(e) => {
              props.lastDayChange(e.target.value);
            }}
          />{" "}
          Days
        </div> */}
      </div>
    );
  });
  return <div>{fieldComponentDiv}</div>;
}
