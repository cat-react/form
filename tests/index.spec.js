import {Form, Input} from '../src/index';
import _Form from '../src/Form';
import _Input from '../src/Input';

describe('index', () => {
    it('should export correctly', () => {
        expect(Form).toBe(_Form);
        expect(Input).toBe(_Input);
    });
});
