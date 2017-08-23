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
    })
});
