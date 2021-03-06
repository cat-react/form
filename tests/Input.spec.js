import React from 'react';
import {shallow} from 'enzyme';
import Input from '../src/Input';

@Input
class CustomInput extends React.Component {
}

let mockValues = {};
let formContext = {
    context: {
        _reactForm: {
            attach: jest.fn(),
            detach: jest.fn(),
            addToValidationQueue: jest.fn(),
            startValidation: jest.fn(),
            getValues: function () {
                return mockValues;
            },
            changeValueTimeout: 350
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
        expect(instance.getMessages().length).toBe(0);

        wrapper.setProps({validations: {isRequired: true}});
        expect(instance.isRequired()).toBe(true);

        wrapper.instance().touch();
        wrapper.update();
        expect(instance.isPristine()).toBe(false);
        wrapper.instance().touch();
        wrapper.update();
        expect(instance.isPristine()).toBe(false);
    });

    it('should change the value correctly', (done) => {
        formContext.context._reactForm.startValidation = jest.fn();

        let wrapper = shallow(<CustomInput name="email" value="myValue2"/>, formContext);
        wrapper.instance().setValue('myValue3');
        wrapper.update();
        expect(wrapper.instance().getValue()).toBe('myValue3');
        expect(formContext.context._reactForm.addToValidationQueue).toBeCalledWith(wrapper.instance());
        expect(formContext.context._reactForm.startValidation).toHaveBeenCalledTimes(0);
        setTimeout(function () {
            expect(formContext.context._reactForm.startValidation).toHaveBeenCalledTimes(1);
            done();
        }, 400);
    });

    it('should validate immediately', () => {
        formContext.context._reactForm.startValidation = jest.fn();

        let wrapper = shallow(<CustomInput name="email" value="myValue2" changeValueTimeout={0}/>, formContext);
        wrapper.instance().setValue('myValue3');
        wrapper.update();
        expect(wrapper.instance().getValue()).toBe('myValue3');
        expect(formContext.context._reactForm.addToValidationQueue).toBeCalledWith(wrapper.instance());
        expect(formContext.context._reactForm.startValidation).toHaveBeenCalledTimes(1);
    });

    it('should reset the input correctly', () => {
        let wrapper = shallow(<CustomInput name="email" value="myValue2"/>, formContext);
        wrapper.instance().setValue('myValue3');
        wrapper.update();
        expect(wrapper.instance().getValue()).toBe('myValue3');
        wrapper.instance().reset();
        expect(wrapper.instance().getValue()).toBe('myValue2');
        wrapper.instance().reset('');
        expect(wrapper.instance().getValue()).toBe('');
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

    it('should validate the input successfully', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']} value="abc"
                                           validations={{
                                               isRequired: true
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(true);
        expect(wrapper.instance().isValid()).toBe(true);
    });

    it('should invalidate the input', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']}
                                           validations={{
                                               isRequired: true
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(false);
        expect(wrapper.instance().getMessages()).toEqual([]);
    });

    it('should invalidate the input and show the error messages', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']}
                                           validations={{
                                               isRequired: true
                                           }}
                                           messages={{
                                               isRequired: 'the input is required'
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(false);
        expect(wrapper.instance().getMessages()).toEqual(['the input is required']);
    });

    it('should validate the input but show the warning messages', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']}
                                           validations={{
                                               isRequired: true
                                           }}
                                           messages={{
                                               isRequired: 'the input is required'
                                           }}
                                           warnings={['isRequired']}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(true);
        expect(wrapper.instance().getMessages()).toEqual(['the input is required']);
    });

    it('should validate the input with a custom validator', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']} value="itsMyValue"
                                           validations={{
                                               myValidator: function (values, value) {
                                                   return value === "itsMyValue";
                                               }
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(true);
        wrapper.instance().setValue('asd');
        await expect(wrapper.instance().validate()).resolves.toBe(false);
    });

    it('should validate the input with a custom validator and condition', async () => {
        let wrapper = shallow(<CustomInput name="email" dependencies={['email2']} value="itsMyValue"
                                           validations={{
                                               myValidator: [function (values, value, condition) {
                                                   return value === "itsMyValue" && condition === "test";
                                               }, "test"]
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(true);
    });

    it('should validate a non required value which is empty successfully', async () => {
        let wrapper = shallow(<CustomInput name="field"
                                           value=""
                                           validations={{
                                               myValidator: function (values, value) {
                                                   return value === "itsMyValue";
                                               }
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(true);
    });

    it('should invalidate a non required value which is not empty', async () => {
        let wrapper = shallow(<CustomInput name="field"
                                           value="itsMyValu"
                                           validations={{
                                               myValidator: function (values, value) {
                                                   return value === "itsMyValue";
                                               }
                                           }}/>, formContext);

        await expect(wrapper.instance().validate()).resolves.toBe(false);
    });
});
