import React from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";
import SortItem from "./sortingItem";

const SortingList = (props) => {
    const moveSort = (sortId, atIndex) => {
        const { sort, index } = findSort(sortId);
        props.updateSortingOptions(
            update(props.sortOptions, {
                $splice: [
                    [index, 1],
                    [atIndex, 0, sort]
                ]
            })
        );
    };

    const findSort = (sortId) => {
        const sort = props.sortOptions.filter((c, index) => index === sortId)[0];
        return {
            sort,
            index: props.sortOptions.indexOf(sort)
        };
    };

    const [, drop] = useDrop({ accept: ItemTypes.SORT_ITEM });

    return (
        <React.Fragment>
            <div ref={drop} style={{ display: "flex", flexWrap: "wrap" }}>
                {props.sortOptions.map((sortOption, index) => {
                    return (
                        <SortItem
                            id={index}
                            key={index}
                            sortOption={sortOption}
                            originalColumns={props.originalColumns}
                            moveSort={moveSort}
                            findSort={findSort}
                            updateSingleSortingOption={props.updateSingleSortingOption}
                            copySortOption={props.copySortOption}
                            deleteSortOption={props.deleteSortOption}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
};

export default SortingList;
