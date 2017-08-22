const rules = {
    isRequired: (values, value) => {
        return !!value;
    },
    maxLength: (values, value, maxLength) => {
        return (!value || value.length <= maxLength);
    },
    equals: (values, value, condition) => {
        return value === condition;
    },
    equalsField: (values, value, fieldName) => {
        return values[fieldName] === value;
    },
    equalsFields: (values, value, fieldNames) => {
        let allValid = true;
        for (let name of fieldNames) {
            if (values[name] !== value) {
                allValid = false;
            }
        }
        return allValid;
    }
};
// TODO: add more basic rules

rules.equalsField.createsDependencies = true;
rules.equalsFields.createsDependencies = true;

var test = "";

export default rules;
