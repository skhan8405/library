import React from 'react';
import {shallow, mount} from 'enzyme';
import ExportData from "../../../../src/overlays/export_data/ExportData";

describe('<ColumnsList />', () => {
    it('mount', () => {
        const wrapper = mount(<ExportData/>)
        expect(wrapper).not.toBeNull();
    });
});