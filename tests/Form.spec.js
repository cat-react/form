import React from 'react';
import {mount, shallow} from 'enzyme';
import Form from '../src/Form';
import Input from '../src/Input';

@Input
class CustomInput extends React.Component {
    render() {
        return <div/>;
    }
}

class SpecialForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInput: false
        };
    }

    render() {
        let input = null;
        if (this.state.showInput) {
            input = <CustomInput name="email" value="" validations={{isRequired: true}}/>;
        }

        return (
            <Form {...this.props}>
                <CustomInput name="email2" value=""/>
                {input}
            </Form>
        );
    }
}

describe('Form', () => {
    it('should render correctly', () => {
        const onInvalid = jest.fn();
        let wrapper = shallow(<Form className="myForm" onInvalid={onInvalid}><span className="abc">abc</span></Form>);
        wrapper.instance().validate();
        expect(wrapper.contains(<span className="abc">abc</span>)).toBe(true);
        expect(wrapper.is('.myForm')).toBe(true);
        expect(onInvalid).not.toHaveBeenCalled();
    });

    it('should pass all props correctly', () => {
        let wrapper = shallow(<Form className="myForm" autoComplete="off"><span className="abc">abc</span></Form>);
        expect(wrapper.html()).toBe('<form class="myForm" autocomplete="off"><span class="abc">abc</span></form>');
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
        const onValidChanged = jest.fn();
        const onValid = jest.fn();
        const onInvalid = jest.fn();
        let wrapper = mount(<Form className="myForm"
                                  onSubmit={onSubmit}
                                  onValidSubmit={onValidSubmit}
                                  onInvalidSubmit={onInvalidSubmit}
                                  onValidChanged={onValidChanged}
                                  onValid={onValid}
                                  onInvalid={onInvalid}>
            <button type="submit"/>
        </Form>);
        wrapper.find('button').get(0).click();
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({}, true);
        expect(onValidSubmit).toHaveBeenCalledTimes(1);
        expect(onValidSubmit).toHaveBeenCalledWith({});
        expect(onInvalidSubmit).not.toBeCalled();
        expect(onInvalid).toHaveBeenCalledTimes(1);
        expect(onInvalid).toHaveBeenCalledWith({}, false);
        expect(onValid).toHaveBeenCalledTimes(1);
        expect(onValid).toHaveBeenCalledWith({});
        expect(onValidChanged.mock.calls.length).toBe(2);
        expect(onValidChanged.mock.calls[0]).toEqual([false, {}, false]);
        expect(onValidChanged.mock.calls[1]).toEqual([true, {}, false]);
    });

    it('should submit without triggering the events', () => {
        let wrapper = mount(<Form className="myForm">
            <button type="submit"/>
        </Form>);
        wrapper.find('button').get(0).click();
    });

    it('should attach the input', (done) => {
        const expectedValues = {email: 'abc', email2: 'jmc'};
        const onInvalid = jest.fn();
        const onValid = function (values) {
            expect(onInvalid).toHaveBeenCalledTimes(1);
            expect(onInvalid).toHaveBeenCalledWith(expectedValues, true);
            expect(values).toEqual(expectedValues);
            done();
        };
        let wrapper = mount(<Form className="myForm"
                                  onValid={onValid}
                                  onInvalid={onInvalid}>
            <CustomInput name="email" value="abc"/>
            <CustomInput name="email2" value="jmc"/>
        </Form>);
        expect(wrapper.instance().inputs[0].getName()).toEqual('email');
        expect(wrapper.instance().inputs[1].getName()).toEqual('email2');
    });

    it('should invalidate the form', (done) => {
        const expectedValues = {email: '', email_confirm: 'as'};
        const onValidSubmit = jest.fn();
        const onInvalidSubmit = jest.fn();
        const onValid = jest.fn();
        let count = 0;
        const onInvalid = function (values, validating) {
            expect(values).toEqual(expectedValues);
            if (count === 0) {
                expect(validating).toBe(true);
                count++;
            } else {
                expect(validating).toBe(false);
                expect(onValid).not.toHaveBeenCalled();
                done();
            }
        };
        let wrapper = mount(<Form className="myForm"
                                  onValidSubmit={onValidSubmit}
                                  onInvalidSubmit={onInvalidSubmit}
                                  onValid={onValid}
                                  onInvalid={onInvalid}>
            <CustomInput name="email_confirm" value="as" validations={{equalsField: 'email'}}/>
            <CustomInput name="email" value=""/>
            <button type="submit"/>
        </Form>);
        wrapper.find('button').get(0).click();
        expect(onValidSubmit).not.toHaveBeenCalled();
        expect(onInvalidSubmit).toHaveBeenCalledTimes(1);
        expect(onInvalidSubmit).toHaveBeenCalledWith(expectedValues);
    });

    it('should fail because of adding two inputs with the same name', () => {
        let wrapper = mount(<Form className="myForm">
            <CustomInput name="email" value=""/>
        </Form>);
        expect(wrapper.instance().attachInput.bind(null, {
            getName: function () {
                return 'email';
            }
        })).toThrow('There already exists an input with the name "email"');
    });

    it('should attach and detach the input correctly', (done) => {
        let wrapper;
        let onValidCalled = false;
        let onInvalidated = false;
        let onValid = function () {
            onValidCalled = true;
            if (onInvalidated) {
                done();
            } else {
                wrapper.setState({
                    showInput: true
                });
            }
        };
        let onInvalid = function (values, validating) {
            if (!validating) {
                onInvalidated = true;
                expect(onValidCalled).toBe(true);
                wrapper.setState({
                    showInput: false
                });
            }
        };
        wrapper = mount(<SpecialForm onValid={onValid} onInvalid={onInvalid}/>);
    });

    it('should reset the form correctly', () => {
        let wrapper = mount(<Form>
            <CustomInput name="email" value="abc"/>
            <CustomInput name="email2" value="jmc"/>
        </Form>);
        wrapper.instance().inputs[0].setValue('test1');
        wrapper.instance().inputs[1].setValue('test2');
        wrapper.update();
        expect(wrapper.instance().inputs[0].getValue()).toEqual('test1');
        expect(wrapper.instance().inputs[1].getValue()).toEqual('test2');
        wrapper.instance().reset();
        expect(wrapper.instance().inputs[0].getValue()).toEqual('abc');
        expect(wrapper.instance().inputs[1].getValue()).toEqual('jmc');
        wrapper.instance().reset({email:'val1'});
        expect(wrapper.instance().inputs[0].getValue()).toEqual('val1');
        expect(wrapper.instance().inputs[1].getValue()).toEqual('jmc');
        wrapper.instance().reset({email2:'val2'});
        expect(wrapper.instance().inputs[0].getValue()).toEqual('abc');
        expect(wrapper.instance().inputs[1].getValue()).toEqual('val2');
        wrapper.instance().reset({email:'val1',email2:'val2'});
        expect(wrapper.instance().inputs[0].getValue()).toEqual('val1');
        expect(wrapper.instance().inputs[1].getValue()).toEqual('val2');
    });
});
