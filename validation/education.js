const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validateEducationInput(data) {
  let errors = {};

  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.school = !isEmpty(data.school) ? data.school : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.degree)) {
    errors.title = "degree field is required";
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = "School name required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Date required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
