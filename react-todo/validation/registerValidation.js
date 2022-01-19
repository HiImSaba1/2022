const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateRegisterInput = (data) => {
  let errors = {};
  //check the name field
  if (isEmpty(data.name)) {
    errors.name = "name field cannot be Empty";
  } else if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "name field must be between 3 - 30 chars";
  }
  //check the email field
  if (isEmpty(data.email)) {
    errors.email = "Email field cannot be Empty";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid, provide new Email";
  }
  //check password field
  if (isEmpty(data.password)) {
    errors.password = "Password field cannot be Empty";
  } else if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = "Password field must be between 6 - 50 chars";
  }
  //check confirmed password
  if (isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm Password field cannot be Empty";
  } else if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Password and Confirm password must match";
  }
  return { errors, isValid: isEmpty(errors) };
};
module.exports = validateRegisterInput;
