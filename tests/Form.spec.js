import React from 'react';
import {shallow} from 'enzyme';
import Form from '../src/Form';

describe('Form', () => {
    it('should render correctly', () => {
        let wrapper = shallow(<Form><span className="abc">abc</span></Form>);
        expect(wrapper.contains(<span className="abc">abc</span>)).toBe(true);
    });
});
