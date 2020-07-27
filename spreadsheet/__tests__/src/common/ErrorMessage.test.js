import React, {useEffect} from 'react';
import ErrorMessage from "../../../src/common/ErrorMessage";
import {shallow, mount} from 'enzyme';

test('ErrorMessage test',  () => {

    const component = shallow(
        <ErrorMessage
          className="errorDiv"
          status="invalid"
        />
    );

    expect(component.text()).toEqual('No Records found!<FontAwesomeIcon />');

});

test('ErrorMessage on-close test',  () => {

    // mock callback
    const mockCloseWarningStatus = jest.fn();
    const mockClearSearchValue = jest.fn();

    const component = mount(
        <ErrorMessage
          className="errorDiv"
          status="invalid"
          closeWarningStatus={mockCloseWarningStatus}
          clearSearchValue={mockClearSearchValue}
        />
    );

    component.find('FontAwesomeIcon').simulate('click');

    expect(mockCloseWarningStatus.mock.calls.length).toBe(1);
    expect(mockClearSearchValue.mock.calls.length).toBe(1);
});


test('ErrorMessage no error test',  () => {

    const component = shallow(
        <ErrorMessage
          className="errorDiv"
          status="valid"
        />
    );

    expect(component.text()).toEqual('');
});