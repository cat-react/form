import React from 'react';
import {shallow} from 'enzyme';
import Input from '../src/Input';

@Input
class CustomInput extends React.Component {
}

describe('Input', () => {
    it('should render correctly', () => {
        let formContext = {
            attach: jest.fn()
        };

        let wrapper = shallow(<CustomInput name="email" className="myInput"/>, {
            context: {
                _reactForm: formContext
            }
        });
        
        expect(wrapper.is('.myInput')).toBe(true);
        expect(formContext.attach).toBeCalledWith(wrapper.instance());
    });
});
