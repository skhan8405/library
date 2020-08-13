import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
 
import SortItem from '../src/Overlays/groupsort/sortingItem';
 
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

describe('testing sort item ', () => {
  test('render the component', () => {
    const onMoveSort = jest.fn();
    const onFindSort = jest.fn();
    const updateSingleSortingOptionFn = jest.fn();
    const copySortOptionFn = jest.fn();
    const deleteSortOptionFn = jest.fn();
        const wrapper = render(
            <SortItem
            id={props.sortArray.id}
            key={props.sortArray.id}
            sortOption={props.sortArray}
            originalColumns={props.sortArray}
            moveSort={onMoveSort}
            findSort={onFindSort}
            updateSingleSortingOption={
                updateSingleSortingOptionFn
            }
            copySortOption={copySortOptionFn}
            deleteSortOption={deleteSortOptionFn}
        />
        )
    screen.debug();
  });

  test('check length', () => {
        expect(sortItems).toHaveLength(4);
  });
 
  expect(onClick).toHaveBeenCalledTimes(1);
  
  test('calls the onClick copy handler', () => {
    const onClick = jest.fn();
 
    render(
      <SortItem value="" onClick={onClick}>
        Search:
      </SortItem>
    );
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

