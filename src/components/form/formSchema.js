import * as yup from "yup";

export const formSchema = yup.object().shape({
  orderFor: yup
    .string()
    .min(2, "Minimum of 2 characters.")
    .required("Name field required."),
  size: yup.string().required("Please choose a size."),
  sauce: yup.string().required("Please choose a sauce."),
  specialInstructions: yup.string(),
  Pepperoni: yup.boolean(),
  Sausage: yup.boolean(),
  "Canadian Bacon": yup.boolean(),
  "Spicy Italian Sausage": yup.boolean(),
  "Garlic Chicken": yup.boolean(),
  Onions: yup.boolean(),
  "Green Pepper": yup.boolean(),
  "Diced Tomatos": yup.boolean(),
  "Black Olives": yup.boolean(),
  "Roasted Garlic": yup.boolean(),
  "Artichoke Hearts": yup.boolean(),
  "Three Cheese": yup.boolean(),
  Pinapple: yup.boolean(),
  "Extra Cheese": yup.boolean()
});
