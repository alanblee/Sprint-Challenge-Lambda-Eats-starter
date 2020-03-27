import * as yup from "yup";

export const formSchema = yup.object().shape({
  size: yup.string().required("Please choose a size."),
  sauce: yup.string().required("Please choose a sauce."),
  specialInstructions: yup
    .string()
    .min(5, "Minimum of 5 characters for instructions please."),
  Pepperoni: yup.boolean(),
  Sausage: yup.boolean(),
  CanadianBacon: yup.boolean(),
  SpicyItalianSausage: yup.boolean(),
  GarlicChicken: yup.boolean(),
  Onions: yup.boolean(),
  GreenPepper: yup.boolean(),
  DicedTomatos: yup.boolean(),
  BlackOlives: yup.boolean(),
  RoastedGarlic: yup.boolean(),
  ArtichokeHearts: yup.boolean(),
  ThreeCheese: yup.boolean(),
  Pinapple: yup.boolean(),
  ExtraCheese: yup.boolean()
});
