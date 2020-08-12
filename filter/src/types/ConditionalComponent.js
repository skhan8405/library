import React, { useState, useEffect } from "react";
import { ReactComponent as IconTimes } from "../images/icon-close.svg";
import { Form } from "react-bootstrap";

export default function Condition(props) {
    const [conditionArr, setConditionArr] = useState([]);
    useEffect(() => {
        setConditionArr(props.conditionsArray);
    }, [props.conditionsArray]);
    let conditionalDiv = conditionArr.map((item, index) => {
        let validationClass = "";
        if (item.validated === false) {
            validationClass = "text-danger";
        }
        return (
            <div className="filter__input" key={index}>
                <div className="filter__input-title">
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
                            checked={item.enabled}
                            onChange={(e) => {
                                props.handleCondionalEnabled(item);
                            }}
                        />
                        <div
                            onClick={(e) => {
                                props.deleteConditionalElement(item);
                            }}
                        >
                            <IconTimes />
                        </div>
                    </div>
                </div>
                <div
                    onChange={(e) => {
                        props.createConditionalArray(item, e.target.value);
                    }}
                >
                    <div className="displayFlex">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Text className="text-muted">
                                {Object.keys(item)[3]}
                            </Form.Text>
                            <Form.Control
                                disabled={!item.enabled}
                                as="select"
                                defaultValue={item.value}
                            >
                                {item.condition.map((condition, index) => {
                                    return (
                                        <option key={index}>
                                            {condition.value}
                                        </option>
                                    );
                                })}
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <div className="displayFlex">
                        <Form.Group>
                            <Form.Text className="text-muted">
                                {Object.keys(item)[4]}
                            </Form.Text>
                            <Form.Control
                                disabled={!item.enabled}
                                defaultValue={item.amount}
                                required
                                type="number"
                            />
                        </Form.Group>
                    </div>
                </div>
                <span id="fieldWarning" className={validationClass}>
                    {item.warning}
                </span>
            </div>
        );
    });
    return <div>{conditionalDiv}</div>;
}
