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
});
