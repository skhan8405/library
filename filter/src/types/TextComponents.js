import React, { useEffect, useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form } from "react-bootstrap";

export default function TextComponents(props) {
  const [textComponentArr, setTextComponentArr] = useState([]);
  useEffect(() => {
    setTextComponentArr(props.textComponentsArray);
  }, [props.textComponentsArray]);

  let textComponentDiv = textComponentArr.map((item, index) => {
    let validationClass = "";
    if (item.validated === false) {
      validationClass = "text-danger";
    }
    return (
      <div key={index}>
        <div className="filter__input">
          <div className="filter__input-title">
            <div className="filter__label">
              <span>{item.name}</span>
            </div>
            <div className="filter__control">
              <Form.Check
                type="switch"
                label=""
                id={item.name}
                checked={item.enabled}
                onChange={(e) => {
                  props.handleTextComponentEnabled(item);
                }}
              ></Form.Check>
              <FontAwesomeIcon
                icon={faTimes}
                type="button"
                onClick={(e) => {
                  props.deleteTextComponentElement(item);
                }}
              />
            </div>
          </div>
          <div className="displayFlex">
            <input
              id={item.name.concat(item.dataType)}
              disabled={!item.enabled}
              type="text"
              defaultValue={item.value}
              className="form-control"
              onChange={(e) => {
                props.createTextComponentsArray(item, e.target.value);
              }}
            ></input>
          </div>
        </div>
        <span id="fieldWarning" className={validationClass}>
          {item.warning}
        </span>
      </div>
    );
  });

  return <div>{textComponentDiv}</div>;
}
