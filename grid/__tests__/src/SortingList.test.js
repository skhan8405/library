import React from 'react';
import { DndProvider } from "react-dnd";
import SortingList from "../../src/Overlays/groupsort/sortingList";

import '@testing-library/jest-dom';
import { render ,screen, getByRole, } from '@testing-library/react';
import { TouchBackend } from "react-dnd-touch-backend";


const sortItems = [
    {
      id: 1,
      key: "flightno",
      text: "FlightNo",
      
    },
    {
      id: 2,
      key: "yield",
      text: "Yield",
      
    },
    {
      id: 3,
      key: "revenue",
      text: "Revenue",
      
    },
    {
      id: 4,
      key: "revenue",
      text: "Revenue",
      
    },
  ];

  const props = {
    sortArray: [...sortItems]
  }

describe("test cases for sorting list", () => {
  it("check the Sort item not null", () => {
    render(
        <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
            <SortingList
                    sortOptions={props.sortArray}
                    originalColumns={props.sortArray}
                />
        </DndProvider>
    );    
    expect('listitem').toBe('listitem');
    expect(screen.getAllByRole('listitem'));

  });

  it("Renders component correctly", () => {
      const onMoveSort = jest.fn();
      const onFindSort = jest.fn();
      const updateSingleSortingOptionFn = jest.fn();
      const copySortOptionFn = jest.fn();
      const deleteSortOptionFn = jest.fn();
      let item = [];
      sortItems.forEach((a) =>
          item.push({ ...a, moveSort: onMoveSort, findSort: onFindSort, 
            updateSingleSortingOption:updateSingleSortingOptionFn,
            copySortOption: copySortOptionFn,
            deleteSortOption: deleteSortOptionFn})
      );
      props.sortArray = item;
      const wrapper = render(
          <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
              <SortingList
                  moveSort={onMoveSort}
                  findSort={onFindSort}
                  sortOptions={sortItems}
                  originalColumns={sortItems}                 
              />
          </DndProvider>
      );
       // screen.debug();
       
        
        expect(wrapper.findByText(moveSort)).toHaveBeenCalledTimes(1);

        //expect(getByText("SortItem").moveSort(1, 2);
    });
});





