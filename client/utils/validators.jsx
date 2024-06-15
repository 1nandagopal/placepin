export const userNameValidators = {
  required: "Username is required.",
  maxLength: {
    value: 15,
    message: "Username should be less that 15 chars.",
  },
  pattern: {
    value: /^[a-zA-Z0-9]*$/,
    message: "Username can only include alphanumeric chars.",
  },
};

export const emailValidators = {
  required: "Email is required.",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Enter a valid email.",
  },
};

export const passwordValidators = {
  required: "Password is required.",
  minLength: {
    value: 8,
    message: "Password must be atleast 8 chars.",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
    message: "Must contain atleast one lowercase, one uppercase and one digit",
  },
};

export const titleValidators = {
  required: "Title is required.",
  pattern: {
    value: /^[A-Za-z0-9\s]*$/,
    message: "Title can only contain alphanumeric chars.",
  },
};

export const imageValidators = {
  required: "Image is required.",
};

export const descriptionValidators = {
  required: "Description is required.",
};

export const addressValidators = {
  required: "Address is required.",
};
