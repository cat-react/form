import React from 'react';
import {shallow} from 'enzyme';
import Input from '../src/Input';

@Input
class CustomInput extends React.Component {
}

let formContext = {
    context: {
        _reactForm: {
            attach: jest.fn(),
            detach: jest.fn(),
            validate: jest.fn()
        }
    }
};

describe('Input', () => {
    it('should render correctly', () => {
        let wrapper = shallow(<CustomInput name="email" className="myInput"/>, formContext);

        expect(wrapper.is('.myInput')).toBe(true);
        expect(formContext.context._reactForm.attach).toBeCalledWith(wrapper.instance());
    });

    it('should receive the right props & state', () => {
        let wrapper = shallow(<CustomInput name="email" value="myValue"/>, formContext);

        const instance = wrapper.instance();
        expect(formContext.context._reactForm.attach).toBeCalledWith(instance);
        expect(instance.getName()).toBe('email');
        expect(instance.hasName('abc')).toBe(false);
        expect(instance.hasName('email')).toBe(true);
        expect(instance.isRequired()).toBe(false);
        expect(instance.isPristine()).toBe(true);
        expect(instance.isValid()).toBe(false);
        expect(instance.getValue()).toBe('myValue');
        expect(instance.getErrorMessages().length).toBe(0);

        wrapper.setProps({validations: {isRequired: true}});
        expect(instance.isRequired()).toBe(true);

        wrapper.instance().onBlur();
        wrapper.update();
        expect(instance.isPristine()).toBe(false);
    });

    it('should change the value correctly', () => {
        let wrapper = shallow(<CustomInput name="email" value="myValue2"/>, formContext);
        wrapper.instance().setValue('myValue3');
        wrapper.update();
        expect(wrapper.instance().getValue()).toBe('myValue3');
        expect(formContext.context._reactForm.validate).toBeCalledWith(wrapper.instance());
    });

    it('should unmount correctly', () => {
        let wrapper = shallow(<CustomInput name="email" className="myInput"/>, formContext);
        const instance = wrapper.instance();
        wrapper.unmount();
        expect(formContext.context._reactForm.detach).toBeCalledWith(instance);
    });

    it('should register all given dependencies', () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']}/>, formContext);

        expect(wrapper.instance().dependencies).toEqual(['email2']);
    });

    it('should register all validationRule dependencies', () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']}
                                           validations={{
                                               equalsField: 'email3',
                                               equalsFields: ['email4', 'email5']
                                           }}/>, formContext);

        expect(wrapper.instance().dependencies).toEqual(['email2', 'email3', 'email4', 'email5']);
    });

    it('should fail when registering a dependency with the same name', () => {
        let wrapper = shallow(<CustomInput name="email"/>, formContext);

        expect(wrapper.instance().addDependency.bind(null, 'email')).toThrow('An input cannot have itself as an dependency. Check your validation rules.');
    });
});
