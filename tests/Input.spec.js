import React from 'react';
import {shallow} from 'enzyme';
import Input from '../src/Input';

@Input
class CustomInput extends React.Component {
}

let formContext = {
    context: {
        _reactForm: {
            attach: jest.fn()
        }
    }
};

describe('Input', () => {
    it('should render correctly', () => {
        let wrapper = shallow(<CustomInput name="email" className="myInput"/>, formContext);

        expect(wrapper.is('.myInput')).toBe(true);
        expect(formContext.context._reactForm.attach).toBeCalledWith(wrapper.instance());
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
});
