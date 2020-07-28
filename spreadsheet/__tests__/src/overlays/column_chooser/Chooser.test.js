import React from 'react';
import {shallow, mount} from 'enzyme';
import ColumnReordering from "../../../../src/overlays/column_chooser/Chooser";

describe('<ColumnReordering />', () => {
    it('mount', () => {
        const wrapper = mount(<ColumnReordering/>)
        expect(wrapper).not.toBeNull();
    });
});