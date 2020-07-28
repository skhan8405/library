import React from 'react';
import {shallow, mount} from 'enzyme';
import ColumnItem from "../../../../src/overlays/column_chooser/columnItem";

describe('<ColumnItem />', () => {
    it('mount', () => {
        const wrapper = mount(<ColumnItem/>)
        expect(wrapper).not.toBeNull();
    });
});