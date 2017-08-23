import React from 'react';
import {mount, shallow} from 'enzyme';
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

    it('should mount and unmount correctly', () => {
        let wrapper = mount(<Form className="myForm"><span className="abc">abc</span></Form>);
        expect(wrapper.instance().initialized).toBe(true);
        wrapper.unmount();
    });

    it('should submit successfully and call all events', () => {
        const onSubmit = jest.fn();
        const onValidSubmit = jest.fn();
        const onInvalidSubmit = jest.fn();
        const onValid = jest.fn();
        const onInvalid = jest.fn();
        let wrapper = mount(<Form className="myForm"
                                  onSubmit={onSubmit}
                                  onValidSubmit={onValidSubmit}
                                  onInvalidSubmit={onInvalidSubmit}
                                  onValid={onValid}
                                  onInvalid={onInvalid}>
            <button type="submit"/>
        </Form>);
        wrapper.find('button').get(0).click();
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({});
        expect(onValidSubmit).toHaveBeenCalledTimes(1);
        expect(onValidSubmit).toHaveBeenCalledWith({});
        expect(onInvalidSubmit).not.toBeCalled();
        expect(onInvalid).toHaveBeenCalledTimes(1);
        expect(onInvalid).toHaveBeenCalledWith({}, false);
        expect(onValid).toHaveBeenCalledTimes(1);
        expect(onValid).toHaveBeenCalledWith({});
    });

    it('should submit without triggering the events', () => {
        let wrapper = mount(<Form className="myForm">
            <button type="submit"/>
        </Form>);
        wrapper.find('button').get(0).click();
    });
});
