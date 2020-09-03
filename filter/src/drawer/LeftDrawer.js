/* eslint-disable react/destructuring-assignment */

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Accordion, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { IconUpArrow } from "../Utilities/SvgUtilities";

export default function LeftDrawer(props) {
    const [leftDrawData, setLeftDrawData] = useState([]);
    const [leftDrawTemp, setLeftDrawTemp] = useState([]);
    const [showUpArrow, setShowUpArrow] = useState("");
    const [showDownArrow, setShowDownArrow] = useState("none");

    useEffect(() => {
        const typeArray = [];
        setLeftDrawData(props.filterData.filter);
        setLeftDrawTemp(props.filterData.filter);
        props.filterData.filter.forEach((item) => {
            if (item.types) {
                item.types.forEach((type) => {
                    typeArray.push(type.name);
                });
            }
        });
    }, [props.filterData.filter]);
    /**
     * Method To filter out the filters displayed at the left drawer
     * @param {*} e triggered on typing on the search field
     */
    const searchFilterHandler = (e) => {
        let filteredList = [];
        // eslint-disable-next-line no-unused-vars
        const searchKey = e.target.value;
        if (leftDrawData) {
            filteredList = leftDrawTemp.filter((item) => {
                return (
                    item.name &&
                    item.name.toLowerCase().includes(searchKey.toLowerCase())
                );
            });
        }
        setLeftDrawData(filteredList);
    };

    const handleAccordian = () => {
        if (showUpArrow === "" || showDownArrow === "none") {
            setShowUpArrow("none");
            setShowDownArrow("");
        } else {
            setShowUpArrow("");
            setShowDownArrow("none");
        }
    };

    const accordianHeads = leftDrawData.map((item) => {
        if (item.types && item.types.length > 0) {
            return (
                <div>
                    <Accordion>
                        <Card>
                            <Accordion.Toggle
                                data-testid="handleAccordianArrow"
                                onClick={() => {
                                    handleAccordian();
                                }}
                                style={{ fontWeight: item.weight }}
                                as={Card.Header}
                                eventKey="1"
                            >
                                {item.name}
                                <div
                                    className="accordionLeft"
                                    style={{ display: showUpArrow }}
                                >
                                    <IconUpArrow />
                                </div>
                                <div
                                    className="accordionRight"
                                    style={{ display: showDownArrow }}
                                >
                                    <IconUpArrow />
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <ul className="firstAccordion">
                                        {item.types &&
                                            item.types.map((type) => {
                                                return (
                                                    <li
                                                        role="presentation"
                                                        style={{
                                                            fontWeight:
                                                                type.weight
                                                        }}
                                                        data-testid="firstAccordion"
                                                        onClick={() => {
                                                            props.fromLeftToRight(
                                                                item.name,
                                                                type.dataType,
                                                                type.enabled,
                                                                type.name,
                                                                item.field,
                                                                type.condition,
                                                                type.dataSource,
                                                                type.validationMessage,
                                                                type.options
                                                            );
                                                            // props.addedFilterCount();
                                                        }}
                                                        key={type.name}
                                                    >
                                                        {type.name}
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            );
        }
        return <div key={item.name} />;
    });
    const fieldHeads = leftDrawData.map((item) => {
        if (item.field && item.field.length > 0) {
            return (
                <div className="fieldHeads">
                    <li
                        key={item.name}
                        role="presentation"
                        style={{ fontWeight: item.weight }}
                        data-testid="fieldHeads"
                        onClick={() => {
                            props.fromLeftToRight(
                                item.name,
                                item.dataType,
                                item.enabled,
                                item.types,
                                item.field,
                                item.condition,
                                item.dataSource,
                                item.validationMessage,
                                item.options
                            );
                            // props.addedFilterCount();
                        }}
                    >
                        {item.name}
                    </li>
                </div>
            );
        }
        return <div key={item.name} />;
    });
    // const conditionHeads = leftDrawData.map((item, index) => {
    //     if (item.condition.length) {
    //         return (
    //             <div className="conditionHeads" key={index}>
    //                 <li
    //                     role="presentation"
    //                     style={{ fontWeight: item.weight }}
    //                     onClick={() => {
    //                         props.fromLeftToRight(
    //                             item.name,
    //                             item.dataType,
    //                             item.enabled,
    //                             item.types,
    //                             item.field,
    //                             item.condition,
    //                             item.dataSource,
    //                             item.validationMessage,
    //                             item.options
    //                         );
    //                         // props.addedFilterCount();
    //                     }}
    //                 >
    //                     {item.name}
    //                 </li>
    //             </div>
    //         );
    //     }
    //     return <div key={index} />;
    // });
    const normalHeads = leftDrawData.map((item) => {
        if (
            item.field &&
            item.field.length <= 0 &&
            item.types &&
            item.types.length <= 0
        ) {
            return (
                <div className="normalHeads">
                    <li
                        key={item.name}
                        role="presentation"
                        style={{ fontWeight: item.weight }}
                        data-testid="normalHeads"
                        onClick={() => {
                            props.fromLeftToRight(
                                item.name,
                                item.dataType,
                                item.enabled,
                                item.types,
                                item.field,
                                item.condition,
                                item.dataSource,
                                item.validationMessage,
                                item.options
                            );
                            // props.addedFilterCount();
                        }}
                    >
                        {item.name}
                    </li>
                </div>
            );
        }
        return <div key={item.dataType} />;
    });
    return (
        <div>
            <Form.Row>
                <Form.Control
                    required
                    type="text"
                    placeholder="Search a Filter"
                    defaultValue=""
                    className="customControl"
                    data-testid="searchFilterHandler-input"
                    onChange={searchFilterHandler}
                />
            </Form.Row>
            <div className="leftDrawer">
                <div>{accordianHeads}</div>
                <div>{fieldHeads}</div>
                <div>{normalHeads}</div>
            </div>
        </div>
    );
}

LeftDrawer.propTypes = {
    filterData: PropTypes.any,
    fromLeftToRight: PropTypes.any
};
