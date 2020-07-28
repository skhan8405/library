import React from 'react';
import {shallow, mount} from 'enzyme';
import ColumnsList from "../../../../src/overlays/column_chooser/columnsList";

describe('<ColumnsList />', () => {
    it('mount', () => {
        const wrapper = mount(<ColumnsList/>)
        expect(wrapper).not.toBeNull();
    });
});