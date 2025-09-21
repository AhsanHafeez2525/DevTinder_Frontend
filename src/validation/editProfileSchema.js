// ./validation/editProfileSchema.js
import * as Yup from "yup";

export const editProfileSchema = Yup.object({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(30, "First name must be less than 30 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(30, "Last name must be less than 30 characters")
    .required("Last name is required"),

  photoUrl: Yup.string()
    .url("Invalid URL format")
    .nullable(),

  age: Yup.number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be less than 100")
    .required("Age is required"),

  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),

  about: Yup.string()
    .max(500, "About cannot exceed 500 characters")
    .nullable(),
});
