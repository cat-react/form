import rules from '../src/validationRules';

describe('Validation Rules', () => {
    describe('isRequired', () => {
        it('should successfully validate the value', () => {
            const valid = rules.isRequired(null, 'abc');
            expect(valid).toBe(true);
        });
        it('should invalidate the value', () => {
            let valid = rules.isRequired(null, '');
            expect(valid).toBe(false);
            valid = rules.isRequired(null, null);
            expect(valid).toBe(false);
            valid = rules.isRequired(null, undefined);
            expect(valid).toBe(false);
        });
    });

    describe('maxLength', () => {
        it('should validate uninitialized values', () => {
            let valid = rules.maxLength(null, '', 1);
            expect(valid).toBe(true);
            valid = rules.maxLength(null, null, 1);
            expect(valid).toBe(true);
            valid = rules.maxLength(null, undefined, 1);
            expect(valid).toBe(true);
        });
        it('should validate inbound strings', () => {
            let valid = rules.maxLength(null, 'asd', 4);
            expect(valid).toBe(true);
            valid = rules.maxLength(null, 'asd', 3);
            expect(valid).toBe(true);
        });
        it('should invalidate outbound string', () => {
            let valid = rules.maxLength(null, 'asd', 2);
            expect(valid).toBe(false);
        });
    });

    describe('equals', () => {
        it('should successfully validate the value', () => {
            const valid = rules.equals(null, 'abc', 'abc');
            expect(valid).toBe(true);
        });
        it('should invalidate the value', () => {
            let valid = rules.equals(null, '1', 1);
            expect(valid).toBe(false);
            valid = rules.equals(null, 'abc', 'ac');
            expect(valid).toBe(false);
        });
    });

    describe('equalsField', () => {
        it('should successfully validate the value', () => {
            const valid = rules.equalsField({email: 'abc'}, 'abc', 'email');
            expect(valid).toBe(true);
        });
        it('should invalidate the value', () => {
            let valid = rules.equalsField({name: 1}, '1', 'name');
            expect(valid).toBe(false);
            valid = rules.equalsField({}, 'abc', 'ac');
            expect(valid).toBe(false);
        });
    });

    describe('equalsFields', () => {
        it('should successfully validate the value', () => {
            const valid = rules.equalsFields({email: 'abc', email2: 'abc'}, 'abc', ['email', 'email2']);
            expect(valid).toBe(true);
        });
        it('should invalidate the value', () => {
            let valid = rules.equalsFields({email: 1, email2: '1'}, '1', 'name');
            expect(valid).toBe(false);
            valid = rules.equalsFields({email: '1', email2: 1}, '1', 'name');
            expect(valid).toBe(false);
        });
    });

    describe('isEmail', () => {
        it('should validate an correct email successfully', () => {
            const valid = rules.isEmail(null, 'test@gmail.com');
            expect(valid).toBe(true);
        });
        it('should invalidate an incorrect email', () => {
            let valid = rules.isEmail(null, 'abc');
            expect(valid).toBe(false);
            valid = rules.isEmail(null, null);
            expect(valid).toBe(false);
            valid = rules.isEmail(null, 'abc@abc');
            expect(valid).toBe(false);
            valid = rules.isEmail(null, 'abc@abc.');
            expect(valid).toBe(false);
        });
    });

    describe('minLength', () => {
        it('should validate the string successfully', () => {
            let valid = rules.minLength(null, 'abcdef', 6);
            expect(valid).toBe(true);
            valid = rules.minLength(null, 'abcdef', 4);
            expect(valid).toBe(true);
        });
        it('should invalidate the string', () => {
            let valid = rules.minLength(null, 'abcde', 6);
            expect(valid).toBe(false);
        });
    })
});
