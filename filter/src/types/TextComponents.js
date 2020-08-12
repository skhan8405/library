import React, { useEffect, useState } from "react";
import { ReactComponent as IconTimes } from "../images/icon-close.svg";
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
                            <div
                                onClick={(e) => {
                                    props.deleteTextComponentElement(item);
                                }}
                            >
                                <IconTimes />
                            </div>
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
                                props.createTextComponentsArray(
                                    item,
                                    e.target.value
                                );
                            }}
                        ></input>
                    </div>
                    <span id="fieldWarning" className={validationClass}>
                        {item.warning}
                    </span>
                </div>
            </div>
        );
    });

    return <div>{textComponentDiv}</div>;
}
