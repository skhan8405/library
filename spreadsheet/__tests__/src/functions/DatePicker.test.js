import React from 'react';
import {shallow, mount} from 'enzyme';
import DatePicker from "../../../src/functions/DatePicker";

describe('<DatePicker />', () => {
    it('mount', () => {
        const wrapper = mount(<DatePicker/>)
        expect(wrapper).not.toBeNull();
        expect(wrapper.find('input').type()).toEqual("input");// render input
        expect(wrapper.find('input').props()['type']).toEqual("date");// type='date'
        wrapper.find('input').simulate('change');

        const instance = wrapper.instance();
        expect(instance.getValue()).not.toBeNull();// calling getValue method directly - this is an anti pattern :)
        //TODO - the above line throws RangeError: Invalid time value. Please correct
    });
});