import React, { useEffect, useState } from "react";
import {
    IAccordion,
    IAccordionItem,
    IAccordionItemTitle,
    IAccordionItemBody
} from "@neo-ui/accordion";
import PropTypes from "prop-types";

export default function LeftDrawer(props) {
    const [leftDrawData, setLeftDrawData] = useState([]);
    const [leftDrawTemp, setLeftDrawTemp] = useState([]);
    const { filterData } = props;
    useEffect(() => {
        const typeArray = [];
        setLeftDrawData(filterData.filter);
        setLeftDrawTemp(filterData.filter);
        filterData.filter.forEach((item) => {
            if (item.types) {
                item.types.forEach((type) => {
                    typeArray.push(type.name);
                });
            }
        });
    }, [filterData.filter]);

    /**
     * Method To filter out the filters displayed at the left drawer
     * @param {*} e triggered while typing on the search field
     */
    const searchFilterHandler = (e) => {
        let filteredList = [];
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
    const filterList = leftDrawData.map((item, index) => {
        if (item.isSubFilters) {
            return (
                <div key={`${item.name}+${index}`} className="accordion__list">
                    <IAccordion className="accordion-no-border">
                        <IAccordionItem>
                            <IAccordionItemTitle>
                                {item.name}
                            </IAccordionItemTitle>
                            <IAccordionItemBody>
                                {item.types &&
                                    item.types.map((type) => {
                                        return (
                                            <div
                                                className="accordion__item"
                                                role="presentation"
                                                style={{
                                                    fontWeight: type.weight,
                                                    cursor: "pointer"
                                                }}
                                                data-testid={`${type.name}:${item.name}`}
                                                onClick={() => {
                                                    props.accordionFromLeftToRight(
                                                        item.name,
                                                        item.isSubFilters,
                                                        type.name,
                                                        type.dataType,
                                                        type.condition,
                                                        type.required,
                                                        type.label,
                                                        type.props
                                                    );
                                                    props.setInitialValueFilterGroup(
                                                        type.label,
                                                        type.dataType
                                                    );
                                                }}
                                                key={`${type.name}:${item.name}`}
                                            >
                                                {type.name}
                                            </div>
                                        );
                                    })}
                            </IAccordionItemBody>
                        </IAccordionItem>
                    </IAccordion>
                </div>
            );
        }
        if (!item.isSubFilters) {
            return (
                <div className="fieldHeads" key={`${item.name},${index}`}>
                    <li
                        key={`${item.name}_${index}`}
                        role="presentation"
                        style={{ fontWeight: item.weight }}
                        data-testid={item.name}
                        onClick={() => {
                            props.fromLeftToRight(
                                item.name,
                                item.isSubFilters,
                                item.dataType,
                                item.condition,
                                item.required,
                                item.label,
                                item.props
                            );
                            props.setInitialValueIndividualFields(item);
                        }}
                    >
                        {item.name}
                    </li>
                </div>
            );
        }
        return <div />;
    });
    return (
        <div>
            <input
                required
                type="text"
                placeholder="Search a Filter"
                defaultValue=""
                className="customControl"
                data-testid="searchFilterHandler-input"
                onChange={searchFilterHandler}
            />
            <div className="leftDrawer">
                <div>{filterList}</div>
            </div>
        </div>
    );
}

LeftDrawer.propTypes = {
    filterData: PropTypes.any,
    fromLeftToRight: PropTypes.any,
    accordionFromLeftToRight: PropTypes.any,
    setInitialValueFilterGroup: PropTypes.any,
    setInitialValueIndividualFields: PropTypes.any
};
