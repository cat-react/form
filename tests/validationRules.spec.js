import rules from '../src/validationRules';

describe('ValidationRule - isRequired', () => {
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
