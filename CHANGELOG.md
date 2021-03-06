### 0.1.2 (January 30, 2018)
- added possibility to [reset an input](https://github.com/cat-react/form/blob/master/docs/api.md#resetvalue) with a specific value
- added possibility to [reset the form](https://github.com/cat-react/form/blob/master/docs/api.md#reset) an provide values for each input
- added possibility to [configure the timeout](https://github.com/cat-react/form/blob/master/docs/api.md#changevaluetimeout-1) before revalidating the form when changing an input

### 0.1.1 (November 21, 2017)
- now it is possible to add an [autoComplete](https://github.com/cat-react/form/blob/master/docs/api.md#autocomplete) prop to the form element
- the validation rule `isRequired` now checks for `undefined`, `null` or an empty string. everything else is valid

### 0.1.0 (October 3, 2017)
- first official release!
- added api documentation
- fields are only validated if they are required, or the value is not empty fixes issue[#5](https://github.com/cat-react/form/issues/5)
- added changelog
- added live edit example

## 0.0.3 (September 17, 2017)
- initial release on npm
- Status:
  - Although there are still some things to be done (like a documentation for the API, more examples, more default validations) this version already has the basic functionality and is working as expected.
