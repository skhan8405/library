import React from 'react';
import { act } from "react-dom/test-utils";
import { shallow, mount } from 'enzyme';
import ColumnsList, { findColumn } from "../../../../src/overlays/column_chooser/columnsList";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

describe('<ColumnsList />', () => {
    const columns = [
        {
            'id': 1,
            key: "flightno",
            text: "FlightNo"
        },
        {
            'id': 2,
            key: "date",
            text: "Date"
        },
        {
            'id': 3,
            key: "segmentfrom",
            text: "Segment From"
        }];
    const props = {
        columnsArray: [...columns]
    }
    // it('mount', () => {
    //     const wrapper = mount(<ColumnsList  props={props}/>)
    //     expect(wrapper).not.toBeNull();
    // });


    it('mount', () => {
        const handleReorderList = (p) => { };

        const wrapper = mount(<DndProvider
            backend={TouchBackend}
            options={{ enableMouseEvents: true }}>
            <ColumnsList props={props}
                columnsArray={columns}
                handleReorderList={handleReorderList}
            />
        </DndProvider>)
        expect(wrapper.find('ColumnItem')).not.toBeNull();
    });


    it('ColumnsList item length', () => {
        let valuesUpdated = []
        const handleReorderList = (values) => valuesUpdated = [...values];
        const wrapper = mount(<DndProvider
            backend={TouchBackend}
            options={{ enableMouseEvents: true }}>
            <ColumnsList props={props}
                columnsArray={columns}
                handleReorderList={handleReorderList}
            />
        </DndProvider>)
        expect(wrapper.find('ColumnItem').length).toEqual(3)

    });


    it('ColumnsList moveColumn()', () => {
        let valuesUpdated = []
        const handleReorderList = jest.fn();
        const onMoveColumn = jest.fn()
        const onFindColumn = jest.fn()
        let col = []
        columns.forEach(a => col.push({ ...a, moveColumn: onMoveColumn, findColumn: onFindColumn }))
        props.columnsArray = col;

        act(() => {
            let wrapper = mount(<DndProvider
                backend={TouchBackend}
                options={{ enableMouseEvents: true }}>
                <ColumnsList moveColumn={onMoveColumn} findColumn={onFindColumn}
                    columnsArray={col}
                    handleReorderList={handleReorderList}
                />
            </DndProvider>)

            expect(wrapper.find("ColumnItem").at(0).props().id).toEqual("1")

            wrapper.find("ColumnItem").at(0).props().moveColumn(1, 2)
        });

        expect(onMoveColumn).toHaveBeenCalledTimes(1);

        expect(handleReorderList).toHaveBeenCalledTimes(1);
    });
});
