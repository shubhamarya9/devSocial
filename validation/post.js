const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post field is required";
  }
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be 10 to 300 characters long";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
