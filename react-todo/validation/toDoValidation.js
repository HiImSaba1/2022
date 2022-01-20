const Validator = require("validator");
const isEmpty = require("./isEmpty");
const validateToDoInput = (data) => {
  let errors = {};
  //check the content field
  if (isEmpty(data.content)) {
    errors.content = "content field cannot be Empty";
  } else if (!Validator.isLength(data.content, { min: 1, max: 300 })) {
    errors.content = "content field must be between 1 - 300 chars";
  }
  return { errors, isValid: isEmpty(errors) };
};
module.exports = validateToDoInput;
