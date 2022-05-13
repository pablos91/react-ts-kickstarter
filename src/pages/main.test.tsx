import * as React from 'react';
import { MainPage } from './main';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { describe, expect, it } from '@jest/globals';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('renders without error', () => {
    const wrapper = shallow(<MainPage />)

    expect(wrapper.exists()).toBe(true)
})