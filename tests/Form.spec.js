import React from 'react';
import {shallow} from 'enzyme';
import Form from '../src/Form';

describe('Form', () => {
    it('should render correctly', () => {
        let wrapper = shallow(<Form className="myForm"><span className="abc">abc</span></Form>);
        expect(wrapper.contains(<span className="abc">abc</span>)).toBe(true);
        expect(wrapper.is('.myForm')).toBe(true);
    });

    it('should add the vaidationRule', () => {
        Form.addValidationRule("testRule", (values, value) => {
            return value === 'abc';
        }, false);
        expect(Form.validationRules.testRule(null, 'abc')).toBe(true);
        expect(Form.validationRules.testRule(null, 'ac')).toBe(false);
    });
});
