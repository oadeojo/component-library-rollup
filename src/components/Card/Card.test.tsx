import { shallow } from 'enzyme';
import shallowToJson from 'enzyme-to-json';
import * as React from 'react';

import Card from './Card';

describe('Card', () => {
    it('should render with no props', () => {
        const output = shallow(
            <Card />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
    it('should render title', () => {
        const output = shallow(
            <Card title="My Card Title" />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
    it('should render a header image', () => {
        const output = shallow(
            <Card headerImg="plop.png" />
        );
        expect(shallowToJson(output)).toMatchSnapshot();
    });
});
