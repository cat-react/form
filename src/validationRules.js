const rules = {
    matchRegexp: function (values, value, regexp) {
        return regexp.test(value);
    },
    isRequired: (values, value) => {
        return !!value;
    },
    isEmail: function (values, value) {
        return rules.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
    },
    minLength: (values, value, minLength) => {
        return (!value || value.length >= minLength);
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
    },
    isNumber: (values, value) => {
        switch (typeof value) {
        case 'string': 
            return rules.matchRegexp(values, value, /^-?\d+\.?\d*$/);
        case 'number': 
            return true;
        default: 
            return false;
        }
    }
};
// TODO: add more basic rules

rules.equalsField.createsDependencies = true;
rules.equalsFields.createsDependencies = true;

export default rules;
